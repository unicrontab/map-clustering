/* eslint-disable class-methods-use-this */
import React from 'react';
import './ParsedAddresses.css';
import { List, ListItem } from 'material-ui/List';
import { primary, white, clusterColors } from './theme';
import ContentSend from 'material-ui/svg-icons/content/send';

const createAddressListing = addresses => addresses.map(address => {
    if (address.error) return null;
    const location = {
        lat: address.lat,
        lng: address.lng,
    };
    const coordinates = `${location.lat}, ${location.lng}`;
    const cluster = address.cluster;
    const formattedAddress = address.address;
    return (
        <ListItem
            primaryText={formattedAddress}
            secondaryText={coordinates}
            key={formattedAddress}
            leftIcon={<ContentSend color={clusterColors[cluster]}/>}
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
