import Vue from 'vue';
import Vuex from 'vuex';

import layout from './modules/layout';
import auth from './modules/auth';
import register from './modules/register';
import proj from './modules/proj';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    register,
    proj
  },
});
