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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
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
                    <Map
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
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
