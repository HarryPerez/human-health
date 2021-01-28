const axios = require('axios');

const get = (config) => axios({ method: 'get', ...config });

const post = (config) => axios({ method: 'post', ...config });

const put = (config) => axios({ method: 'put', ...config });

module.exports = { get, post, put };
