let baseUrl = '';
let serverUrl = '';
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://youthful-johnson-c53610.netlify.com/';
  serverUrl = 'https://jukebox-server.vapor.cloud/';
} else {
  baseUrl = 'http://localhost:8081/';
  serverUrl = 'http://localhost:8080/';
}

const clientId = '61e4ecaea963457a9e33717688827852';
const scope = 'user-read-private user-read-email streaming user-modify-playback-state user-read-playback-state user-read-birthdate';
const url = 'https://accounts.spotify.com/authorize?client_id=' + clientId + // eslint-disable-line
  '&redirect_uri=' + encodeURIComponent(baseUrl) +
  '&scope=' + encodeURIComponent(scope) +
  '&response_type=token';
export default {
  url,
  baseUrl,
  serverUrl,
};
