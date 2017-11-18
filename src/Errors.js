import React from 'react';
import './Errors.css';
import { errorPrimary, errorSecondary } from './theme';

const Errors = props => {
    const addresses = props.addresses;
    if (!addresses.length) return null;
    return addresses.map((address, index) => {
        if (address.error) {
            return <div
                key={index}
                className="error"
                style={{ backgroundColor: errorSecondary, color: errorPrimary }}>
                AddressID: {index} Error: {address.detail.error_message}
            </div>;
        }
        return null;
    });
};

export default Errors;
