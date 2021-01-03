import { emptyProject } from './project_data_handling/empty_project';
import {getProjectBranch, concatValues, get_selected_object, getObjectByRoute, calculateNodeSignature, getResultObjectID} from '../../core/projectManager'
import api from './project_data_handling/api';
import websocket from './project_data_handling/websocket';
import object_manager from './project_data_handling/object_manager'
import TreeModel from 'tree-model'
import Vue from 'vue'
const R = require('ramda');

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
        projectData: emptyProject(),
        projectList: [],
        dataLoaded: false,

        dataObjectDefinitions: {},

        dataFrames: {},
        dataFrameStatus: {},
        nodeExecutionStatus: {},


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
                    result[projectObject.id] = calculateNodeSignature(projectObject.id);
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
                    if (child["type_cd"]!==null) result[child["type_cd"]] = child["function"]["parameters"]
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
                        for (let ElementID of getters.elementLists[NodeID]) {
                            let element = {'id': ElementID, 'children': []};
                            node['children'].push(element);
                        }
                        page['children'].push(node);
                    }
                    process['children'].push(page);
                }
                ProjectDict['children'].push(process);
            }
            // console.log(ProjectDict);
            return ProjectDict
        }
    },
    mutations: {
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
            Vue.set(state.projectData['project_objects'][index], 'display_settings', displaySettings)
        },
        UPDATE_DATAFRAME(state, {nodeID, resultTag, nodeSignature, data}) {
            let dataFrameID = getResultObjectID([nodeID,resultTag,nodeSignature])
            Vue.set(state.dataFrames, dataFrameID,  data);
        },
        DELETE_PROJECT_OBJECT(state, ObjectId) {
            let index = getObjectIndex(state.projectData['project_objects'], ObjectId);
            Vue.delete(state.projectData['project_objects'], index);
        },
        UPDATE_DATA_OBJECT(state, {ObjectID, Object}) {
            let index = getObjectIndex(state.projectData['project_data_objects'], ObjectID);
            if (index === null) {
                state.projectData['project_data_objects'].push(Object)
            }
            else {
                Vue.set(state.projectData['project_data_objects'], index, Object)
            }
        },
        SET_DO_PARAMETER(state, {id, route, value}) {
            let index = getObjectIndex(state.projectData['project_data_objects'], id);

            if (index !== null) {
                let projectObject = state.projectData['project_data_objects'][index];
                let parameterObject = R.clone(projectObject['parameters']);
                console.log(parameterObject, route, value);
                let newParameterObject = parameterObject.setPath(route, value);
                Vue.set(projectObject, 'parameters', newParameterObject)
            }
        },
        DELETE_DATA_OBJECT(state, ObjectId) {
            let index = getObjectIndex(state.projectData['project_data_objects'], ObjectId);
            Vue.delete(state.projectData['project_data_objects'], index);
        },
        UPDATE_DATAFRAME_STATUS(state, {nodeID, resultTag, nodeSignature, status}) {
            let dataFrameID = getResultObjectID([nodeID, resultTag, nodeSignature]);
            Vue.set(state.dataFrameStatus, dataFrameID,  status);
        },
        UPDATE_NODE_EXECUTION_STATUS(state, {nodeID, executionTemplate, nodeSignature, status}) {
            let nodeExecutionID = getResultObjectID([nodeID, executionTemplate, nodeSignature]);
            Vue.set(state.nodeExecutionStatus, nodeExecutionID,  status);
        },
    },
    modules: {
        api,
        object_manager,
        websocket
    }
};
