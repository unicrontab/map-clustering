/* eslint-disable class-methods-use-this */
/* global google */

import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { primary, white } from './theme';

const createMarkersFromAddresses = addresses => addresses.map(address => {
    if (address.error) return null;
    const position = address.results[0].geometry.location;
    const coordinates = `${position.lat}, ${position.lng}`;
    const formattedAddress = address.results[0].formatted_address;

    console.log(address);
    return (
        <MarkerWithLabel
            position={position}
            key={coordinates}
            labelAnchor={new google.maps.Point(-5, 10)}
            labelStyle={{ 
                backgroundColor: primary,
                opacity: '0.8',
                color: white,
                padding: '0.5rem',
            }}>
            <div>{formattedAddress}</div>
        </MarkerWithLabel>
    );
});

class Map extends React.Component {
    render() {
        console.log(this.props.addresses);
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={this.props.mapCenter}
            >
                {createMarkersFromAddresses(this.props.addresses)}
            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(Map));
