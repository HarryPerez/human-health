const { endRequest, catchRequest } = require('../helpers/request');
const { s3GenerateUrlWithExtension } = require('../services/s3');

const createSignedUrl = async (req, res) => {
  const { name, extension } = req.body;

  return s3GenerateUrlWithExtension(extension, name).then((data) => endRequest({
    response: data,
    code: 201,
    res,
  })).catch((err) => catchRequest({
    err, res, message: 'error creating presigned url', internalCode: 4000,
  }));
};

module.exports = { createSignedUrl };
