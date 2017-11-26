/* eslint-disable class-methods-use-this */
import React from 'react';
import './HelperList.css';
import { secondary, white } from './theme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';

const stepMap = [{
    label: 'Enter Addresses',
    content: `Enter addresses, one per line. You need at least 
    (the number of clusters you want) addresses for 
    clustering to work.`,
},{
    label: 'Select Clustering Algorithm',
    content: `Select the algorithm you want to use for clustering.
    (Some of the models require at least 10 addresses.)`,
},{
    label: 'Set Number Of Clusters',
    content: `Select the number of clusters you want. You must have
    at least as many addresses as you have clusters.`,
},{
    label: 'Cluster Addresses',
    content: `Click CLUSTER ADDRESSES.`
}];

class HelperList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
        };
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= stepMap.length - 1,
        });
    }

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) this.setState({ stepIndex: stepIndex - 1 });
    };

    renderStepActions = (step) => {
        const {stepIndex} = this.state;
        return (
            <div>
                <RaisedButton
                    label={stepIndex === (stepMap.length - 1) ? 'Finish' : 'Next' }
                    primary={true}
                    onClick={this.handleNext}
                    style={{ marginRight: 12 }}
                />
                { step > 0 && (
                    <FlatButton
                        label='Back'
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                    />
                ) }
            </div>
        );  
    }

    renderSteps = steps => steps.map((step, index) => {
        return (
            <Step key={index}>
                <StepLabel style={{color: white }}>{step.label}</StepLabel>
                <StepContent>
                    <p>{step.content}</p>
                    {this.renderStepActions(index)}
                </StepContent>
            </Step>
        )
    });

    render() {
        if (this.props.addresses.length) return null;
        const {finished, stepIndex} = this.state;
        return (
            <div style={{ maxWidth: 380, maxHeight: 400 }}>
                <Stepper activeStep={stepIndex} orientation='vertical'>
                    {this.renderSteps(stepMap)}
                </Stepper>
                { finished && (
                    <p>
                        <FlatButton 
                            label='reset'
                            style={{ color: secondary }}
                            onClick={event => {
                                event.preventDefault();
                                this.setState({ stepIndex: 0, finished: false});
                            }}
                        />
                    </p>
                )}
            </div>
        );
    }
}

export default HelperList;
