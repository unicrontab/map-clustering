const R = require('ramda');

const response = R.curry((code, body) => ({
    statusCode: code,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
    },
    body: JSON.stringify(body),

}));

const success = response(200);
const failure = response(500);

export { success, failure };
