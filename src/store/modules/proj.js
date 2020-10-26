import { emptyProject } from './project_data_handling/empty_project';
import {getProjectBranch, concatValues, get_selected_object} from '../../core/projectManager'
import api from './project_data_handling/api';
import websocket from './project_data_handling/websocket';
import object_manager from './project_data_handling/object_manager'
import TreeModel from 'tree-model'
import Vue from 'vue'

function getObjectIndex(objectList, objectID) {
    let index = null;
    for (let i = 0; i < objectList.length; i++) {
        if (objectList[i].id === objectID) {
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
                            let element = {'id': ElementID, 'children': []}
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
        UPDATE_DATAFRAME_MAPPING(state, {srcRequestID, tableSettings}) {
            Vue.set(state.dataFrameMapping, tableSettings, srcRequestID);
        },
        UPDATE_DATAFRAME(state, {ObjectId, srcRequestID, data}) {
            Vue.set(state.dataFrames, srcRequestID,  data);
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
