import React from 'react';
import './AddressInput.css';
import api from './lib/api';
import config from './config';
import { primary } from './theme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const defaultAddresses = config.defaultAddresses;

const prepareClusterRequest = geoData => ({
    address: geoData.results[0].formatted_address,
    location: geoData.results[0].geometry.location,
});


class AddressInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: defaultAddresses,
        };
    }

    handleChange = (event) => {
        this.setState({ addresses: event.target.value });
    }

    validate = () => {
        const addressArray = this.state.addresses.split('\n');
        api({
            url: config.api.URL,
            path: '/dev/addressLookup',
            method: 'POST',
            body: {
                addresses: addressArray,
            },
        }).then(response => {
            const clusterRequest = {
                algo: 'k_means',
                data: response.map(prepareClusterRequest),
            };
            api({
                url: config.api.CLUSTER,
                path: '/dev/cluster',
                method: 'POST',
                body: clusterRequest,
            }).then(clusterResponse => {
                this.props.onAddressChange(clusterResponse);
            });
        });
    }

    render() {
        const addresses = this.props.addresses;
        return (
            <div className="addressInputContainer"
                style={{ backgroundColor: primary }}>
                <TextField
                    multiLine={true}
                    defaultValue={defaultAddresses}
                    floatingLabelText="Enter one address per line"
                    floatingLabelFixed={true}
                    rows={10}
                    value={ addresses }
                    onChange={this.handleChange}
                    id="addressInput"
                    style={{
                        width: '33%',
                    }}>
                </TextField>

                <RaisedButton
                    default={ true }
                    onClick={ this.validate }
                    label='Cluster Addresses'
                    style={{ gridRow: 2 }}>
                </RaisedButton>

            </div>
        );
    }
}

export default AddressInput;
