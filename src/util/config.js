let baseUrl = '';
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://youthful-johnson-c53610.netlify.com/';
} else {
  baseUrl = 'http://localhost:8080/';
}

const clientId = '61e4ecaea963457a9e33717688827852';
const scope = 'user-read-private user-read-email';
const url = 'https://accounts.spotify.com/authorize?client_id=' + clientId + // eslint-disable-line
  '&redirect_uri=' + encodeURIComponent(baseUrl) +
  '&scope=' + encodeURIComponent(scope) +
  '&response_type=token';
export default {
  url,
};
