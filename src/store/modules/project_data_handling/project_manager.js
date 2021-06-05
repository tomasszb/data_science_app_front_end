import axios from "axios";
import router from "../../../Routes";
const R = require('ramda');

export default {
    namespaced: true,
    actions: {
        updateProjectVariables({state, commit, rootState, rootGetters}, {newVariables}) {
            // let existVariables = rootState.project;
            // let variables = {...existVariables, ...newVariables }
            commit("proj/SET_PROJECT_VARIABLE", newVariables, { root: true });
        }
    },
};
