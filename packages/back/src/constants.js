const mongoose = require('mongoose');

const USERS = 'users';

const FIELDS_TYPES_PER_MODEL = {
  [USERS]: {
    string: ['name', 'surname', 'email', 'role', 'section'],
  },
};

const MONGO_KEYS = {
  gte: '$gte',
  lt: '$lt',
  or: '$or',
  in: '$in',
};

const dateTransformation = (value) => new Date(value);

const idTransformation = (ids) => {
  const array = typeof ids === 'string' ? [ids] : ids;
  return array.map(mongoose.Types.ObjectId);
};

const MONGO_TRANSFORMATIONS = {
  updatedAt: dateTransformation,
  createdAt: dateTransformation,
  _id: idTransformation,
};

const DEFAULT_UPLOAD_EXPIRE_TIME = 300;

const VALID_IMAGE_EXTENSIONS = ['jpg', 'png'];

module.exports = {
  FIELDS_TYPES_PER_MODEL,
  MONGO_KEYS,
  MONGO_TRANSFORMATIONS,
  DEFAULT_UPLOAD_EXPIRE_TIME,
  VALID_IMAGE_EXTENSIONS,
};
