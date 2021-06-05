<template>
    <div>
        <router-view />
    </div>
</template>

<script>

import Sidebar from "@/components/layout/Sidebar/Sidebar";
import {mapActions, mapState} from "vuex";
import {createProjectFlowRequest} from "@/core/projectManager";


export default {
    name: 'App',
    data() {
        return {
            webSocketConnected: false,
            webSocketProjectID: 0,
        }
    },
    computed: {
        ...mapState('proj', ['project'])
    },
    methods: {
        wsConnect (projectID) {
            let url = "ws://127.0.0.1:8000/ws/dsw_engine/" + projectID + "/";
            this.$webSocketConnect({"url": url});
            this.webSocketConnected = true
        },
        wsDisconnect () {
            this.$webSocketDisconnect();
            this.webSocketConnected = false;
            this.webSocketProjectID = 0;
        }
    },
    watch:{
        project() {
            if (this.webSocketConnected) {
                if (this.webSocketProjectID!==this.project.id) {
                    this.wsDisconnect();
                }
            }
            if (!this.webSocketConnected && ['project registered', 'project loaded'].includes(this.project.status)) {
                this.wsConnect(this.project.id);
                this.webSocketProjectID=this.project.id;
            }
        }
    },
    created() {
    },
    destroyed() {
        if (this.webSocketConnected) {
            this.wsDisconnect();
        }
    }
};
</script>

<style src="./styles/theme.scss" lang="scss" />
