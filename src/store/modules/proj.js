import { emptyProject } from './project_data_handling/empty_project';
import {getProjectBranch, concatValues, get_selected_object, getObjectByRoute, calculateNodeSignature, getResultObjectID} from '../../core/projectManager'
import api from './project_data_handling/api';
import websocket from './project_data_handling/websocket';
import object_manager from './project_data_handling/object_manager'
import project_manager from './project_data_handling/project_manager'
import TreeModel from 'tree-model'
import Vue from 'vue'
const R = require('ramda');
// require('log-timestamp');

function getObjectIndex(objectList, objectID) {
    let index = null;
    for (let i = 0; i < objectList.length; i++) {
        if (objectList[i].id.toString() === objectID.toString()) {
            index = i;
        }
    }
    return index
}

export default {
    namespaced: true,
    state: {
        project: {},

        projectData: emptyProject(),
        projectList: [],
        dataLoaded: false,

        dataObjectDefinitions: {},
        dataObjectDefinitions2: {},

        dataFrames: {},

        dataFrameStatus: {},
        nodeExecutionStatus: {},
        projectExecutionStatus: {},

        selectedProcess: null,
        selectedPages: {},
        selectedNodes: {},

    },
    getters: {
        projectObjects: state => {
            let projectObjects= {};
            state.projectData['project_objects'].forEach(function (i) {
                projectObjects[i['id']]=i
            });
            return projectObjects
        },
        dataObjects: state => {
            let dataObjects= {};
            state.projectData['project_data_objects'].forEach(function (i) {
                dataObjects[i['id']]=i

            });
            return dataObjects
        },
        processList: (state, getters) => {
            return getProjectBranch(getters.projectObjects, null, null, 1);
        },
        pageLists: (state, getters) => {
            let pageLists =  getProjectBranch(getters.projectObjects, getters.processList, 'process_id', 2);
            pageLists[null] = [];
            return pageLists
        },
        nodeLists: (state, getters) => {
            let nodeLists = getProjectBranch(getters.projectObjects, concatValues(getters.pageLists), 'page_id', 3);
            nodeLists[null] = [];
            return nodeLists
        },
        activeProcess: (state) => {
            return state.selectedProcess
        },
        activePage: (state, getters) => {
            if (getters.activeProcess in state.selectedPages) {
                return state.selectedPages[getters.activeProcess]
            }
            else {
                return null
            }
        },
        activeNode: (state, getters) => {
            if (state.selectedNodes.hasOwnProperty(getters.activePage)) {
                return state.selectedNodes[getters.activePage]
            }
            else {
                return null
            }
        },

        nodeSignatures: (state) => {
            let result = {};
            for (const projectObject of state.projectData['project_objects']) {
                if (projectObject.group===3) {
                    if (projectObject.type===303) {
                        result[projectObject.id] = calculateNodeSignature(projectObject.id, false);
                    } else {
                        result[projectObject.id] = calculateNodeSignature(projectObject.id);
                    }
                }
            }
            return result
        },

        dataObjectTypeMapping: (state, getters) => {
            let result = {};
            for (const [categoryName, category] of Object.entries(state.dataObjectDefinitions)) {
                for (let child  of category["children"]) {
                    if (child["type_cd"]!==null) result[child["type_cd"]] = child["type_name"]
                }
            }
            return result
        },

        dataObjectGroupMapping: (state, getters) => {
            let result = {};
            for (const [categoryName, category] of Object.entries(state.dataObjectDefinitions)) {
                for (let child  of category["children"]) {
                    if (child["group_cd"]!==null) result[child["group_cd"]] = child["group_name"]
                }
            }
            return result
        },

        dataObjectParameterMapping: (state, getters) => {
            let result = {};
            for (const [categoryName, category] of Object.entries(state.dataObjectDefinitions)) {
                for (let child  of category["children"]) {
                    if (child["type_cd"]!==null) {
                        result[child["type_cd"]] = {
                            '__init__': child["function"]["parameters"]
                        }
                        if (child["function"]["type"] === "class") {
                            for (let method of child["function"]["methods"]) {
                                result[child["type_cd"]][method["name"]] = method["parameters"]
                            }
                        }
                    }
                }
            }
            return result
        },

        ProjectTree: (state, getters) => {
            let tree = new TreeModel();

            let ProjectDict = {'id': 'project_tree', 'children': []};
            for (let ProcessID of getters.processList) {
                let process = {'id': ProcessID, 'children': []};
                for (let PageID of getters.pageLists[ProcessID]) {
                    let page = {'id': PageID, 'children': []};
                    for (let NodeID of getters.nodeLists[PageID]) {
                        let node = {'id': NodeID, 'children': []};
                        page['children'].push(node);
                    }
                    process['children'].push(page);
                }
                ProjectDict['children'].push(process);
            }
            // // console.log(ProjectDict);
            return ProjectDict
        },
        ProjectDataTree: (state, getters) => {

            let ProjectDict = {
                ...state.project,
                ...{'project_data_objects': state.projectData['project_data_objects'], 'children': []}
            };
            for (let ProcessID of getters.processList) {
                let process = {
                    ...getters.projectObjects[ProcessID],
                    ...{'children': []}
                };
                for (let PageID of getters.pageLists[ProcessID]) {
                    let page = {
                        ...getters.projectObjects[PageID],
                        ...{'children': []}
                    };
                    for (let NodeID of getters.nodeLists[PageID]) {
                        let node = {
                            ...getters.projectObjects[NodeID],
                            ...{'children': []}
                        };
                        page['children'].push(node);
                    }
                    process['children'].push(page);
                }
                ProjectDict['children'].push(process);
            }
            // // console.log(ProjectDict);
            return ProjectDict
        },
        projectTreeModel: (state, getters) => {
            let tree = new TreeModel();
            return tree.parse(getters.ProjectTree)
        }
    },
    mutations: {
        SET_PROJECT_VARIABLE(state, variables) {
            state.project = variables;
        },
        UNLOAD_PROJECT_DATA(state) {
            state.dataLoaded = false;
            // state.projectData = emptyProject();
            // state.dataFrames = {};
            // state.dataFrameStatus = {};
            // state.nodeExecutionStatus = {};
            // state.projectExecutionStatus = {};
            // state.selectedProcess = null;
            // state.selectedPages = {};
            // state.selectedNodes = {};
        },
        LOAD_PROJECT_DATA(state, data) {
            state.projectData = data;
            state.dataLoaded = true;
        },
        LOAD_PROJECT_LIST(state, data) {
            state.projectList = data;
        },
        LOAD_OBJECT_DEFINITIONS(state, data) {
            state.dataObjectDefinitions = data;
        },
        LOAD_OBJECT_DEFINITIONS2(state, data) {
            state.dataObjectDefinitions2 = data;
        },
        SET_SELECTED_PROCESS(state, selectedProcess) {
            state.selectedProcess = selectedProcess;
        },
        SET_SELECTED_PAGE(state, {activePage, activeProcess}) {
            Vue.set(state.selectedPages, activeProcess, activePage)
        },
        SET_SELECTED_NODE(state, {activeNode, activePage}) {
            Vue.set(state.selectedNodes, activePage, activeNode);
        },
        UPDATE_PROJECT_OBJECT(state, {ObjectID, Object}) {
            let index = getObjectIndex(state.projectData['project_objects'], ObjectID);
            if (index === null) {
                state.projectData['project_objects'].push(Object);
            }
            else {
                Vue.set(state.projectData['project_objects'], index, Object)
            }
        },
        UPDATE_DISPLAY_SETTINGS(state, {ObjectID, displaySettings}) {
            let index = getObjectIndex(state.projectData['project_objects'], ObjectID);
            // console.log('UPDATE_DISPLAY_SETTINGS', state.projectData['project_objects'][index], 'display_settings', displaySettings)
            Vue.set(state.projectData['project_objects'][index], 'display_settings', displaySettings)
        },
        UPDATE_TEMPORARY_SETTINGS(state, {ObjectID, temporarySettings}) {
            let index = getObjectIndex(state.projectData['project_objects'], ObjectID);
            // console.log('UPDATE_TEMPORARY_SETTINGS', state.projectData['project_objects'][index], 'display_settings', displaySettings)
            Vue.set(state.projectData['project_objects'][index], 'temporary_settings', temporarySettings)
        },
        UPDATE_DATAFRAME(state, {nodeID, resultTag, nodeSignature, data}) {
            let dataFrameID = getResultObjectID([nodeID,resultTag])
            Vue.set(state.dataFrames, dataFrameID, data);
        },
        DELETE_PROJECT_OBJECT(state, {ObjectID}) {
            let index = getObjectIndex(state.projectData['project_objects'], ObjectID);
            Vue.delete(state.projectData['project_objects'], index);
        },
        UPDATE_DATA_OBJECT(state, {ObjectID, Object}) {
            // console.log('UPDATE_DATA_OBJECT', Object)
            let index = getObjectIndex(state.projectData['project_data_objects'], ObjectID);
            if (index === null) {
                state.projectData['project_data_objects'].push(Object)
            }
            else {
                Vue.set(state.projectData['project_data_objects'], index, Object)
            }
        },
        NEW_DATA_OBJECT_BULK(state, {Objects}) {
            // console.log('NEW_DATA_OBJECT_BULK', Objects);
            state.projectData['project_data_objects'].push(...Objects)
        },
        SET_DO_PARAMETER(state, {id, route, value}) {
            // console.log('SET_DO_PARAMETER',id, route, value)
            // console.log(state.projectData['project_data_objects'])
            let index = getObjectIndex(state.projectData['project_data_objects'], id);
            if (index !== null) {
                let projectObject = state.projectData['project_data_objects'][index];
                let parameterObject = R.clone(projectObject['parameters']);
                let newParameterObject = parameterObject.setPath(route, value);
                Vue.set(projectObject, 'parameters', newParameterObject)
            }
        },
        DROP_DO_PARAMETER(state, {id, route}) {
            // console.log('DROP_DO_PARAMETER',id, route)
            // console.log(state.projectData['project_data_objects'])
            let index = getObjectIndex(state.projectData['project_data_objects'], id);
            if (index !== null) {
                let projectObject = state.projectData['project_data_objects'][index];
                let parameterObject = R.clone(projectObject['parameters']);

                let valuePath = route.slice(0, route.length-1).join('.');
                let valueName = route[route.length-1];
                let parameter = parameterObject.getPath(valuePath, {});
                delete parameter[valueName];
                parameterObject.setPath(valuePath, parameter)
                Vue.set(projectObject, 'parameters', parameterObject)
            }
        },
        DELETE_DATA_OBJECT(state, {ObjectID}) {
            let index = getObjectIndex(state.projectData['project_data_objects'], ObjectID);
            Vue.delete(state.projectData['project_data_objects'], index);
        },
        UPDATE_DATAFRAME_STATUS(state, {nodeID, resultTag, nodeSignature, status}) {
            let dataFrameID = getResultObjectID([nodeID, resultTag]);
            Vue.set(state.dataFrameStatus, dataFrameID,  status);
        },
        UPDATE_NODE_EXECUTION_STATUS(state, {nodeID, executionTemplate, nodeSignature, status}) {
            let nodeExecutionID = getResultObjectID([nodeID, executionTemplate]);
            Vue.set(state.nodeExecutionStatus, nodeExecutionID,  status);
        },
        UPDATE_PROJECT_EXECUTION_STATUS(state, {projectID, command, status}) {
            let projectExecutionID = getResultObjectID([projectID, command]);
            Vue.set(state.projectExecutionStatus, projectExecutionID,  status);
        },
    },
    modules: {
        api,
        object_manager,
        project_manager,
        websocket
    }
};
