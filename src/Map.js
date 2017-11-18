/* eslint-disable class-methods-use-this */

import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';

const createMarkersFromAddresses = addresses => addresses.map(address => (
    <Marker
        position={ address }
        key={`${address.lat},{address.lng}`}
    />));

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [
                { lat: -34.397, lng: 150.644 },
                { lat: -35.397, lng: 149.644 },
            ],
        };
    }
    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                {createMarkersFromAddresses(this.state.addresses)}
            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(Map));
