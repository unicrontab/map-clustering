/* eslint-disable class-methods-use-this */

import React from 'react';
import { primary } from './theme';
import './Intro.css';

class Intro extends React.Component {
    render() {
        return (
            <div className="Intro" style={{ backgroundColor: primary }}>
                <div className="intro-title"> Map Cluster </div>
                <div className="intro-subtitle">
                    Intelligently organize and group addresses
                </div>
            </div>
        );
    }
}

export default Intro;
