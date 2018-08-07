/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  isLoggedIn: localStorage.getItem('spotify_token') != null,
  loginPending: false,
};

const mutations = {
  login: (state) => {
    state.loginPending = true;
  },
  loginSuccess: (state) => {
    state.loginPending = false;
    state.isLoggedIn = true;
  },
};

const actions = {
  login: ({ commit }, payload) => {
    commit('login');
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('spotify_token', payload);
        commit('loginSuccess');
        resolve();
      }, 1000);
    });
  },
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  isLoginPending: state => state.loginPending,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

