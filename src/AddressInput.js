import React from 'react';
import './AddressInput.css';
import api from './lib/api';
import config from './config';
import { primary } from './theme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const defaultAddresses = config.defaultAddresses;

const prepareClusterRequest = geoData => ({
    address: geoData.results[0].formatted_address,
    location: geoData.results[0].geometry.location,
});

const removeErrors = (geoData, errorHandler) => {
    const errors = geoData.filter(data => data.error);
    const validGeoData = geoData.filter(data => !data.error);
    if (errors) errorHandler(errors);
    return validGeoData;
};

const checkModelConstraints = (state, addresses) => {
    if (state.clusters > addresses.length) return 'Must have at least one cluster per address.';
    if (state.algo === 'spectral' && addresses.length < 10) return 'Must have at least 10 addresses for spectral clustering.';
    return false;
};


class AddressInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: defaultAddresses,
            algo: 'kmeans',
            clusters: 3,
        };
    }

    handleChange = (event) => {
        this.setState({ addresses: event.target.value });
    }

    setAlgo = (event, index, value) => {
        this.setState({ algo: value });
    }

    setClusters = (event, index, value) => {
        this.setState({ clusters: value });
    }


    validate = () => {
        const splitAddresses = this.state.addresses.split('\n');
        const addressArray = splitAddresses.filter(address => address ? true : false);
        const inputError = checkModelConstraints(this.state, addressArray);
        if (!inputError) {
            this.props.handleLoading(true);
            setTimeout(api({
                url: config.api.URL,
                path: '/dev/addressLookup',
                method: 'POST',
                body: {
                    addresses: addressArray,
                },
            }).then(response => {
                const data = removeErrors(response, this.props.handleErrors);
                const clusterRequest = {
                    algo: this.state.algo,
                    clusters: this.state.clusters,
                    data: data.map(prepareClusterRequest),
                };
                api({
                    url: config.api.CLUSTER,
                    path: '/dev/cluster',
                    method: 'POST',
                    body: clusterRequest,
                }).then(clusterResponse => {
                    this.props.handleLoading(false);
                    this.props.onAddressChange(clusterResponse);
                });
            }), 3000);
        } else {
            this.props.handleErrors([{ error: 'Model Error', detail: { status: inputError }}]);
        }
        
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
                    rows={20}
                    value={ addresses }
                    onChange={this.handleChange}
                    id="addressInput"
                    style={{
                        width: '100%',
                        gridRow: 'span 1',
                        gridColumn: 'span 2',
                    }}>
                </TextField>

                <SelectField
                    floatingLabelText='Clustering Algorithm'
                    value={this.state.algo}
                    onChange={this.setAlgo}
                    style={{ gridRow: 2 }}>
                    <MenuItem value='kmeans' primaryText='K Means' />
                    <MenuItem value='minikmeans' primaryText='Mini Batch K Means' />
                    <MenuItem value='meanshift' primaryText='Spectral Clustering' />
                    <MenuItem value='affinity' primaryText='Affinity Propogation' />
                    <MenuItem value='agglo' primaryText='Agglomerative Clustering' />
                    <MenuItem value='birch' primaryText='Birch Clustering' />
                    <MenuItem value='gaussian' primaryText='Gaussian Mixture' />
                </SelectField>

                <SelectField
                    floatingLabelText='Number of clusters'
                    value={this.state.clusters}
                    onChange={this.setClusters}
                    style={{ gridRow: 2 }}>
                    <MenuItem value={1} primaryText='1' />
                    <MenuItem value={2} primaryText='2' />
                    <MenuItem value={3} primaryText='3' />
                    <MenuItem value={4} primaryText='4' />
                    <MenuItem value={5} primaryText='5' />
                    <MenuItem value={6} primaryText='6' />
                </SelectField>

                <RaisedButton
                    default={ true }
                    onClick={ this.validate }
                    label='Cluster Addresses'
                    style={{ gridRow: 4 }}
                >
                </RaisedButton>

            </div>
        );
    }
}

export default AddressInput;
