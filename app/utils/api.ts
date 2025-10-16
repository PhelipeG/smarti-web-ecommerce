import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
