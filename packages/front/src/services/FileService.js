import api, { createApiWithURL } from '~config/api';

const getSignedImageUrl = (filename, extension) =>
  api.post('/files/signed_url', {
    name: filename,
    extension
  });

const uploadFileToS3 = async file => {
  const [filename, extension] = file.name.split('.');

  try {
    const response = await getSignedImageUrl(filename, extension);

    const payload = response.data;

    const formData = new FormData();

    Object.keys(payload.fields).forEach(field => {
      formData.append(field, payload.fields[field]);
    });

    formData.append('file', file);

    const imageUploadResponse = await createApiWithURL(payload.url).post('', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    });

    return imageUploadResponse;
  } catch (err) {
    return { ok: false, data: err };
  }
};

export default {
  uploadFileToS3
};
