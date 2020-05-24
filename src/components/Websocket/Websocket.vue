<template>
    <div id="websocket">
        <h2>Vue.js WebSocket Tutorial</h2>
        <button v-on:click="sendMessage('hello')">Send Message</button>
    </div>
</template>

<script>
    export default {
        name: 'Websocket',
        data: function() {
            return {
                connection: null
            }
        },
        methods: {
            sendMessage: function(message) {
                let data = {'message': message};
                console.log("Hello");
                console.log(this.connection);
                this.connection.send(JSON.stringify(data));
            }
        },
        created: function() {
            console.log("Starting connection to WebSocket Server");
            this.connection = new WebSocket("ws://127.0.0.1:8000/ws/dsw_engine/chatroom/");

            this.connection.onmessage = function(event) {
                console.log(event);
            }

            this.connection.onopen = function(event) {
                console.log(event);
                console.log("Successfully connected to the echo websocket server...");
            }

        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>