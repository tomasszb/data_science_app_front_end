import axios from "axios";
import router from "../../../Routes";
import TreeModel from 'tree-model'
import {get_active_object} from "../../../core/projectManager";

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
        }
    },
};
