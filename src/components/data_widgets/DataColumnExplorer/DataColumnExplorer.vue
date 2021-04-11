<template>
        <div class="flex-vertical">
            <div class="col-explorer flex-vertical" v-if="status === 'loading'">
                <Loader :class="'widget-loader'" :size="40"></Loader>
            </div>
            <div class="col-explorer flex-vertical" v-if="status === 'ready'">
                <h4><strong>table</strong> details</h4><br>
                <table-info :tableStats="columnStatsData['table']"></table-info><br><br>
                <h4 class="mt-4"><strong>column</strong> details</h4><br>
                <div
                    v-for="(column, index) in columnStatsData['columns']"
                    class="card panel mb-xs" :key="`accord-one-${index.toString()}`">
                    <div
                        class="card-header panel-header bg-light" role="button"
                        @click="toggleAccordion(index)"
                    >
                        <div class="mb-0">
                            <div class="accordion-toggle col-explorer-accordion-toggle" role="button">
                                <div class="justify-content-start d-flex">
                                    {{typeMapping[column["type"]]}} &nbsp;&nbsp;&nbsp;
                                    <div class="col-explorer-accordion-toggle-text mr-4">
                                        {{column['column_name']}}
                                    </div>
                                    <b-badge v-for="message in column['warnings']" class="mr-2" variant="danger" pill>{{message}}</b-badge>
                                </div>
                                <i :class="`fa fa-angle-down ${openedColumns.indexOf(index) >= 0 ? 'expanded' : ''}`" />
                            </div>
                        </div>
                    </div>
                    <b-collapse id="accordion-first" class="panel-body" :visible="openedColumns.indexOf(index) >= 0">
                        <div class="card-body">
                            <column-info
                                :columnStats="column"
                            />
                        </div>
                    </b-collapse>
                </div>
                <!--            <column-info-->
                <!--                v-for="column in columnStatsData['columns']"-->
                <!--                :key="'data-column-'+nodeID+'-col-'+column['column_name']"-->
                <!--                :columnStats="column"-->
                <!--            />-->
            </div>
            <div v-if="status === 'not_requested'" class="load-data-area flex-vertical-no-scroll align-items-center">
                <b-button type="button" size='lg' variant="gray" class="btn-rounded load-data-button" @click="requestColumnStats()">
                    Load Column Info
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
    import { getEmptyDataObject, createFlowRequest, getResultObjectID } from '@/core/projectManager';
    import TableInfo from "@/components/data_widgets/DataColumnExplorer/TableInfo/TableInfo";
    import ColumnInfo from "@/components/data_widgets/DataColumnExplorer/ColumnInfo/ColumnInfo";
    const R = require('ramda');


    export default {
        name: "DataTable",
        components: {
            draggable, Loader, TableInfo, ColumnInfo
        },
        props: {
            nodeID: {type: String }
        },
        data() {
            return {
                activeNodeSignature: null,
                openedColumns: [],
                typeMapping: {
                    "Numeric": "123",
                    "Categorical": "abc",
                    "Boolean": "bool",
                    "Undefined": "X",
                    "Date": "date"
                }
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
            requestColumnStats() {
                let request = createFlowRequest(this.nodeID, ['run_connector', 'get_data_stats']);
                this.UPDATE_NODE_EXECUTION_STATUS({
                    nodeID: this.nodeID,
                    executionTemplate: "get_data_stats",
                    nodeSignature: this.nodeSignature,
                    status: 'requested'});
                this.$webSocketSend(request);
            },
            toggleAccordion(index) {
                let arrayIndex = this.openedColumns.indexOf(index)
                if (arrayIndex>=0) {
                    this.openedColumns.splice(arrayIndex, 1)
                } else {
                    this.openedColumns.push(index)
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
                let nodeExecutionStatusID = getResultObjectID([this.nodeID, 'get_data_stats', this.nodeSignature]);
                let columnStatsID = getResultObjectID([this.nodeID, 'column_stats', this.nodeSignature]);

                let status = this.nodeExecutionStatus[nodeExecutionStatusID];
                let check1 = typeof this.dataFrames[columnStatsID]!== "undefined";

                if (status==='success' && check1) {
                    this.activeNodeSignature = this.nodeSignature;
                    return 'ready'
                }
                else if (status==='requested' || this.activeNodeSignature !== null) {
                    this.activeNodeSignature = this.nodeSignature;
                    return 'loading'
                }
                return 'not_requested'

            },
            columnStatsData() {
                let dataFrameID = getResultObjectID([this.nodeID, 'column_stats', this.activeNodeSignature]);
                return typeof this.dataFrames[dataFrameID]!== "undefined" ? this.dataFrames[dataFrameID] : []
            },
        },
        watch: {
            nodeSignature: function () {
                if (this.status !== 'not_requested') {
                    this.requestColumnStats();
                }
            }
        }
    }
</script>

<style src="./DataColumnExplorer.scss" lang="scss"></style>
