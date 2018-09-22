/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  songs: [],
  partyId: '',
}

const mutations = {
  set_party_id: (state, payload) => {
    state.partyId = payload;
  },
  set_songs: (state, payload) => {
    state.songs = payload;
  },
}

const actions = {
  setPartyId: ({ commit }, payload) => {
    commit('set_party_id', payload);
  },
  setSongs: ({ commit }, payload) => {
    commit('set_songs', payload);
  },
}

const getters = {
  partyId: state => state.partyId,
  songs: state => state.songs,
}

export default {
  state,
  mutations,
  actions,
  getters,
};
