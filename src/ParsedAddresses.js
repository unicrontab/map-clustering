/* eslint-disable class-methods-use-this */
import React from 'react';
import './ParsedAddresses.css';
import { List, ListItem } from 'material-ui/List';
import { primary, secondary, white } from './theme';
import ContentSend from 'material-ui/svg-icons/content/send';

const createAddressListing = addresses => addresses.map(address => {
    if (address.error) return null;
    const location = address.results[0].geometry.location;
    const coordinates = `${location.lat}, ${location.lng}`;

    const formattedAddress = address.results[0].formatted_address;
    return (
        <ListItem
            primaryText={formattedAddress}
            secondaryText={coordinates}
            key={address.results['0'].place_id}
            leftIcon={<ContentSend color={secondary}/>}
            style={{ color: white }}
        />
    );
});

class ParsedAddresses extends React.Component {
    render() {
        if (!this.props.addresses) return null;
        return (
            <List style={{ backgroundColor: primary }}>
                {createAddressListing(this.props.addresses)}
            </List>
        );
    }
}

export default ParsedAddresses;
