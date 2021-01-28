import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import i18next from 'i18next';
import { arrayOf, func, instanceOf, string } from 'prop-types';

import FileUploadIcon from '~assets/cloud-upload.svg';

import styles from './styles.module.scss';

function FileDropzone({ handleDrop, types, file }) {
  const onDrop = useCallback(files => handleDrop(files[0]), [handleDrop]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: types,
    multiple: false
  });

  const inputProps = getInputProps();
  const rootProps = getRootProps();
  return file ? (
    <div>
      <span>{file?.name}</span>
    </div>
  ) : (
    <div className={`column full-width space-between ${styles.dropZoneContainer}`}>
      <button
        type="button"
        className={`column center space-evenly full-width ${styles.dropZone}`}
        {...rootProps}>
        <input className="full-height" {...inputProps} />
        <img src={FileUploadIcon} className={styles.uploadImg} />
        <span className="title">
          {i18next.t(`FileDropzone:${isDragActive ? 'dropHere' : 'dragOrClick'}`)}
        </span>
      </button>
      <div className={`column center middle full-width ${styles.dropzoneFooter}`}>
        <h4 className="large-text bold">{i18next.t('FileDropzone:supportedFormats')}</h4>
        <div className="row wrap">
          {types?.map(type => (
            <span key={type} className="large-text m-right-2">
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

FileDropzone.propTypes = {
  handleDrop: func.isRequired,
  title: string.isRequired,
  types: arrayOf(string).isRequired,
  file: instanceOf(File)
};

export default FileDropzone;
