import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import s3actions from '~redux/S3/actions';
import FileDropzone from '~app/components/FileDropzone';
import { uploadFileToS3 } from '~services/FileService';

import styles from './styles.module.scss';

function FileDropzoneExample() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const handleDrop = droppedFile => dispatch(s3actions.uploadImage(droppedFile));
  return (
    <div className={`full-width m-bottom-3 ${styles.container}`}>
      <h3 className="subtitle bold text-center m-bottom-4">File Dropzone</h3>
      <FileDropzone types={['.jpg', '.png']} handleDrop={handleDrop} file={file} />
    </div>
  );
}

export default FileDropzoneExample;
