<template>
    <div class="flex-vertical-no-scroll">
        <div class="data-table" v-if="['loading', 'ready'].includes(status)">
            <Loader v-if="status==='loading'" :class="'widget-loader'" :size="40"></Loader>
            <table>
                <thead>
                    <tr>
                        <th v-for="(columnName, i) in tableColumns">
                            <div class="table-text">
                                <column-control
                                        :key="'column-control-' + i"
                                        :columnName="columnName"
                                        :sortID="tableSortID"
                                        @request-table="requestTable"
                                />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, i) in tableData">
                        <td
                                v-for="columnName in tableColumns"
                                :class="{even: i%2==0, odd: i%2==1}"
                        >
                            <div class="table-text">
                                {{row[columnName]}}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <div class="table-footer">
                    <table-page-control
                            :nodeID="nodeID"
                            :nodeSignature="activeNodeSignature"
                            :filterID="tableFilterID"
                            @request-table="requestTable"
                    />
                </div>
            </div>
        </div>
        <div v-if="status === 'not_requested'" class="load-data-area flex-vertical-no-scroll align-items-center">


            <b-button type="button" size='lg' variant="gray" class="btn-rounded load-data-button" @click="requestTable()">
                Load Data
            </b-button>
            <br>
            <p>
                 the requested data is not loaded yet
            </p>


        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
    import draggable from "vuedraggable";
    import Vue from 'vue';
    import Loader from '../../ui/Loader/Loader';
    import ColumnControl from "./ColumnControl/ColumnControl";
    import TablePageControl from "./TablePageControl/TablePageControl";
    import { getEmptyDataObject, createDataFlowRequest, getResultObjectID } from '@/core/projectManager';
    const R = require('ramda');


    export default {
        name: "DataTable",
        components: {
            draggable, Loader, ColumnControl, TablePageControl
        },
        props: {
            nodeID: {type: String }
        },
        data() {
            return {
                activeNodeSignature: null
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
                let request = createDataFlowRequest(this.nodeID, ['run_connector', 'get_output_table']);
                this.UPDATE_NODE_EXECUTION_STATUS({
                    nodeID: this.nodeID,
                    executionTemplate: "get_output_table",
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
                let nodeExecutionStatusID = getResultObjectID([this.nodeID, 'get_output_table', this.nodeSignature]);
                let outputTableID = getResultObjectID([this.nodeID, 'output_table', this.nodeSignature]);
                let outputTableQuickInfoID = getResultObjectID([this.nodeID, 'output_table_quick_info', this.nodeSignature]);

                let status = this.nodeExecutionStatus[nodeExecutionStatusID];
                let check1 = typeof this.dataFrames[outputTableID]!== "undefined";
                let check2 = typeof this.dataFrames[outputTableQuickInfoID]!== "undefined";

                // console.log(status, check1, check2, this.nodeSignature, outputTableID, outputTableQuickInfoID, this.dataFrames)

                if (status==='success' && check1 && check2) {
                    this.activeNodeSignature = this.nodeSignature;
                    return 'ready'
                }
                else if (status==='requested') {
                    this.activeNodeSignature = this.nodeSignature;
                    return 'loading'
                }
                return 'not_requested'

            },
            tableFilterID() {
                return this.nodeSettings.getPath('data_object_tags.output_table_filter', '').toString();
            },
            tableSortID() {
                return this.nodeSettings.getPath('data_object_tags.output_table_sort', '').toString();
            },
            tableData() {
                let dataFrameID = getResultObjectID([this.nodeID, 'output_table', this.activeNodeSignature]);
                return typeof this.dataFrames[dataFrameID]!== "undefined" ? this.dataFrames[dataFrameID] : []
            },
            tableColumns() {
                let dataFrameID = getResultObjectID([this.nodeID, 'output_table_quick_info', this.activeNodeSignature]);
                let dataFrame = this.dataFrames[dataFrameID];
                return typeof dataFrame!== "undefined" ? dataFrame['columns'] : []
            }
        }
    }
</script>

<style src="./DataTable.scss" lang="scss">

</style>