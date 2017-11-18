import config from '../config';

export default async function api({
    path,
    method = 'GET',
    headers = {},
    queryParams = {},
    body,
}) {
    const results = await fetch(config.api.URL + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : body,
    });

    if (results.status !== 200) {
        throw new Error(await results.text());
    }

    return results.json();
}
