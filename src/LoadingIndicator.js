import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import './LoadingIndicator.css';

const LoadingIndicator = props => {
    const style = props.style || {};
    if (!props.loading) return null;
    console.log('loading props', props.loading);
    return(
        <div style={style}>
            <LinearProgress className='loadingIndicator' mode='indeterminate' />
        </div>
    );
};

export default LoadingIndicator;
