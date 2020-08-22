import axios from "axios";
import router from "../../../Routes";
import TreeModel from 'tree-model'
import {get_active_object} from "../../../core/projectManager";

export default {
    namespaced: true,
    actions: {
        setActivePO({state, commit, rootState, rootGetters}, {selectedProcess, selectedPage, selectedNode, selectedElement}) {
            let currentActiveProcess = rootGetters['proj/activeProcess'];
            let currentActivePage = rootGetters['proj/activePage'];
            let currentActiveNode = rootGetters['proj/activeNode'];
            let currentActiveElement = rootGetters['proj/activeElement'];

            let processList = rootGetters['proj/processList'];
            let pageLists = rootGetters['proj/pageLists'];
            let nodeLists = rootGetters['proj/nodeLists'];
            let elementLists = rootGetters['proj/elementLists'];

            let activeProcess = get_active_object(selectedProcess, currentActiveProcess, processList);
            let activePage = get_active_object(selectedPage, currentActivePage, pageLists[activeProcess]);
            let activeNode = get_active_object(selectedNode, currentActiveNode, nodeLists[activePage]);
            let activeElement = get_active_object(selectedElement, currentActiveElement, elementLists[activeNode]);

            commit("proj/SET_SELECTED_PROCESS", activeProcess, { root: true });
            commit("proj/SET_SELECTED_PAGE", {activePage, activeProcess}, { root: true });
            commit("proj/SET_SELECTED_NODE", {activeNode, activePage}, { root: true });
            commit("proj/SET_SELECTED_ELEMENT", {activeElement, activeNode}, { root: true });

        },
        updatePO({commit}, {ProjectObjectID, ProjectObject}) {
            commit("proj/UPDATE_PROJECT_OBJECT", {ProjectObjectID, ProjectObject}, { root: true });
        },
        deletePO({commit, rootGetters}, {ProjectObjectID}) {
            let ProjectObject = rootGetters.projectObjects[ProjectObjectID];
            let dictTree = getters.projectTree;
            let tree = new TreeModel();
            let ProjectTree = tree.parse(dictTree);

            let selectedPO = ProjectTree.first(function (obj) {
                return obj.model.id === ProjectObjectID;
            });
            let childrenIDs = selectedPO.children();
            console.log(childrenIDs);

            commit("proj/DELETE_PROJECT_OBJECT", {ProjectObjectID}, { root: true });
        },
        updateDO({commit}, {DataObjectID, DataObject}) {
            commit("proj/UPDATE_PROJECT_OBJECT", {DataObjectID, DataObject}, { root: true });
        }
    },
};
