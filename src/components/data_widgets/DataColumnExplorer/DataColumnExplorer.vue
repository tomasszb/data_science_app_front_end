<template>
        <div class="flex-vertical">
            <div class="col-explorer flex-vertical" v-if="status === 'ready'">
                <h4><strong>table</strong> details</h4><br>
                <table-info :tableStats="columnStatsData['table']"></table-info><br><br>
                <h4 class="mt-4"><strong>column</strong> details</h4><br>
                <div ref="column-list-container" id="column-list-container">
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
                                        <b-badge
                                            v-for="(message, mi ) in column['warnings']"
                                            :key="'data-column-explorer-warning-' + index + mi"
                                            class="mr-2"
                                            variant="danger"
                                            pill
                                        >
                                            {{message}}
                                        </b-badge>
                                    </div>
                                    <i :class="`fa fa-angle-down ${openedColumns.indexOf(index) >= 0 ? 'expanded' : ''}`" />
                                </div>
                            </div>
                        </div>
                        <b-collapse id="accordion-first" class="panel-body" v-if="columnsReady" :visible="openedColumns.indexOf(index) >= 0">
                            <div class="card-body">
                                <column-info
                                    :columnsReady="columnsReady"
                                    :columnStats="column"
                                />
                            </div>
                        </b-collapse>
                    </div>
                </div>

                <!--            <column-info-->
                <!--                v-for="column in columnStatsData['columns']"-->
                <!--                :key="'data-column-'+nodeID+'-col-'+column['column_name']"-->
                <!--                :columnStats="column"-->
                <!--            />-->
            </div>
            <div v-if="status === 'not_requested'" class="load-data-area align-items-center">
                <b-button
                    squared
                    type="button"
                    size='sm'
                    variant="gray"
                    class="load-data-button mb-4"
                    @click="requestColumnStats()"
                >
                    Load Column Info
                </b-button>
                <p>
                    click to load data details
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
    import { getEmptyDataObject, createDataFlowRequest, getResultObjectID } from '@/core/projectManager';
    import TableInfo from "@/components/data_widgets/DataColumnExplorer/TableInfo/TableInfo";
    import ColumnInfo from "@/components/data_widgets/DataColumnExplorer/ColumnInfo/ColumnInfo";
    const R = require('ramda');


    export default {
        name: "DataColumnExplorer",
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
                columnsReady: false,
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
                let request = createDataFlowRequest(this.nodeID, ['run_connector', 'get_data_stats']);
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
            },
            updateColumnsReady() {
                setTimeout(function(){
                    if (this.status === 'ready') {
                        // console.log('updateColumnsReady', status)
                        this.columnsReady=true;
                    }
                }.bind(this), 500);
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
                else if (status==='requested') {
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
        updated() {
            this.updateColumnsReady()
        },
        mounted() {
            this.$nextTick(function () {
                this.updateColumnsReady()
            })
        }
    }
</script>

<style src="./DataColumnExplorer.scss" lang="scss"></style>
