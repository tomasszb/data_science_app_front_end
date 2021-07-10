<template>
    <div class="c-100 r-100 data-visualization">
        {{<pre><code>{{JSON.stringify(tableData, null, 4)}}</code></pre>}}
<!--        <div class="c-100 r-10">-->
<!--            <b-button @click="requestTable">hello</b-button>-->
<!--        </div>-->
<!--        <div class="c-100 r-90">-->
            <chart :chartData="tableData"></chart>
<!--        </div>-->
    </div>

</template>

<script>
    import axios from "axios";
    import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
    import draggable from "vuedraggable";
    import Vue from 'vue';
    import Chart from "@/components/data_widgets/DataVisualization/Chart/Chart";
    import Loader from '../../ui/Loader/Loader';
    import { getEmptyDataObject, createDataFlowRequest, getResultObjectID } from '@/core/projectManager';
    const R = require('ramda');


    export default {
        name: "DataVisualization",
        components: {
            draggable, Loader, Chart
        },
        props: {
            nodeID: {type: String }
        },
        data() {
            return {
                activeNodeSignature: null,
                tableData: {}
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_DATA_OBJECT', 'CREATE_DATA_OBJECT', 'UPDATE_PROJECT_OBJECT', 'UPDATE_DISPLAY_SETTINGS',
                'UPDATE_DATAFRAME_MAPPING', 'UPDATE_NODE_EXECUTION_STATUS'
            ]),
            ...mapActions('proj', [
                'createDO'
            ]),
            requestTable() {
                let request = createDataFlowRequest(this.nodeID, ['run_visualization']);
                this.UPDATE_NODE_EXECUTION_STATUS({
                    nodeID: this.nodeID,
                    executionTemplate: "run_visualization",
                    nodeSignature: this.nodeSignature,
                    status: 'requested'});
                this.$webSocketSend(request);
            },
            updateData(status) {
                if (status==='ready') {
                    if(this.tableDataLive!==this.tableData) {
                        this.tableData = this.tableDataLive
                    }
                }
            }
        },
        computed: {
            ...mapState('proj', [
                    'dataFrames', 'projectData', 'nodeExecutionStatus'
                ]),
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'nodeSignatures'
            ]),
            nodeSettings() {
                return this.projectObjects[this.nodeID]
            },
            nodeSignature() {
                return this.nodeSignatures[this.nodeID]
            },
            status() {
                let nodeExecutionStatusID = getResultObjectID([this.nodeID, 'run_visualization']);
                let dataFrameID = getResultObjectID([this.nodeID, 'chart_data']);
                let status = this.nodeExecutionStatus[nodeExecutionStatusID];
                let check1 = typeof this.dataFrames[dataFrameID]!== "undefined";
                let check2 = this.activeNodeSignature === this.nodeSignature
                if (status==='success' && check1 && check2) {
                    this.updateData('ready')
                    return 'ready'
                }
                else if ((status==='requested' || status==='success')&& check2) {
                    return 'loading'
                }
                else if (status==='failed' && check2) {
                    return 'failed'
                }
                return 'not_requested'
            },
            tableDataLive() {
                let dataFrameID = getResultObjectID([this.nodeID, 'chart_data']);
                return typeof this.dataFrames[dataFrameID]!== "undefined" ? this.dataFrames[dataFrameID] : []
            }
        },
        watch: {
            status(newValue) {
                if(newValue==='ready') {
                    this.updateData('ready')
                }
                if(newValue==='not_requested') {
                    this.activeNodeSignature = this.nodeSignature;
                    this.requestTable();

                }
            }
        },
        mounted() {
            if (this.activeNodeSignature===null) {
                this.activeNodeSignature = this.nodeSignature;
                this.requestTable();
            }
            else if(this.status==='not_requested') {
                this.activeNodeSignature = this.nodeSignature;
                this.requestTable();
            }
        }
    }
</script>

<style src="./DataVisualization.scss" lang="scss">

</style>
