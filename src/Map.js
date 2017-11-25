/* eslint-disable class-methods-use-this */
/* global google */
import './Map.css';
import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { white, clusterColors } from './theme';
import mapStyle from './mapStyle';

const createMarkersFromAddresses = addresses => addresses.map(address => {
    if (address.error) return null;
    const position = {
        lat: address.lat,
        lng: address.lng,
    };
    const coordinates = `${position.lat}, ${position.lng}`;
    const formattedAddress = address.address;

    const icon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 14,
        fillColor: clusterColors[address.cluster],
        strokeColor: clusterColors[address.cluster],
        strokeWeight: 8,
    };

    return (
        <MarkerWithLabel
            position={position}
            key={coordinates}
            labelAnchor={new google.maps.Point(-10, 12)}
            icon={icon}
            labelStyle={{
                opacity: '0.5',
                color: white,
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
                defaultOptions={{ styles: mapStyle }}
                defaultZoom={9}
                defaultCenter={this.props.mapCenter}
            >
                {createMarkersFromAddresses(this.props.addresses)}
            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(Map));
