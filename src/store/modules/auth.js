/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  isLoggedIn: localStorage.getItem('spotify_token') !== null && localStorage.getItem('spotify_token') !== 'undefined',
  loginPending: false,
  spotifyToken: null,
};

const mutations = {
  login: (state) => {
    state.loginPending = true;
  },
  loginSuccess: (state, payload) => {
    state.loginPending = false;
    state.isLoggedIn = true;
    state.spotifyToken = payload;
  },
};

const actions = {
  login: ({ commit }, payload) => {
    commit('login');
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('spotify_token', payload);
        commit('loginSuccess', payload);
        resolve();
      }, 1000);
    });
  },
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  isLoginPending: state => state.loginPending,
  getSpotifyToken: state => state.spotifyToken,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

