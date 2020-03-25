import axios from "axios";

export default {
    namespaced: true,
    state: {
        projectData: "www",
        errorMessage: "",
    },
    mutations: {
        API_CALL_FAILURE(state, payload) {
            //state.isFetching = false;
            state.errorMessage = payload;
        },
        LOAD_PROJECT_DATA(state, data) {
            state.projectData = data;
        },
    },
    actions: {
        getAPIRequest({commit, dispatch}, url) {
            //const token = localStorage.getItem("token");
            //let creds = {"token": token};
            axios.get(url).then(res => {
                let data = res.data['Response']
                commit("LOAD_PROJECT_DATA", data);
            }).catch(err => {
              dispatch("callError", err.response.data);
            })
        },
        loadProjectData({dispatch}) {
            dispatch("getAPIRequest", "/project/1/");
        },
        callError({commit}, payload) {
            commit("API_CALL_FAILURE", payload);
        },
    },
};
