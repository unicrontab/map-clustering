import React from 'react';
import './AddressInput.css';
import api from './lib/api';
import { primary } from './theme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const defaultAddresses = 'One Infinite Loop Cupertino, CA 95014\n100 Winchester Circle Los Gatos, CA 95032';

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

    handleClick = () => {
        const addressArray = this.state.addresses.split('\n');
        api({
            path: '/dev/addressLookup',
            method: 'POST',
            body: {
                addresses: addressArray,
            },
        }).then(response => {
            this.props.onAddressChange(response);
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
                    onClick={ this.handleClick }
                    label='cluster'
                    style={{ gridRow: 2 }}>
                </RaisedButton>
            </div>
        );
    }
}

export default AddressInput;
