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
            let node_id = payload['node_id'];
            if (src_request_id) {
                let orig_request = JSON.parse(JSON.stringify(state.requests[src_request_id]));
                let request = {};
                request[src_request_id] = orig_request;
                request[src_request_id]['success_tasks'].push(node_id);
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
            let action = payload["action"];
            console.log('processNotifications - project', payload);
            if (action.startsWith('project - ')) {
                commit(
                    "proj/UPDATE_PROJECT_EXECUTION_STATUS",
                    {
                        projectID: payload["result"]["project_id"],
                        command: payload["result"]["command"],
                        status: payload["result"]["status"]
                    },
                    { root: true }
                );
            }

            if (action.startsWith('data -')) {
                let lastCommandTask = payload["result"]["last_command_task"];
                let status = payload["result"]["status"];

                if (action === 'data - report_data') {
                    // console.log('processNotifications - data', payload["result"]["result_tag"], JSON.parse(payload["result"]["data"]));
                    commit(
                        "proj/UPDATE_DATAFRAME",
                        {
                            nodeID: payload["result"]["node_id"],
                            resultTag: payload["result"]["result_tag"],
                            data: JSON.parse(payload["result"]["data"]),
                            nodeSignature: payload["result"]["node_signature"]
                        },
                        { root: true });
                }
                else if(lastCommandTask && status!=='running') {
                    // console.log('processNotifications', payload);
                    commit(
                        "proj/UPDATE_NODE_EXECUTION_STATUS",
                        {
                            nodeID: payload["result"]["node_id"],
                            executionTemplate: payload["result"]["execution_template"],
                            nodeSignature: payload["result"]["node_signature"],
                            status: payload["result"]["status"]
                        },
                        { root: true }
                    );
                }
            }
        }
    },
}
