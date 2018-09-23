import axios from 'axios/index';
import config from './config';

const api = axios.create({
  baseURL: `http://${config.serverUrl}`,
})

export default api;
