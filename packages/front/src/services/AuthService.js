import api from '~config/api';

export const signIn = ({ email, password }) => api.post('/sign_in', { email, password });
