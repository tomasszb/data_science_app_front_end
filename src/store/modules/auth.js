import axios from "axios";
import jwt from "jsonwebtoken";
import router from '../../Routes';

export default {
    namespaced: true,
    state: {
        isFetching: false,
        errorMessage: ''
    },
    mutations: {
        LOGIN_FAILURE(state, payload) {
            state.isFetching = false;
            state.errorMessage = payload;
        },
        LOGIN_SUCCESS(state) {
            state.isFetching = false;
            state.errorMessage = '';
        },
        LOGIN_REQUEST(state) {
            state.isFetching = true;
        },
    },
    actions: {
        loginUser({dispatch}, creds) {
              dispatch('requestLogin');
              if (creds.email.length > 0 && creds.password.length > 0) {
                axios.post("/accounts/login/", creds).then(res => {
                  const token = res.data.token;
                  dispatch('receiveToken', token);
                }).catch(err => {
                  dispatch('loginError', err.response.data);
                })

              } else {
                dispatch('loginError', 'Something was wrong. Try again');
              }
        },
        receiveToken({dispatch}, token) {
          let decoded_token = {};
          decoded_token = jwt.decode(token);
          const user = decoded_token.email;
          const expires = decoded_token.exp;

          localStorage.setItem('token', token);
          localStorage.setItem('user', user);
          localStorage.setItem('expires', expires);
          axios.defaults.headers.common['Authorization'] = "JWT " + token;
          dispatch('receiveLogin');
        },
        logoutUser() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            axios.defaults.headers.common['Authorization'] = "";
            router.push('/login');
        },
        loginError({commit}, payload) {
            commit('LOGIN_FAILURE', payload);
        },
        receiveLogin({commit}) {
            commit('LOGIN_SUCCESS');
            router.push('/projects');
        },
        requestLogin({commit}) {
            commit('LOGIN_REQUEST');
        },
    },
};
