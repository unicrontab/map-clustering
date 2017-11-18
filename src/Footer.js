import React from 'react';
import { primary, primaryDark } from './theme';
import './Footer.css';

const Footer = () =>
    <div>
        <div className="footer" style={{ backgroundColor: primary }}>
            <h5> How does this work? </h5>
            <p>
                Using unsupervised machine learning methods,
                you can intelligently group data based on similarities.
            </p>
        </div>
        <div className="footerLowerBar" style={{ backgroundColor: primaryDark }}>

        </div>
    </div>;

export default Footer;
