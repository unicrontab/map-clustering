const GoogleMapsAPI = require('googlemaps');

const { success, failure } = require('./lib/response');
const promisify = require('./lib/promisify');
const APIKEY = process.env.APIKEY;

const apiConfig = {
    key: APIKEY,
    stagger_time: 1000,
    secure: true,
};

const gmAPI = new GoogleMapsAPI(apiConfig);
const geocode = promisify(gmAPI.geocode.bind(gmAPI));
const getLatLong = async address => {
    const response = await geocode({ address });
    console.log(response.results);
    if (!response.results) return { error: 'no results' };
    if (!response.results[0]) return { error: 'issue with request', detail: response };
    return response;
}; 

const getLocationsFromAddresses = addresses => {
    const locationPromises = addresses.map(getLatLong);
    return Promise.all(locationPromises);
};

export async function main(event, context, callback) {
    const body = JSON.parse(event.body);
    const addresses = body.addresses || [];
    const response = await getLocationsFromAddresses(addresses);
    if (response.error) callback(null, failure(response));
    callback(null, success(response));
}

