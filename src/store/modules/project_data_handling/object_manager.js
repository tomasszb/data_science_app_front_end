export default {
    namespaced: true,
    actions: {
        setActivePO({commit}, {selectedProcess, selectedPage, selectedNode, selectedElement}) {
            commit("proj/SET_ACTIVE_PROCESS", selectedProcess, { root: true });
            commit("proj/SET_ACTIVE_PAGE", selectedPage, { root: true });
            commit("proj/SET_ACTIVE_NODE", selectedNode, { root: true });
            commit("proj/SET_ACTIVE_ELEMENT", selectedElement, { root: true });
        }
    },
};
