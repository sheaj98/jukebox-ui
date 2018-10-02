import Vue from 'vue';
import LogRocket from 'logrocket';
import createPlugin from 'logrocket-vuex';
import Vuex from 'vuex';
import auth from './modules/auth';
import playback from './modules/playback';

LogRocket.init('eianfk/jukebox');

const logrocketPlugin = createPlugin(LogRocket);

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    playback,
  },
  plugins: [logrocketPlugin],
});
