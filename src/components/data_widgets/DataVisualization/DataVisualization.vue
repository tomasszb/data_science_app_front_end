<template>
    <div class="flex-vertical">
        <b-button @click="requestTable">hello</b-button>

        <chart :chartData="tableData"></chart>
        {{activeNodeSignature}}
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
                let outputTableID = getResultObjectID([this.nodeID, 'chart_data', this.nodeSignature]);

                let status = this.nodeExecutionStatus[nodeExecutionStatusID];
                let check1 = typeof this.dataFrames[outputTableID]!== "undefined";

                if (status==='success' && check1) {
                    Vue.set(this, 'activeNodeSignature', this.nodeSignature);
                    return 'ready'
                }
                else if (status==='requested') {
                    Vue.set(this, 'activeNodeSignature', this.nodeSignature);
                    return 'loading'
                }
                return 'not_requested'

            }
        },
        watch: {
            status() {
                let dataFrameID = getResultObjectID([this.nodeID, 'chart_data', this.activeNodeSignature]);
                Vue.set(
                    this,
                    'tableData',
                    typeof this.dataFrames[dataFrameID]!== "undefined" ? this.dataFrames[dataFrameID] : {}
                )
            }
        }
    }
</script>

<style src="./DataVisualization.scss" lang="scss">

</style>
