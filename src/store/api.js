import axios from "axios";
import dsw_config from "../dsw_config";

export default {
    namespaced: true,
    state: {
        projectData: "www",
        dataObjects: {},
        projectProcesses: [],
        projectPages: {},
        projectNodes: {},
        projectElements: {},
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
        LOAD_OBJECTS(state, data) {
            state.dataObjects= {};
            state.projectProcesses= [];
            state.projectPages= {};
            state.projectNodes= {};
            state.projectElements= {};
            state.dataObjects = data['project_data_objects'];
            let processes = data['children'];
            for (let i1 = 0; i1 < processes.length; i1++) {
                let process = processes[i1];
                let process_id = process['id'];
                state.projectProcesses.push({
                    'id': process_id,
                    'name': process['name'],
                    'type': process['type'],
                    'group': process['group'],
                    'parameters': process['parameters'],
                    'side_icon': dsw_config.projectObjectSettings[process['type']]['sideIcon'],
                    'link': dsw_config.projectObjectSettings[process['type']]['link'],
                });
                let pages = process['children'];
                for (let i2 = 0; i2 < pages.length; i2++) {
                    let page = pages[i2];
                    let page_id = page['id'];
                    if (!(process_id in state.projectPages))  {
                        state.projectPages[process_id] = [];
                    }
                    state.projectPages[process_id].push({
                        'id': page_id,
                        'name': page['name'],
                        'type': page['type'],
                        'group': page['group'],
                        'parameters': page['parameters']
                    });
                    let nodes = page['children'];
                    for (let i3 = 0; i3 < nodes.length; i3++) {
                        let node = nodes[i3];
                        let node_id = node['id'];
                        if (!(page_id in state.projectNodes))  {
                            state.projectNodes[page_id] = [];
                        }
                        state.projectNodes[page_id].push({
                            'id': node_id,
                            'name': node['name'],
                            'type': node['type'],
                            'group': node['group'],
                            'parameters': node['parameters']
                        });
                        let elements = node['children'];
                        for (let i4 = 0; i4 < elements.length; i4++) {
                            let element = elements[i4];
                            let element_id = element['id'];
                            if (!(node_id in state.projectElements))  {
                                state.projectElements[node_id] = [];
                            }
                            state.projectElements[node_id].push({
                                'id': element_id,
                                'name': element['name'],
                                'type': element['type'],
                                'group': element['group'],
                                'parameters': element['parameters']
                            });
                        }
                    }
                }
            }
        },
    },
    actions: {
        loadProjectData({commit, dispatch}) {
            axios.get('/project/1/').then(res => {
                let data = res.data['Response'];
                commit("LOAD_PROJECT_DATA", data);
                commit("LOAD_OBJECTS", data);
            }).catch(err => {
              dispatch("callError", err.response.data);
            })
        },
        callError({commit}, payload) {
            commit("API_CALL_FAILURE", payload);
        },
    },
};
