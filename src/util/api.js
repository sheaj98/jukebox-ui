import axios from 'axios/index';
import config from './config';

const api = axios.create({
  baseURL: `${config.serverUrl}`,
})

export default api;
