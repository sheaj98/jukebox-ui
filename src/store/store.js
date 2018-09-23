import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import playback from './modules/playback';
import party from './modules/party';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    playback,
  },
});
