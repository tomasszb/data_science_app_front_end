import { emptyProject } from './project_data_handling/empty_project';
import {getProjectBranch, concatValues, get_selected_object, getObjectByRoute} from '../../core/projectManager'
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
        dataFrameMapping: {},

        selectedProcess: null,
        selectedPages: {},
        selectedNodes: {},
        selectedElements: {},

        projectObjectStatuses: {}

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
        elementLists: (state, getters) => {
            let elementLists = getProjectBranch(getters.projectObjects, concatValues(getters.nodeLists), 'node_id', 4);
            elementLists[null] = [];
            return elementLists
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
        nodeElements: (state, getters) => {
            let result = {};
            if (getters.elementLists.hasOwnProperty(getters.activeNode)) {
                for (let nodeID of Object.keys(getters.elementLists)) {
                    result[nodeID] = {};
                    for (let elementID of getters.elementLists[nodeID]) {
                        let element = getters.projectObjects[elementID];
                        if (element['front_end_tag']!=='') {
                            result[nodeID][element['front_end_tag']] = element.id
                        }
                    }
                }
            }
            return result
        },
        activeElement: (state, getters) => {
            if (state.selectedElements.hasOwnProperty(getters.activeNode)) {
                return state.selectedElements[getters.activeNode]
            }
            else {
                return null
            }
        },
        activeElementSettings: (state, getters) => {
            if (getters.activeElement != null) {
                return getters.projectObjects[getters.activeElement]
            }
            else {
                return null
            }
        },
        activeObjectSettings: (state, getters) => {
            if (getters.activeElement != null) {
                return getters.projectObjects[getters.activeElement]
            }
            else {
                return null
            }
        },
        activeElementDisplaySettings: (state, getters) => {
            if (getters.activeElementSettings != null) {
                if(typeof getters.activeElementSettings['display_settings']!='undefined') {
                    return getters.activeElementSettings['display_settings']
                }
                else {
                    return {}
                }
            }
            else {
                return null
            }
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
        },
        projectObjectDataObjects: (state, getters) => {
            let result = {};
            let empty = {'actions': [], 'connectors': []};
            let emptyElement = {'action': null, 'connector': null};
            for (let processID of getters.processList) {
                result[processID] = R.clone(empty);
                for (let pageID of getters.pageLists[processID]) {
                    result[pageID] = R.clone(empty);
                    for (let nodeID of getters.nodeLists[pageID]) {
                        result[nodeID] = R.clone(empty);
                        for (let elementID of getters.elementLists[nodeID]) {
                            result[elementID] = R.clone(emptyElement);

                            let elementSettings = getters.projectObjects[elementID];
                            let parameters = elementSettings['parameters'];
                            if (parameters['local_execution']===false) {

                                let connectorID = parameters['connector_id'];
                                if (typeof connectorID !=='undefined') {
                                    result[processID]['connectors'].push(connectorID);
                                    result[pageID]['connectors'].push(connectorID);
                                    result[nodeID]['connectors'].push(connectorID);
                                    result[elementID]['connector']=connectorID;
                                }

                                let actionID = parameters['action_id'];
                                if (typeof actionID !=='undefined') {
                                    result[processID]['actions'].push(actionID);
                                    result[pageID]['actions'].push(actionID);
                                    result[nodeID]['actions'].push(actionID);
                                    result[elementID]['action']=actionID;
                                }
                            }



                        }
                    }
                }
            }
            return result
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
        SET_SELECTED_ELEMENT(state, {activeElement, activeNode}) {
            Vue.set(state.selectedElements, activeNode, activeElement);
        },
        UPDATE_PROJECT_OBJECT(state, {ObjectID, Object}) {
            let index = getObjectIndex(state.projectData['project_objects'], ObjectID);
            if (index === null) {
                state.projectData['project_objects'].push(Object)
            }
            else {
                Vue.set(state.projectData['project_objects'], index, Object)
            }
        },
        UPDATE_DISPLAY_SETTINGS(state, {ObjectID, displaySettings}) {
            let index = getObjectIndex(state.projectData['project_objects'], ObjectID);
            Vue.set(state.projectData['project_objects'][index], 'display_settings', displaySettings)
        },
        UPDATE_DATAFRAME_MAPPING(state, {dataFrameID, settings}) {
            Vue.set(state.dataFrameMapping, settings, dataFrameID);
        },
        UPDATE_DATAFRAME(state, {dataFrameID, data}) {
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
        UPDATE_DATA_OBJECT_PARAMETER(state, {objectID, route, parameterName, parameterValue}) {
            let index = getObjectIndex(state.projectData['project_data_objects'], objectID);

            if (index !== null) {
                if (route!=null) {
                    let parameterObject = getObjectByRoute(route, state.projectData['project_data_objects'][index]['parameters']);
                    if (parameterObject!=null) {
                        Vue.set(parameterObject, parameterName, parameterValue)
                    }
                }
                else {
                    Vue.set(state.projectData['project_data_objects'][index]['parameters'], parameterName, parameterValue)
                }
            }
        },
        DELETE_DATA_OBJECT(state, ObjectId) {
            let index = getObjectIndex(state.projectData['project_data_objects'], ObjectId);
            Vue.delete(state.projectData['project_data_objects'], index);
        },
        UPDATE_PROJECT_OBJECT_STATUS(state, {ObjectId, status}) {
            Vue.set(state.projectObjectStatuses, ObjectId, status)
        },
    },
    modules: {
        api,
        object_manager,
        websocket
    }
};
