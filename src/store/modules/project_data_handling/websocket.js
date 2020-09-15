export default {

    namespaced : true,

    state : {
        notifications: {},
        requests: {}
    },

    getters : {
        getRequests: state => {
            return state.requests;
        }
    },

    mutations : {
        changeNotifications: (state, payload) => {
            state.notifications.push(payload)
        },
        addRequest: (state, payload) => {
            let src_request_id = payload['src_request_id'];
            let all_tasks = payload['all_tasks'];

            let request = {};
            request[src_request_id] = {
                "success_tasks_count": 0,
                "success_tasks": [],
                "failed_tasks_count": 0,
                "failed_tasks": [],
                "finished": false,
                "all_tasks_count": all_tasks
            };
            state.requests = {
                ...state.requests,
                ...request
            }
        },
        addSuccessRun: (state, payload) => {
            let src_request_id = payload['src_request_id'];
            let project_object_id = payload['project_object_id'];
            if (src_request_id) {
                let orig_request = JSON.parse(JSON.stringify(state.requests[src_request_id]));
                let request = {};
                request[src_request_id] = orig_request;
                request[src_request_id]['success_tasks'].push(project_object_id);
                request[src_request_id]['success_tasks_count']=request[src_request_id]['success_tasks_count']+1;
                request[src_request_id]['finished']=request[src_request_id]['all_tasks_count']<=request[src_request_id]['success_tasks_count']+request[src_request_id]['failed_tasks_count'];
                delete state.requests[src_request_id];
                state.requests = {
                    ...state.requests,
                    ...request
                }
            }
        },
        addFailedRun: (state, payload) => {
            let src_request_id = payload['src_request_id'];
            let project_object_id = payload['project_object_id'];
            if (src_request_id) {
                let orig_request = JSON.parse(JSON.stringify(state.requests[src_request_id]));
                let request = {};
                request[src_request_id] = orig_request;
                request[src_request_id]['failed_tasks'].push(project_object_id);
                request[src_request_id]['failed_tasks_count']=request[src_request_id]['failed_tasks_count']+1;
                request[src_request_id]['finished']=request[src_request_id]['all_tasks_count']<=request[src_request_id]['success_tasks_count']+request[src_request_id]['failed_tasks_count'];
                delete state.requests[src_request_id];
                state.requests = {
                    ...state.requests,
                    ...request
                }
            }
        }
    },

    actions : {
        prepareRequest: ({commit}, payload) => {
            commit('addRequest', payload)
        },
        processNotifications: ({commit}, payload) => {
            var timestamp = Number(new Date());
            var date = new Date(timestamp);
            console.log(date,timestamp,payload);
            let src_request_id = payload["result"]["src_request_id"];
            let project_object_id = payload["result"]["project_object_id"];
            let status = payload["result"]["status"];
            let action = payload["action"];
            if (status==='success') {
                commit('addSuccessRun', {
                    'src_request_id':src_request_id,
                    'project_object_id':project_object_id});
                commit("proj/UPDATE_PROJECT_OBJECT_STATUS", {ObjectId: project_object_id, status: status}, { root: true });
            }
            else if (status==='failed') {
                commit('addFailedRun', {
                    'src_request_id':src_request_id,
                    'project_object_id':project_object_id});
                commit("proj/UPDATE_PROJECT_OBJECT_STATUS", {ObjectId: project_object_id, status: status}, { root: true });
            }
            if (action === 'report_data') {
                let data = JSON.parse(payload["result"]["data"]);
                let output_filter = JSON.stringify(payload["result"]["output_filter"]);
                let output_sort = JSON.stringify(payload["result"]["output_sort"]);
                let tableIndexName = project_object_id + "-run" + output_filter + "-" + output_sort;
                console.log(tableIndexName);
                commit("proj/UPDATE_DATAFRAME", {ObjectId: project_object_id, tableIndexName: tableIndexName, data: data}, { root: true });
            }
        }
    },
}