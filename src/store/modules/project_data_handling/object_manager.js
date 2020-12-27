import axios from "axios";
import router from "../../../Routes";
import TreeModel from 'tree-model'
import {get_active_object} from "../../../core/projectManager";
const R = require('ramda');

function getOrDefault(providedValue, defaultValue) {
    return providedValue!==null ? providedValue : defaultValue;
}

function genProjectObjectID() {
    return 'po-'+(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

function genDataObjectID() {
    return 'do-'+(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
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
        setActivePO({state, commit, rootState, rootGetters}, {selectedProcess, selectedPage, selectedNode}) {
            let currentActiveProcess = rootState['proj']['selectedProcess'];
            let currentActivePages = rootState['proj']['selectedPages'];
            let currentActiveNodes = rootState['proj']['selectedNodes'];

            let processList = rootGetters['proj/processList'];
            let pageLists = rootGetters['proj/pageLists'];
            let nodeLists = rootGetters['proj/nodeLists'];

            let activeProcess = get_active_object(selectedProcess, currentActiveProcess, processList);
            // console.log(selectedPage, currentActivePages[activeProcess], pageLists[activeProcess]);
            let activePage = get_active_object(selectedPage, currentActivePages[activeProcess], pageLists[activeProcess]);
            let activeNode = get_active_object(selectedNode, currentActiveNodes[activePage], nodeLists[activePage]);

            commit("proj/SET_SELECTED_PROCESS", activeProcess, { root: true });
            commit("proj/SET_SELECTED_PAGE", {activePage, activeProcess}, { root: true });
            commit("proj/SET_SELECTED_NODE", {activeNode, activePage}, { root: true });

        },
        updatePO({commit}, {ProjectObjectID, ProjectObject}) {
            commit("proj/UPDATE_PROJECT_OBJECT", {ProjectObjectID, ProjectObject}, { root: true });
        },
        deletePO({commit, dispatch, rootGetters}, ProjectObjectID) {
            console.log('deletePO', ProjectObjectID);
            let ProjectObject = rootGetters['proj/projectObjects'][ProjectObjectID];
            let dictTree = rootGetters['proj/ProjectTree'];
            let tree = new TreeModel();
            let ProjectTree = tree.parse(dictTree);

            let selectedPO = ProjectTree.first(function (obj) {
                return obj.model.id === ProjectObjectID;
            });
            let childrenIDs = selectedPO.children;

            commit("proj/DELETE_PROJECT_OBJECT", ProjectObjectID, { root: true });
            dispatch("setActivePO", {selectedProcess:null, selectedPage:null, selectedNode:null});
        },
        updateDO({commit}, {DataObjectID, DataObject}) {
            commit("proj/UPDATE_PROJECT_OBJECT", {DataObjectID, DataObject}, { root: true });
        },
        newNode(
            {commit, dispatch, rootGetters},
            {
                typeCD,
                selName=null,
                existNodeID=null,
                selPage=null,
                selPosition=null,
                dataObjectTags=null
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
            commit("proj/UPDATE_PROJECT_OBJECT", {ObjectID:nodeID, Object: emptyNode}, { root: true });
        },
        copyDataObject(
            {commit, dispatch, rootGetters},
            {
               dataObjectID
            }
        ) {
            let dataObject = R.clone(rootGetters['proj/dataObjects'][dataObjectID]);
            let newDataObjectID = genDataObjectID();
            dataObject['id'] = newDataObjectID;
            commit("proj/UPDATE_DATA_OBJECT", {ObjectID: newDataObjectID, Object: dataObject}, { root: true });
            return newDataObjectID;
        },
        copyProjectObject(
            {commit, dispatch, rootGetters},
            {
                projectObjectID
            }
        ) {
            let projectObject = R.clone(rootGetters['proj/projectObjects'][projectObjectID]);
            let newProjectObjectID = genProjectObjectID();
            projectObject['id'] = newProjectObjectID;

            let newDataObjectTags = {};
            for (const [tag, dataObjectID] of Object.entries(projectObject['data_object_tags'])) {
                newDataObjectTags[tag] = dispatch('copyDataObject', {dataObjectID: dataObjectID})
            }

            commit("proj/UPDATE_PROJECT_OBJECT", {ObjectID: newProjectObjectID, Object: projectObject}, { root: true });
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
                dataObjectTags=null
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
                "data_object_tags": dataObjectTags,
                'parameters': {
                    'process_id': processID,
                },
                "display_settings": {}
            };
            commit("proj/UPDATE_PROJECT_OBJECT", {ObjectID: pageID, Object: emptyPage}, { root: true });
            if (createChild) {
                let childType = childTypes[typeCD];
                let dataObjectTags = {};
                if (childType===300) {
                    dataObjectTags['query'] = null;
                }
                let name = defaultNames[childType];
                dispatch('newNode', {typeCD: childType, selName: name, selPage: pageID, dataObjectTags: dataObjectTags})
            }
        }
    },
};
