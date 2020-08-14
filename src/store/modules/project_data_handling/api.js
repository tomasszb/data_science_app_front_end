import axios from "axios";
import router from '../../../Routes';

export default {
    namespaced: true,
    state: {
        errorMessage: ""
    },
    mutations: {
        API_CALL_FAILURE(state, payload) {
            //state.isFetching = false;
            state.errorMessage = payload;
        }
    },
    actions: {
        loadProjectData({commit, dispatch}, project) {
            axios.get('/project/'+project.id+'/'+project.version+'/objects/').then(res => {
                window.console.log(res);
                let data = res.data['Response'];
                commit("proj/LOAD_PROJECT_DATA", data, { root: true });
                window.console.log('hello');
                commit("proj/LOAD_OBJECTS", null, { root: true });
                window.console.log('hello2');
                router.push('/app/main');
            }).catch(err => {
              dispatch("callError", err.response.data);
            })
        },
        loadProjectList({commit, dispatch}) {
            axios.get('/project/all/').then(res => {
                let data = res.data['Response'];
                commit("proj/LOAD_PROJECT_LIST", data, { root: true });
            }).catch(err => {
                dispatch("callError", err.response.data);
            })
        },
        loadObjectDefinitions({commit, dispatch}) {
            axios.get('/data_objects/definitions/').then(res => {
                let data = res.data['Response'];
                commit("proj/LOAD_OBJECT_DEFINITIONS", data, { root: true });
            }).catch(err => {
                dispatch("callError", err.response.data);
            })
        },
        callError({commit}, payload) {
            commit("API_CALL_FAILURE", payload);
        },
    },
};
