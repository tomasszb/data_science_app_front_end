let webSocketService = {};

webSocketService.install = function (Vue, store) {
    let ws = "";

    Vue.prototype.$webSocketConnect = (options) => {
        ws = new WebSocket(options.url);
        console.log("connected");
        let reconnectInterval = options.reconnectInterval || 1000;

        ws.onopen = () => {
            // Restart reconnect interval
            reconnectInterval = options.reconnectInterval || 1000
        };

        ws.onmessage = (event) => {
            // New message from the backend - use JSON.parse(event.data)
            handleNotification(event)
        };

        ws.onclose = (event) => {
            if (event) {
                // Event.code 1000 is our normal close event
                if (event.code !== 1000) {
                    let maxReconnectInterval = options.maxReconnectInterval || 3000;
                    setTimeout(() => {
                        if (reconnectInterval < maxReconnectInterval) {
                            // Reconnect interval can't be > x seconds
                            reconnectInterval += 1000
                        }
                        Vue.prototype.$webSocketConnect(options)
                    }, reconnectInterval)
                }
            }
        };

        ws.onerror = (error) => {
            console.log(error);
            ws.close()
        }
    };

    Vue.prototype.$webSocketDisconnect = () => {
        // Our custom disconnect event
        console.log("disconnected");
        ws.close()
    };

    Vue.prototype.$webSocketSend = (data) => {
        // Send data to the backend - use JSON.stringify(data)
        ws.send(JSON.stringify(data))
    };

    Vue.prototype.$newRequest = (src_request_id, all_tasks) => {
        // Send data to the backend - use JSON.stringify(data)
        console.log("prepare Request");
        let payload = {
            "src_request_id": src_request_id,
            "all_tasks": all_tasks,
            "project_objects": []
        };
        store.dispatch('proj/websocket/prepareRequest', payload)
    };

    /*
      Here we write our custom functions to not make a mess in one function
    */
    function handleNotification (params) {
        let data = JSON.parse(params.data);
        store.dispatch('proj/websocket/processNotifications', data)
    }
};

export default webSocketService
