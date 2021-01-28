import { createTypes, completeTypes } from 'redux-recompose';

import FileService from '../../services/FileService';

import { TARGETS } from './constants';

export const actions = createTypes(completeTypes([], ['UPLOAD_IMAGE']), '@@S3');

export const actionCreators = {
  uploadImage: file => ({
    type: actions.UPLOAD_IMAGE,
    target: TARGETS.UPLOAD_IMAGE,
    payload: file,
    service: FileService.uploadFileToS3
  })
};

export default actionCreators;
