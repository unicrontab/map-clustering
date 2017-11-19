import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import './LoadingIndicator.css';

const LoadingIndicator = props => {
    if (!props.loading) return null;
    console.log('loading props', props.loading);
    return(
        <div>
            <CircularProgress className='loadingIndicator' size={80} thinkness={8} />
        </div>
    );
};

export default LoadingIndicator;
