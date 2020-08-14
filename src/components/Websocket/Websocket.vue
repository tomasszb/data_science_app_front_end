<template>
    <div id="websocket">
        <span @click="wsConnect" style="color: green; cursor: pointer">Connect websockets</span> |
        <span @click="wsDisconnect" style="color: red; cursor: pointer">Disconnect websockets</span> |
<!--        <span @click="newRequest" style="color: blue; cursor: pointer">New Request</span>-->
        <h3>Received events:</h3>
        {{requests2}}
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import { initProjectBranches } from '@/core/projectManager';

    export default {
        name: 'Websocket',
        data () {
            return {
                msg: 'Vue.js websockets basic example'
            }
        },
        computed: {
            ...mapState('proj', ['projectData']),
            ...mapState('websocket', ['requests']),

            requests2 () {
                //return this.$store.state.websocket.requests;
                return this.$store.getters['websocket/getRequests']
            }
        },
        methods: {
            wsConnect () {
                let url = "ws://127.0.0.1:8000/ws/dsw_engine/" + this.projectData.project_id + "_" +this.projectData.owner_id+"/";
                this.$webSocketConnect({"url": url})
            },
            wsDisconnect () {
                this.$webSocketDisconnect()
            },
            wsSend () {
                let d = new Date() + ' hello'
                this.$webSocketSend(d)
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