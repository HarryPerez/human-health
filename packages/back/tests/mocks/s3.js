/* eslint-disable no-undef */
jest.mock('aws-sdk');

const getSignedUrlPromiseMock = jest.fn((config, callback) => callback(false, { url: 'test.com', fields: {} }));

const AWS = require('aws-sdk');

const S3 = AWS.S3.mockReturnValue({ createPresignedPost: getSignedUrlPromiseMock });

module.exports = { AWS, S3, getSignedUrlPromiseMock };
