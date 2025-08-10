import axios from 'axios';

const API_NAME = 'https://api.themoviedb.org/3';

const httpRequest = axios.create({
  baseURL: API_NAME,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export const get = async (path: string) => {
  console.log(`REQUEST :: GET :: ${API_NAME}${path}`);
  const response = await httpRequest
    .get(path)
    .then(res => {
      console.log('res : ', res);
      return res.data;
    })
    .catch(err => {
      console.log('err : ', err);
      return Promise.reject(err.response?.data || { message: err.message });
    });
  return response;
};

export const post = async (path: string, body: object) => {
  console.log(`REQUEST :: POST :: ${API_NAME}${path}`);
  const response = await httpRequest
    .post(path, body)
    .then(res => {
      console.log('res : ', res);
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response?.data || { message: err.message });
    });

  return response;
};

export const patch = async (path: string, body: object) => {
  console.log(`REQUEST :: PATCH :: ${API_NAME}${path}`);
  const response = await httpRequest
    .patch(path, body)
    .then(res => {
      console.log('res : ', response);
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response?.data || { message: err.message });
    });
  return response;
};

export const del = async (path: string) => {
  console.log(`REQUEST :: DEL :: ${API_NAME}${path}`);
  const response = await httpRequest
    .delete(path)
    .then(res => {
      console.log('res : ', res);
      return res.data;
    })
    .catch(err => {
      return Promise.reject(err.response?.data || { message: err.message });
    });
  return response;
};
