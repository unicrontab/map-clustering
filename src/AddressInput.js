import React from 'react';
import './AddressInput.css';
import api from './lib/api';
import config from './config';
import { primary } from './theme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LoadingIndicator from './LoadingIndicator';

const defaultAddresses = config.defaultAddresses;

const prepareClusterRequest = geoData => ({
    address: geoData.results[0].formatted_address,
    location: geoData.results[0].geometry.location,
});

const removeErrors = (geoData, errorHandler) => {
    const errors = geoData.filter(data => data.error);
    const validGeoData = geoData.filter(data => !data.error);
    if (errors.length) errorHandler(errors);
    return validGeoData;
};

const checkModelConstraints = (state, addresses) => {
    if (state.clusters > addresses.length) return 'Must have at least one cluster per address.';
    if (state.algo === 'spectral' && addresses.length < 10) return 'Must have at least 10 addresses for spectral clustering.';
    return false;
};

const lookupAddresses = (addressArray) => api({
    url: config.api.URL,
    path: '/dev/addressLookup',
    method: 'POST',
    body: {
        addresses: addressArray,
    },
});

const clusterAddresses = (clusterRequest) => api({
    url: config.api.CLUSTER,
    path: '/dev/cluster',
    method: 'POST',
    body: clusterRequest,
});

const createMenuItems = count => [...Array(count)].map((value, index) => {
    return <MenuItem key={index+1} value={index+1} primaryText={index+1} />;
});


class AddressInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            addresses: defaultAddresses,
            algo: 'kmeans',
            clusters: 3,
        };
    }

    handleChange = (event) => {
        this.setState({ addresses: event.target.value });
    }

    setAlgo = (event, index, value) => {
        this.setState({ algo: value });
    }

    setClusters = (event, index, value) => {
        this.setState({ clusters: value });
    }

    handleLoading = isLoading => {
        this.setState({ loading: isLoading });
    }


    validate = () => {
        const splitAddresses = this.state.addresses.split('\n');
        const addressArray = splitAddresses.filter(address => address ? true : false);
        const inputError = checkModelConstraints(this.state, addressArray);
        if (!inputError) {
            this.handleLoading(true);
            lookupAddresses(addressArray).then(response => {
                const data = removeErrors(response, this.props.handleErrors);
                const clusterRequest = {
                    algo: this.state.algo,
                    clusters: this.state.clusters,
                    data: data.map(prepareClusterRequest),
                };
                clusterAddresses(clusterRequest).then(clusterResponse => {
                    this.handleLoading(false);
                    this.props.onAddressChange(clusterResponse);
                });
            });
        } else {
            this.props.handleErrors([{ error: 'Model Error', detail: { status: inputError }}]);
        }
        
    }

    render() {
        const addresses = this.props.addresses;
        return (
            <div className="addressInputContainer"
                style={{ backgroundColor: primary }}>
                <TextField
                    multiLine={true}
                    defaultValue={defaultAddresses}
                    floatingLabelText="Enter one address per line"
                    floatingLabelFixed={true}
                    rows={20}
                    value={ addresses }
                    onChange={this.handleChange}
                    id="addressInput"
                    style={{
                        width: '100%',
                        gridRow: 'span 1',
                        gridColumn: 'span 2',
                    }}>
                </TextField>

                <SelectField
                    floatingLabelText='Clustering Algorithm'
                    value={this.state.algo}
                    onChange={this.setAlgo}
                    style={{ gridRow: 2 }}>
                    <MenuItem value='kmeans' primaryText='K Means' />
                    <MenuItem value='minikmeans' primaryText='Mini Batch K Means' />
                    <MenuItem value='meanshift' primaryText='Spectral Clustering' />
                    <MenuItem value='affinity' primaryText='Affinity Propogation' />
                    <MenuItem value='agglo' primaryText='Agglomerative Clustering' />
                    <MenuItem value='birch' primaryText='Birch Clustering' />
                    <MenuItem value='gaussian' primaryText='Gaussian Mixture' />
                </SelectField>

                <SelectField
                    floatingLabelText='Number of clusters'
                    value={this.state.clusters}
                    onChange={this.setClusters}
                    style={{ gridRow: 2 }}>
                    {createMenuItems(6)}
                </SelectField>
                <div style={{ gridRow: 3 }}>
                    <RaisedButton
                        default={ true }
                        onClick={ this.validate }
                        label='Cluster Addresses'
                    >
                    </RaisedButton>
                </div>
                <LoadingIndicator 
                    style={{ gridRow: 3 }}
                    loading={this.state.loading} />

            </div>
        );
    }
}

export default AddressInput;
