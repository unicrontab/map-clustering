import config from '../config';

export default async function api({
    url = config.api.URL,
    path,
    method = 'GET',
    headers = {},
    queryParams = {},
    body,
}) {
    const results = await fetch(url + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : body,
    });

    if (results.status !== 200) {
        throw new Error(await results.text());
    }

    return results.json();
}
