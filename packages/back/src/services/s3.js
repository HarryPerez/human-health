/* eslint-disable implicit-arrow-linebreak */
const AWS = require('aws-sdk');
const { get } = require('../utils/request');
const logger = require('../logger');
const errors = require('../errors');
const { DEFAULT_UPLOAD_EXPIRE_TIME, VALID_IMAGE_EXTENSIONS } = require('../constants');

const s3Config = () => ({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const getBucketName = () => process.env.S3_BUCKET_NAME;

const getS3SignedUrl = (fileName, extension, mimeType) => {
  logger.info(`Generating signed s3 url for https://${getBucketName()}.s3.amazonaws.com`);
  const s3 = new AWS.S3(s3Config());
  const imageName = Date.now();
  const signedUrlConfig = {
    Bucket: `${getBucketName()}`,
    Fields: {
      key: `${fileName}-${imageName}.${extension}`,
      success_action_status: '201',
      acl: 'public-read',
    },
    Expires: DEFAULT_UPLOAD_EXPIRE_TIME,
  };

  if (mimeType) {
    signedUrlConfig.ContentType = mimeType;
  }

  return new Promise((resolve, reject) =>
    s3.createPresignedPost(signedUrlConfig, (err, data) => (err ? reject(err) : resolve(data))));
};

exports.s3GenerateUrl = (fileName, mimeType) => {
  const extension = mimeType.split('/')[1] || '';
  if (!VALID_IMAGE_EXTENSIONS.includes(extension)) {
    throw errors.invalidFormatError('Invalid format');
  }
  return getS3SignedUrl(fileName, extension, mimeType);
};

exports.s3GenerateUrlWithExtension = (extension, fileName, mimeType) => {
  const splittedFilename = fileName.split('.');
  const fileNameExtension = splittedFilename.length > 1
    && splittedFilename[splittedFilename.length - 1];

  return getS3SignedUrl(
    (fileNameExtension && splittedFilename[0]) || fileName,
    fileNameExtension || extension,
    mimeType,
  );
};
