<template>
    <div class="c-100 r-100">
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
                activeNodeSignature: '',
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
                    'dataFrames', 'projectData', 'dataFrameMapping', 'nodeExecutionStatus'
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
                let nodeExecutionStatusID = getResultObjectID([this.nodeID, 'run_visualization', this.nodeSignature]);
                let dataFrameID = getResultObjectID([this.nodeID, 'chart_data', this.nodeSignature]);
                let status = this.nodeExecutionStatus[nodeExecutionStatusID];
                let check1 = typeof this.dataFrames[dataFrameID]!== "undefined";

                if (status==='success' && check1) {
                    this.activeNodeSignature = this.nodeSignature;
                    this.updateData('ready')
                    return 'ready'
                }
                else if (status==='requested' || status==='success') {
                    this.activeNodeSignature = this.nodeSignature;
                    return 'loading'
                }
                return 'not_requested'
            },
            tableDataLive() {
                let dataFrameID = getResultObjectID([this.nodeID, 'chart_data', this.activeNodeSignature]);
                return typeof this.dataFrames[dataFrameID]!== "undefined" ? this.dataFrames[dataFrameID] : []
            }
        },
        watch: {
            status(newValue) {
                if(newValue==='ready') {
                    this.updateData('ready')
                }
            }
        },
        mounted() {
            if(this.status==='not_requested') {
                this.requestTable()
            }
        }
    }
</script>

<style src="./DataVisualization.scss" lang="scss">

</style>
