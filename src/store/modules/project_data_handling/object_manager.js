import axios from "axios";
import router from "../../../Routes";
import TreeModel from 'tree-model'
import {get_active_object} from "../../../core/projectManager";

function getOrDefault(providedValue, defaultValue) {
    return providedValue!==null ? providedValue : defaultValue;
}

function genProjectObjectID() {
    return 'po-'+(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

function getPosition(list) {
    return typeof list !== 'undefined' ? list.length + 1 : 1
}

const defaultNames = {
    100: 'Load Data',
    101: 'Prepare Data',
    102: 'Export',
    103: 'Visualize',
    200: 'Connector',
    201: 'Prepare',
    202: 'Export',
    203: 'Dashboard',
    300: 'Query',
    301: 'Action',
    302: 'Export',
    303: 'Chart',
    400: 'Load Element',
    401: 'Action Element',
    402: 'Chart Element'
};

const childTypes = {
    100: 200,
    101: 201,
    102: 202,
    103: 203,
    200: 300,
    201: 301,
    202: 302,
    203: 303,
    300: 400,
    301: 401,
    303: 402
};

export default {
    namespaced: true,
    actions: {
        setActivePO({state, commit, rootState, rootGetters}, {selectedProcess, selectedPage, selectedNode, selectedElement}) {
            let currentActiveProcess = rootState['proj']['selectedProcess'];
            let currentActivePages = rootState['proj']['selectedPages'];
            let currentActiveNodes = rootState['proj']['selectedNodes'];
            let currentActiveElements = rootState['proj']['selectedElements'];

            let processList = rootGetters['proj/processList'];
            let pageLists = rootGetters['proj/pageLists'];
            let nodeLists = rootGetters['proj/nodeLists'];
            let elementLists = rootGetters['proj/elementLists'];

            let activeProcess = get_active_object(selectedProcess, currentActiveProcess, processList);
            // console.log(selectedPage, currentActivePages[activeProcess], pageLists[activeProcess]);
            let activePage = get_active_object(selectedPage, currentActivePages[activeProcess], pageLists[activeProcess]);
            let activeNode = get_active_object(selectedNode, currentActiveNodes[activePage], nodeLists[activePage]);
            let activeElement = get_active_object(selectedElement, currentActiveElements[activeNode], elementLists[activeNode]);

            commit("proj/SET_SELECTED_PROCESS", activeProcess, { root: true });
            commit("proj/SET_SELECTED_PAGE", {activePage, activeProcess}, { root: true });
            commit("proj/SET_SELECTED_NODE", {activeNode, activePage}, { root: true });
            commit("proj/SET_SELECTED_ELEMENT", {activeElement, activeNode}, { root: true });

        },
        updatePO({commit}, {ProjectObjectID, ProjectObject}) {
            commit("proj/UPDATE_PROJECT_OBJECT", {ProjectObjectID, ProjectObject}, { root: true });
        },
        deletePO({commit, dispatch, rootGetters}, ProjectObjectID) {
            console.log('deletePO', ProjectObjectID);
            let ProjectObject = rootGetters['proj/projectObjects'][ProjectObjectID];
            console.log(ProjectObject);
            let dictTree = rootGetters['proj/ProjectTree'];
            console.log(dictTree);
            let tree = new TreeModel();
            let ProjectTree = tree.parse(dictTree);

            let selectedPO = ProjectTree.first(function (obj) {
                return obj.model.id === ProjectObjectID;
            });
            let childrenIDs = selectedPO.children;
            console.log(childrenIDs);

            commit("proj/DELETE_PROJECT_OBJECT", ProjectObjectID, { root: true });
            dispatch("setActivePO", {selectedProcess:null, selectedPage:null, selectedNode:null, selectedElement:null});
        },
        updateDO({commit}, {DataObjectID, DataObject}) {
            commit("proj/UPDATE_PROJECT_OBJECT", {DataObjectID, DataObject}, { root: true });
        },
        newElement(
            {commit, dispatch, rootGetters},
            {
                typeCD,
                selName,
                existElementID=null,
                selNode=null,
                selPosition=null,
                conObjects=null
            }
        ) {
            let rg = rootGetters;
            let elementID = getOrDefault(existElementID, genProjectObjectID());
            let nodeID = getOrDefault(selNode, rg['proj/activeNode']);
            let relativePosition = getOrDefault(selPosition, getPosition(rg['proj/elementLists'][nodeID]));
            let name = getOrDefault(selName, defaultNames[typeCD]);

            let parameters = {};

            if (conObjects!==null) {
                if (typeCD===400) {
                    parameters = {
                        'node_id': nodeID,
                        'connector_id': conObjects.hasOwnProperty('connector_id') ? conObjects['connector_id'] : null,
                        "cache_data": true,
                        "save_data": false,
                        "local_execution": false,
                        "pass_data": true,
                        "report_data": false
                    }
                }
                if (typeCD===401) {
                    parameters = {
                        'node_id': nodeID,
                        'action_id': conObjects.hasOwnProperty('action_id') ? conObjects['action_id'] : null,
                        "cache_data": true,
                        "save_data": false,
                        "local_execution": false,
                        "pass_data": true,
                        "report_data": false
                    }
                }
            }

            let emptyElement = {
                'id': elementID,
                'name': name,
                'group': 4,
                'type': typeCD,
                "project_id": localStorage.getItem('project_id'),
                "relative_position": relativePosition,
                "front_end_tag": "connector",
                'parameters': parameters,
                "display_settings": {}
            };
            console.log(emptyElement);
            commit("proj/UPDATE_PROJECT_OBJECT", {ObjectID:elementID, Object: emptyElement}, { root: true });
        },
        newNode(
            {commit, dispatch, rootGetters},
            {
                typeCD,
                selName,
                existNodeID=null,
                selPage=null,
                selPosition=null,
                createChild=true,
                conObjects=null
            }
        ) {
            let rg = rootGetters;
            let nodeID = getOrDefault(existNodeID, genProjectObjectID());
            let pageID = getOrDefault(selPage, rg['proj/activePage']);
            let relativePosition = getOrDefault(selPosition, getPosition(rg['proj/nodeLists'][pageID]));
            let name = getOrDefault(selName, defaultNames[typeCD]);

            let emptyNode = {
                'id': nodeID,
                'name': name,
                'group': 3,
                'type': typeCD,
                "project_id": localStorage.getItem('project_id'),
                "relative_position": relativePosition,
                'parameters': {
                    'page_id': pageID,
                },
                "display_settings": {}
            };
            console.log(emptyNode);
            commit("proj/UPDATE_PROJECT_OBJECT", {ObjectID:nodeID, Object: emptyNode}, { root: true });
            if (createChild) {
                let childType = childTypes[typeCD];
                let name = defaultNames[childType];
                dispatch('newElement', {typeCD: childType, selName: name, selNode: nodeID, conObjects: conObjects})
            }
        },
        newPage(
            {commit, dispatch, rootGetters},
            {
                typeCD,
                selName,
                existPageID=null,
                selProcess=null,
                selPosition=null,
                createChild=true,
                conObjects=null
            }
        ) {
            let rg = rootGetters;
            let pageID = getOrDefault(existPageID, genProjectObjectID());
            let processID = getOrDefault(selProcess, rg['proj/activeProcess']);
            let relativePosition = getOrDefault(selPosition, getPosition(rg['proj/pageLists'][processID]));
            let name = getOrDefault(selName, defaultNames[typeCD]);

            let emptyPage = {
                'id': pageID,
                'name': name,
                'group': 2,
                'type': typeCD,
                "project_id": localStorage.getItem('project_id'),
                "relative_position": relativePosition,
                'parameters': {
                    'process_id': processID,
                },
                "display_settings": {}
            };
            commit("proj/UPDATE_PROJECT_OBJECT", {ObjectID: pageID, Object: emptyPage}, { root: true });
            if (createChild) {
                let childType = childTypes[typeCD];
                let name = defaultNames[childType];
                dispatch('newNode', {typeCD: childType, selName: name, selPage: pageID, conObjects: conObjects})
            }
        }
    },
};
