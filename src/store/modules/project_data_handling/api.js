import axios from "axios";


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
        loadProjectData({commit, dispatch}, {projectID, projectVersion}) {
            axios.get('/project/'+projectID+'/'+projectVersion+'/objects/').then(res => {
                let data = res.data['Response'];
                commit("proj/LOAD_PROJECT_DATA", data, { root: true });
                let selectedProcess = null;
                let selectedPage = null;
                let selectedNode = null;
                let selectedElement = null;
                dispatch("proj/object_manager/setActivePO",
                    {selectedProcess, selectedPage, selectedNode, selectedElement},
                    { root: true });
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
