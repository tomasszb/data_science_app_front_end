import { emptyProject } from './project_data_handling/empty_project';
import {getProjectBranch, concatValues, get_active_object} from '../../core/projectManager'
import api from './project_data_handling/api';
import object_manager from './project_data_handling/object_manager'

export default {
    namespaced: true,
    state: {
        projectData: emptyProject(),

        dataObjectDefinitions: {},
        dataObjects: {},
        projectObjects: {},

        projectList: [],
        processList: [],
        pageLists: {},
        nodeLists: {},
        elementLists: {},

        activeProcess: null,
        activePages: {},
        activeNodes: {},
        activeElements: {}

    },
    getters: {
        projectObjects: state => {
            let projectObjects= {};
            state.projectData['project_objects'].forEach(function (i) {
                projectObjects[i['id']]=i
            });
            return projectObjects
        }
    },
    mutations: {
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
                state.projectObjects[id] = data[id]
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
            state.processList = getProjectBranch(state.projectObjects, null, null, 1);
            state.pageLists = getProjectBranch(state.projectObjects, state.processList, 'process_id', 2);
            state.nodeLists = getProjectBranch(state.projectObjects, concatValues(state.pageLists), 'page_id', 3);
            state.elementLists = getProjectBranch(state.projectObjects, concatValues(state.nodeLists), 'node_id', 4);
        },
        SET_ACTIVE_PROCESS(state, selectedProcess) {
            state.activeProcess = get_active_object(selectedProcess, state.activeProcess, state.processList)
        },
        SET_ACTIVE_PAGE(state, selectedPage) {
            state.activePages[state.activeProcess] = get_active_object(selectedPage, state.activePage, state.pageLists[state.activeProcess])
        },
        SET_ACTIVE_NODE(state, selectedNode) {
            state.activeNodes[state.activePage] = get_active_object(selectedNode, state.activeNode, state.nodeList[state.activePage])
        },
        SET_ACTIVE_ELEMENT(state, selectedElement) {
            state.activeElements[state.activeNode] = get_active_object(selectedElement, state.activeElement, state.nodeList[state.activeNode])
        }
    },
    modules: {
        api,
        object_manager
    }
};
