import React from 'react';
import './Errors.css';
import { errorPrimary, errorSecondary } from './theme';

const Errors = ({ errors }) => {
    if (!errors || !errors.length) return null;
    return errors.map((error, index) => {
        console.log(error);
        return <div
            key={index}
            className="error"
            style={{ backgroundColor: errorSecondary, color: errorPrimary }}>
            Error - {error.detail.status}
        </div>;
    });
};

export default Errors;
