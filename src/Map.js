/* eslint-disable class-methods-use-this */
/* global google */

import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { black, clusterColors } from './theme';

const createMarkersFromAddresses = addresses => addresses.map(address => {
    if (address.error) return null;
    const position = {
        lat: address.lat,
        lng: address.lng,
    };
    const coordinates = `${position.lat}, ${position.lng}`;
    const formattedAddress = address.address;
    return (
        <MarkerWithLabel
            position={position}
            key={coordinates}
            labelAnchor={new google.maps.Point(-5, 10)}
            labelStyle={{
                backgroundColor: clusterColors[address.cluster],
                opacity: '0.8',
                color: black,
                padding: '0.5rem',
            }}>
            <div>{formattedAddress}</div>
        </MarkerWithLabel>
    );
});

class Map extends React.Component {
    render() {
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
