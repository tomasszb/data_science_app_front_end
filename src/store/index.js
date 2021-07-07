import Vue from 'vue';
import Vuex from 'vuex';

import layout from './modules/layout';
import auth from './modules/auth';
import register from './modules/register';
import proj from './modules/proj';

import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  modules: {
    layout,
    auth,
    register,
    proj
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ],
});
