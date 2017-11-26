import config from '../config';
import * as R from 'ramda';

const api = async ({
    url = config.api.URL,
    path,
    method = 'GET',
    headers = {},
    queryParams = {},
    body,
}) => {
    const results = await fetch(url + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : body,
    });
    
    if (results.status !== 200) {
        throw new Error(results.text());
    }
    return results.json();
}
const memoApi = R.memoizeWith(JSON.stringify, api);
export default memoApi;
