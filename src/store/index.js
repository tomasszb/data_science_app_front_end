import Vue from 'vue';
import Vuex from 'vuex';

import layout from './layout';
import auth from './auth';
import register from './register';
import api from './api/api';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    register,
    api
  },
});
