import axios from "axios";
import config from "@/config";
import mock from '@/mock';

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
            const promise = new Promise((resolve, reject) => {
                if (config.mock) {
                    let res = {'data': mock.project_objects_data_1};
                    resolve(res);
                } else {
                    resolve(axios.get('/project/'+projectID+'/'+projectVersion+'/objects/'));
                }
            });
            promise.then(res => {
                let data = res.data['Response'];
                console.log('hello', data);
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
            const promise = new Promise((resolve, reject) => {
                if (config.mock) {
                    let res = {'data': mock.project_all_1};
                    resolve(res);
                } else {
                    resolve(axios.get('/project/all/'));
                }
            });
            promise.then(res => {
                let data = res.data['Response'];
                commit("proj/LOAD_PROJECT_LIST", data, { root: true });
            }).catch(err => {
                dispatch("callError", err.response.data);
            })
        },
        loadObjectDefinitions({commit, dispatch}) {
            const promise = new Promise((resolve, reject) => {
                if (config.mock) {
                    let res = {'data': mock.data_object_definitions_1};
                    resolve(res);
                } else {
                    resolve(axios.get('/data_objects/definitions/'));
                }
            });
            promise.then(res => {
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
