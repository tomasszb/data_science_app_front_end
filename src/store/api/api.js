import axios from "axios";
import dsw_config from "../../dsw_config";
import { emptyProject } from './empty_project';
import router from '../../Routes';

export default {
    namespaced: true,
    state: {
        projectData: emptyProject(),
        dataObjectDefinitions: {},
        dataObjects: {},
        projectObjects: {},
        projectList: [],
        errorMessage: "",
    },
    mutations: {
        API_CALL_FAILURE(state, payload) {
            //state.isFetching = false;
            state.errorMessage = payload;
        },
        LOAD_PROJECT_DATA(state, data) {
            state.projectData = data;
        },
        LOAD_PROJECT_LIST(state, data) {
            state.projectList = data;
        },
        LOAD_OBJECT_DEFINITIONS(state, data) {
            state.dataObjectDefinitions = data;
        },
        UPDATE_PROJECT_OBJECTS(state, data) {
            for (let id in data) {
                state.projectObjects[parseInt(id,10)] = data[id]
            }
        },
        LOAD_OBJECTS(state) {
            state.projectObjects= {};
            state.dataObjects = {};
            state.projectData['project_objects'].forEach(function (i) {
               state.projectObjects[i['id']]=i
            });
            state.projectData['project_data_objects'].forEach(function (i) {
                state.dataObjects[i['id']]=i
            });

        },
    },
    actions: {
        loadProjectData({commit, dispatch}, project) {
            axios.get('/project/'+project.id+'/'+project.version+'/objects/').then(res => {
                let data = res.data['Response'];
                commit("LOAD_PROJECT_DATA", data);
                dispatch("loadObjects");
                router.push('/app/main');
            }).catch(err => {
              dispatch("callError", err.response.data);
            })
        },
        loadProjectList({commit, dispatch}) {
            axios.get('/project/all/').then(res => {
                let data = res.data['Response'];
                commit("LOAD_PROJECT_LIST", data);
            }).catch(err => {
                dispatch("callError", err.response.data);
            })
        },
        loadObjects({commit}) {
            commit("LOAD_OBJECTS");
        },
        updateProjectObjects({commit}, updatedProjectObjects) {
            commit("UPDATE_PROJECT_OBJECTS", updatedProjectObjects);
        },
        loadObjectDefinitions({commit, dispatch}) {
            axios.get('/data_objects/definitions/').then(res => {
                let data = res.data['Response'];
                commit("LOAD_OBJECT_DEFINITIONS", data);
            }).catch(err => {
                dispatch("callError", err.response.data);
            })
        },
        callError({commit}, payload) {
            commit("API_CALL_FAILURE", payload);
        },
    },
};
