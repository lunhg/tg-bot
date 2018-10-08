const api = require('./api');
const render = require('./render');
const logger = require('./logger')
const error = require('./error');

module.exports = {
    api: api,
    render: render,
    logger: logger,
    error: error,
    catch: (err) => {
        let msg = `Error ${err.code}: ${err.message}`;
        console.err(err.stack);
    }
}
