module.exports = functionWithCallback => (...args) => new Promise((resolve, reject) => {
    functionWithCallback(...args, (err, data) => (err ? reject(err) : resolve(data)));
});
