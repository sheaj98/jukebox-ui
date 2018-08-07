import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import PartyView from '@/components/PartyView';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/party',
      name: 'PartyView',
      component: PartyView,
    },
  ],
});
