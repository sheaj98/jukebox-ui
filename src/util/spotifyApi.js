import axios from 'axios/index';

const spotifyAPI = axios.create({
  baseURL: 'https://api.spotify.com/v1',
})

spotifyAPI.interceptors.request.use((apiConfig) => {
  const token = localStorage.getItem('spotify_token');
// eslint-disable-next-line no-param-reassign
  apiConfig.headers.Authorization = token ? `Bearer ${token}` : '';
  return apiConfig;
});

export default spotifyAPI;
