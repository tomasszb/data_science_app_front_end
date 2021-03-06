<template>
    <div class="flex-vertical-no-scroll">
        <div v-if="status === 'not_requested'" class="flex-vertical-no-scroll align-items-center justify-content-center">
            <b-button
                squared
                type="button"
                size='sm'
                variant="gray"
                class="load-data-button mb-4"
                @click="requestTable(true)"
            >
                Load Data
            </b-button>
            <p>
                click to load data
            </p>
        </div>
        <div class="data-table" v-show="status !== 'not_requested'">
<!--            <Loader v-if="status==='loading'" :class="'widget-loader'" :size="40"></Loader>-->

            <table>

                <div v-if="status === 'failed'" class="load-data-area flex-vertical-no-scroll align-items-center">
                    <p class="text-danger">
                        failed loading the data, please check your connector
                    </p>

                </div>
                <thead v-show="['loading', 'ready'].includes(status)">
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
                <tbody v-show="['loading', 'ready'].includes(status)">
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
                <hr class="mt-5">
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
                activeNodeSignature: null,
                tableColumns: [],
                tableData: []
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
            requestTable(wipeOld=false) {
                if (wipeOld) {
                    this.tableData = [];
                    this.tableColumns = [];
                }
                let request = createDataFlowRequest(this.nodeID, ['run_connector', 'get_output_table']);
                this.UPDATE_NODE_EXECUTION_STATUS({
                    nodeID: this.nodeID,
                    executionTemplate: "get_output_table",
                    nodeSignature: this.nodeSignature,
                    status: 'requested'});
                this.$webSocketSend(request);
            },
            updateData(status) {
                if (status==='ready') {
                    if(this.tableColumnsLive!==this.tableColumns) {
                        this.tableColumns = this.tableColumnsLive
                    }
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
                let nodeExecutionStatusID = getResultObjectID([this.nodeID, 'get_output_table']);
                let outputTableID = getResultObjectID([this.nodeID, 'output_table']);
                let outputTableQuickInfoID = getResultObjectID([this.nodeID, 'output_table_quick_info']);

                let status = this.nodeExecutionStatus[nodeExecutionStatusID];
                let check1 = typeof this.dataFrames[outputTableID]!== "undefined";
                let check2 = typeof this.dataFrames[outputTableQuickInfoID]!== "undefined";


                if (status==='success' && check1 && check2) {
                    this.activeNodeSignature = this.nodeSignature;
                    this.updateData('ready')
                    return 'ready'
                }
                else if (status==='requested' || status==='success') {
                    this.activeNodeSignature = this.nodeSignature;
                    return 'loading'
                }
                else if (status==='failed') {
                    return 'failed'
                }
                return 'not_requested'

            },
            tableFilterID() {
                return this.nodeSettings.getPath('data_object_tags.output_table_filter', '').toString();
            },
            tableSortID() {
                return this.nodeSettings.getPath('data_object_tags.output_table_sort', '').toString();
            },
            tableDataLive() {
                let dataFrameID = getResultObjectID([this.nodeID, 'output_table']);
                // console.log('tableData', dataFrameID)
                return typeof this.dataFrames[dataFrameID]!== "undefined" ? this.dataFrames[dataFrameID] : []
            },
            tableColumnsLive() {
                let dataFrameID = getResultObjectID([this.nodeID, 'output_table_quick_info']);
                let dataFrame = this.dataFrames[dataFrameID];
                return typeof dataFrame!== "undefined" ? dataFrame['columns'] : []
            }
        },
        created() {
            // this.updateData()
        }
    }
</script>

<style src="./DataTable.scss" lang="scss">

</style>