import React from 'react';
import { primary, secondary, primaryDark } from './theme';
import './Footer.css';


const scikitUrl = 'http://scikit-learn.org/stable/';
const geocodeApi = 'https://developers.google.com/maps/documentation/geocoding/start';


const displayLink = (url, link) => (<div><a style={{ color: secondary }} href={url}>{link}</a></div>);

const Footer = () =>
    <div className='footer' style={{ backgroundColor: primary }}>
        <div className='footerContent'>
            <h5> How does this work? </h5>
            <p>
                First, we grab the latitude/longitude from the addresses (using Googles Geocoding API), then we take all of those
                coordinates and send them through the selected unsupervised model (using Scikit-Learn). 
                Each algorithm will attempt to group these differently and send back each coordinate with its predicted group.

            </p>
            {displayLink(scikitUrl, 'Scikit-learn')}
            {displayLink(geocodeApi, 'Googles Geocoding API')}
            
        </div>
        <div className="footerLowerBar" style={{ backgroundColor: primaryDark }}>

        </div>
    </div>;

export default Footer;
