import axios from "axios";
import router from "../../../Routes";
import {newFilterObject, newSortObject, newDescribeObject, newDescribeQuickObject} from "../../../core/newObjects/common";
import TreeModel from 'tree-model'
import {get_active_object} from "../../../core/projectManager";
import store from "@/store";
const R = require('ramda');


export default {
    namespaced: true,
    actions: {
        setDataObjectParameter({state, commit, rootState, rootGetters}, {id, route, value}) {
            // console.log('setDataObjectParameter', id, route, value)
            commit("proj/SET_DO_PARAMETER", {id, route, value}, {root: true});
        },
        dropDataObjectParameter({state, commit, rootState, rootGetters}, {id, route, value}) {
            commit("proj/DROP_DO_PARAMETER", {id, route, value}, {root: true});
        },
        updateDataObject({state, commit, rootState, rootGetters}, {ObjectID, Object}) {
            commit("proj/UPDATE_DATA_OBJECT", {ObjectID, Object}, {root: true});
        },
        newDataObjectsBulk({state, commit, rootState, rootGetters}, {Objects}) {
            commit("proj/NEW_DATA_OBJECT_BULK", {Objects}, {root: true});
        },
        setActivePO({state, commit, rootState, rootGetters}, {selectedProcess, selectedPage, selectedNode}) {
            // console.log('setActivePO start')
            let currentActiveProcess = rootState['proj']['selectedProcess'];
            let currentActivePages = rootState['proj']['selectedPages'];
            let currentActiveNodes = rootState['proj']['selectedNodes'];

            let processList = rootGetters['proj/processList'];
            let pageLists = rootGetters['proj/pageLists'];
            let nodeLists = rootGetters['proj/nodeLists'];

            let activeProcess = get_active_object(selectedProcess, currentActiveProcess, processList);
            // // console.log(selectedPage, currentActivePages[activeProcess], pageLists[activeProcess]);
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
            // // console.log('deletePO', ProjectObjectID);
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
            {typeCD, name, nodeID, pageID, position, dataObjectTags, sourceNodeID=null}
        ) {
            let emptyNode = {
                'id': nodeID,
                'name': name,
                'group': 3,
                'type': typeCD,
                "project_id": store.state.proj.project.id,
                "data_object_tags": dataObjectTags,
                "relative_position": position,
                'parameters': {
                    'page_id': pageID,
                    'source_data_node': sourceNodeID,
                    'secondary_data_nodes': []
                },
                "display_settings": {},
                "temporary_settings": {}
            };
            commit("proj/UPDATE_PROJECT_OBJECT", {ObjectID: nodeID, Object: emptyNode}, { root: true });
            dispatch("setActivePO", {selectedProcess:null, selectedPage:pageID, selectedNode:nodeID});
        },
        newPage(
            {commit, dispatch, rootGetters},
            {typeCD, name, pageID, processID, position, dataObjectTags}
        ) {
            let emptyPage = {
                'id': pageID,
                'name': name,
                'group': 2,
                'type': typeCD,
                "project_id": store.state.proj.project.id,
                "data_object_tags": dataObjectTags,
                "relative_position": position,
                'parameters': {
                    'process_id': processID,
                    'source_data_node': null
                },
                "display_settings": {},
                "temporary_settings": {}
            };
            commit("proj/UPDATE_PROJECT_OBJECT", {ObjectID: pageID, Object: emptyPage}, { root: true });
        },
        newProcess(
            {commit, dispatch, rootGetters},
            {typeCD, name, processID, position, dataObjectTags}
        ) {
            let emptyProcess = {
                'id': processID,
                'name': name,
                'group': 1,
                'type': typeCD,
                "project_id": store.state.proj.project.id,
                "data_object_tags": dataObjectTags,
                "relative_position": position,
                'parameters': {},
                "display_settings": {},
                "temporary_settings": {}
            };
            commit("proj/UPDATE_PROJECT_OBJECT", {ObjectID: processID, Object: emptyProcess}, { root: true });
        },
        copyDataObject(
            {commit, dispatch, rootGetters},
            {dataObjectID}
        ) {
            let dataObject = R.clone(rootGetters['proj/dataObjects'][dataObjectID]);
            let newDataObjectID = genDataObjectID();
            dataObject['id'] = newDataObjectID;
            commit("proj/UPDATE_DATA_OBJECT", {ObjectID: newDataObjectID, Object: dataObject}, { root: true });
            return newDataObjectID;
        },
        copyProjectObject(
            {commit, dispatch, rootGetters},
            {projectObjectID}
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
        deleteProjectObject(
            {commit, dispatch, rootGetters},
            {projectObjectID}
        ) {

            let dictTree = rootGetters['proj/ProjectTree'];
            let tree = new TreeModel();
            let ProjectTree = tree.parse(dictTree);
            let selectedPO = ProjectTree.first(function (obj) {
                return obj.model.id.toString() === projectObjectID.toString();
            });

            let projectObject = R.clone(rootGetters['proj/projectObjects'][projectObjectID]);
            for (const [tag, dataObjectID] of Object.entries(projectObject['data_object_tags'])) {
                commit("proj/DELETE_DATA_OBJECT", {ObjectID: dataObjectID.toString()}, { root: true });
            }
            commit("proj/DELETE_PROJECT_OBJECT", {ObjectID: projectObjectID.toString()}, { root: true })
            dispatch("setActivePO", {selectedProcess:null, selectedPage:null, selectedNode:null});

            for (const child of selectedPO.children) {
                // deleteProjectObject({projectObjectID: child.model.id})
                dispatch("deleteProjectObject", {projectObjectID:child.model.id});
            }
        }
    },
};
