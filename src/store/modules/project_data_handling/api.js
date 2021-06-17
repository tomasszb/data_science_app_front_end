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
        createNewProject({commit, dispatch}, {data}) {
            let newVariables = {project_version: null, id: null, parameters: data, status: "preparing request"}
            dispatch("proj/project_manager/updateProjectVariables",
                {newVariables},
                { root: true }
            );
            const promise = new Promise((resolve, reject) => {
                if (config.mock) {
                    let res = {'id': mock.new_project};
                    resolve(res);
                } else {
                    resolve(axios.post('/project/', data));
                }
            });
            promise.then(res => {
                let response = res.data['Response'];
                let newVariables = {project_version: 1, id: response.id, parameters: data, status: "project registered"}
                dispatch("proj/project_manager/updateProjectVariables",
                    {newVariables},
                    { root: true }
                );
            }).catch(err => {
                dispatch("callError", err.response.data);
            })
        },
        saveProject({commit, dispatch}, {projectID, projectVersion, projectDataTree}) {
            console.log(projectDataTree)
            const promise = new Promise((resolve, reject) => {
                resolve(axios.post('/project/'+projectID+'/'+projectVersion+'/', projectDataTree));
            });
            promise.then(res => {
                let data = res.data['Response'];
            }).catch(err => {
                dispatch("callError", err.response.data);
            })
        },
        loadProjectData({commit, dispatch}, {projectID, projectVersion}) {
            localStorage.setItem('project_id', projectID);
            localStorage.setItem('project_version', projectVersion);
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
                console.log('loadProjectData', data);
                let newVariables = {project_version: 1, id: data.id, parameters: {}, status: "project loaded"}
                dispatch("proj/project_manager/updateProjectVariables",
                    {newVariables},
                    { root: true }
                );

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
