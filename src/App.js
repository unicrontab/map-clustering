/* eslint-disable class-methods-use-this */

// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { white } from './theme';
import Footer from './Footer';
import Intro from './Intro';
import AddressInput from './AddressInput';
import Map from './Map';
import ParsedAddresses from './ParsedAddresses';
import Errors from './Errors';
import config from './config';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${config.GMapClientSideKey}&v=3.exp&libraries=geometry,drawing,places`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            mapCenter: { lat: 37.332, lng: -122.030 },
        };
        this.handleAddressChange = addresses => {
            this.setState({ addresses });
        };
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div className='App'
                    style={{ color: white }}>
                    <Intro />
                    <ParsedAddresses addresses={this.state.addresses} />
                    <AddressInput onAddressChange={this.handleAddressChange} />
                    <Errors addresses={this.state.addresses} />
                    <Map
                        addresses={this.state.addresses}
                        mapCenter={this.state.mapCenter}
                        googleMapURL={googleMapURL}
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div style={{ height: '800px' }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                    />
                    <Footer />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
