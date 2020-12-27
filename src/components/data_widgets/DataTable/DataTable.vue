<template>
    <div class="data-table">
        <Loader v-if="loading" :class="'widget-loader'" :size="40"></Loader>
        <table>
            <thead>
                <tr>
                    <th v-for="(columnName, i) in tableColumns">
                        <div class="table-text">
                            <column-control
                                    :key="'column-control-' + i"
                                    :columnName="columnName"
                                    :sortID="tableSortID"
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
                />
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
    import { getEmptyDataObject, createFlowRequest, getResultObjectID } from '@/core/projectManager';
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
                let request = createFlowRequest(this.nodeID, ['run_connector', 'get_output_table']);
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
            loading() {
                let nodeExecutionStatusID = getResultObjectID([this.nodeID, 'get_output_table', this.nodeSignature]);
                let outputTableID = getResultObjectID([this.nodeID, 'output_table', this.nodeSignature]);
                let outputTableQuickInfoID = getResultObjectID([this.nodeID, 'output_table_quick_info', this.nodeSignature]);

                let status = this.nodeExecutionStatus[nodeExecutionStatusID];
                let check1 = typeof this.dataFrames[outputTableID]!== "undefined";
                let check2 = typeof this.dataFrames[outputTableQuickInfoID]!== "undefined";

                if (status==='success' && check1 && check2) {
                    this.activeNodeSignature = this.nodeSignature;
                    return false
                }
                return true

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
        },
        watch: {
            nodeSignature: function () {
                this.requestTable();
            }
        }
    }
</script>

<style src="./DataTable.scss" lang="scss">

</style>