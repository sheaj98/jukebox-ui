// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import store from './store/store';

Vue.use(Vuetify, {
  theme: {
    primary: '#0B0C10',
    secondary: '#1F2833',
    accent: '#66FCF1',
    error: '#b71c1c',
    info: '#C5C6C7',
  },
})

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
