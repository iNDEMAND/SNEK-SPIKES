import axios from 'axios';

const port = 8000;
const baseURL = `http://localhost:${port}`;
// const baseURL = `/api/`;

export const axiosClient = axios.create({
  baseURL: `${baseURL}/api/`,

});

export const cookiesClient = axios.create({
  // baseURL: `${baseURL}/sessions/`,
  baseURL: '/sessions/',
});
