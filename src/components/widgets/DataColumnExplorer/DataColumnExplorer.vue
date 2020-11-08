<template>
    <Widget
            title=""
            :class="{ 'data-column-explorer': true, 'loading': loading, 'flex-grow-1': true}"
            refresh settings customHeader fullscreen
            :fetchingData="loading"
            :showLoader="false"
    >
        <Loader v-if="loading" :class="'widget-loader'" :size="40"></Loader>
        <data-column-filter
                :sortColumns="sortColumns"
                :sortTypes="sortTypes"
                :typeFilters="typeFilters"
                defaultColumnFilter=""
                defaultSortColumn="index"
                defaultSortType="asc"
                defaultTypeFilter="all"
        />
        <div class="table-resposive">
            <table class="table table-striped">
                <colgroup>
                    <col class="c-15" />
                    <col class="c-20" />
                    <col class="c-10" />
                    <col class="c-10" />
                    <col class="c-10" />
                    <col class="c-35" />
                </colgroup>
                <thead>
                <tr>
                    <th>
                        <span class="abc-checkbox flex-horizontal-no-scroll">
                            <input
                                    type="checkbox"
                                    :id="'checkbox0'"
                                    :checked="true"
                                    v-model="checkAll"
                            />
                            <label :for="'checkbox0'" />
                            <div class="ml-4">Source Name</div>
                        </span>
                    </th>
                    <th class="hidden-sm-down">Display Name</th>
                    <th class="hidden-sm-down">Type</th>
                    <th class="hidden-sm-down">Size</th>
                    <th class="hidden-sm-down">Count</th>
                    <th class="hidden-sm-down">Detail</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row, i) in columns" :key="i">
                    <td>
                        <span class="abc-checkbox flex-horizontal-no-scroll">
                            <input
                                    type="checkbox"
                                    :id="'checkbox'+i"
                                    :checked="true"
                                    v-model="row.show"
                            />
                            <label :for="'checkbox'+i" />
                            <div class="font-weight-normal ml-4">{{row.name}}</div>
                        </span>

                    </td>
                    <td class="text-semi-muted">
                        <b-form-input
                                type="text"
                                :placeholder="row.name"
                                :class="{'font-weight-normal': typeof displayNames[row.name]!=='undefined' && displayNames[row.name]!==''}"
                                v-model="displayNames[row.name]"
                                class="display-name-input" size="sm"></b-form-input>
                    </td>
                    <td class="text-semi-muted">
                        <b-dropdown :text="columnDescriptionData[row.index].type" :variant="typeFilters[row.type].variant" class="mr-2" size="xs">
                            <b-dropdown-item-button
                                    v-for="(column, index) in typeFilters"
                                    :key="'type-picker-'+row.index+'-'+index"
                                    @click="changeObjectParameter(columnDescriptionData[row.index], 'type', index)">
                                {{column.display}}
                            </b-dropdown-item-button>
                        </b-dropdown>
                    </td>
                    <td class="text-semi-muted">
                        {{row.size}}
                    </td>
                    <td class="text-semi-muted">
                        {{row.count}}
                    </td>
                    <td>
                        <span class="mr-4 " v-for="detail in typeFilters[row.type].detail">
                            <small>
                                <span class="fw-semi-bold">{{detail}}:</span>
                                <span class="text-muted">&nbsp; {{row[detail]}}</span>
                            </small>
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-5 font-weight-bolder text-right text-semi-muted">
            <span class="ml-3">rows: {{dataDescriptionData['rows']}}</span>
            <span class="ml-3">columns: {{dataDescriptionData['columns']}}</span>
            <span class="ml-3">null%: {{dataDescriptionData['null']}}</span>
            <span class="ml-3">size: {{dataDescriptionData['size']}}</span>
        </div>
    </Widget>
</template>

<script>
    import axios from "axios";
    import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
    import draggable from "vuedraggable";
    import Vue from 'vue';
    import Loader from '../../ui/Loader/Loader';
    import { getEmptyDataObject, createFlowRequest } from '@/core/projectManager';
    import DataColumnFilter from "./DataColumnFilter/DataColumnFilter";
    const R = require('ramda');

    function waitForCondition(dataFrames, dataFrameID) {
        return new Promise(resolve => {
            let start_time = Date.now();
            function checkFlag() {
                if (typeof dataFrames[dataFrameID]!== "undefined") {
                    resolve( dataFrames[dataFrameID]);
                } else {
                        window.setTimeout(checkFlag, 200);
                    }
                }
                checkFlag()
            })
        }

    export default {
        name: "DataColumnExplorer",
        components: {
            draggable, Loader, DataColumnFilter
        },
        data() {
            return {
                sortColumns: {
                    'index': {
                        'display': "Data Source Order",
                        'sort_value': "index"
                    },
                    'name': {
                        'display': "Column Name",
                        'sort_value': "name"
                    },
                    'type': {
                        'display': "Data Type",
                        'sort_value': "type"
                    },
                    'size': {
                        'display': "Size",
                        'sort_value': "size_raw"
                    }
                },
                sortTypes: {
                    'asc': {
                        'display': "Ascending"
                    },
                    'desc': {
                        'display': "Descending"
                    }
                },
                typeFilters: {
                    'all': {
                        'display': 'all'
                    },
                    'int64': {
                        'display': 'int64',
                        'variant': 'info',
                        'detail': ['mean', 'min', 'max']
                    },
                    'float64': {
                        'display': 'float64',
                        'variant': 'success',
                        'detail': ['mean', 'min', 'max']
                    },
                    'object': {
                        'display': 'object',
                        'variant': 'warning',
                        'detail': ['unique', 'top', 'freq']
                    },
                },
                displayNames: {},
                checkAll: true,
                tableDescriptionDataFrameID: null,
                columnsDescriptionDataFrameID: null,
                columnsDescriptionLoading: false,
                dataDescriptionLoading: false,
                columnDescriptionData: [],
                dataDescriptionData: {}
            }
        },
        watch: {
            checkAll: function() {
                for (let column of this.columnDescriptionData) {
                    if (this.columns.includes(column)) {
                        column['show'] = this.checkAll;
                    }
                }
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_DATA_OBJECT', 'CREATE_DATA_OBJECT', 'UPDATE_PROJECT_OBJECT', 'UPDATE_DISPLAY_SETTINGS'
            ]),
            ...mapActions('proj', [
                'createDO'
            ]),
            requestDataStats() {
                this.columnsDescriptionLoading = true;
                this.dataDescriptionLoading = true;

                if(typeof this.dataFrames[this.columnsDescriptionDataFrameID] === "undefined") {
                    let request = createFlowRequest(
                        {},
                        [this.connectorElement],
                        [this.columnsDescriptionElement]
                    );
                    let src_request_id = request['request']['src_request_id'];
                    this.columnsDescriptionDataFrameID = src_request_id + '-id:' + this.columnsDescriptionElement.toString();
                    this.$newRequest(request['request']['src_request_id'], request['request']['elements'].length);
                    this.$webSocketSend(request);
                }

                if(typeof this.dataFrames[this.tableDescriptionDataFrameID] === "undefined") {
                    let request = createFlowRequest(
                        {},
                        [this.connectorElement],
                        [this.tableDescriptionElement]
                    );
                    let src_request_id = request['request']['src_request_id'];
                    this.tableDescriptionDataFrameID = src_request_id + '-id:' + this.tableDescriptionElement.toString();
                    this.$newRequest(request['request']['src_request_id'], request['request']['elements'].length);
                    this.$webSocketSend(request);
                }

                const promiseColumnsDescription = waitForCondition(this.dataFrames, this.columnsDescriptionDataFrameID);
                const promiseDataDescription = waitForCondition(this.dataFrames, this.tableDescriptionDataFrameID);

                promiseColumnsDescription.then(
                    function(data) {
                        this.columnDescriptionData = data;
                        this.columnsDescriptionLoading = false;
                    }.bind(this), function() {
                        alert('error')
                    });
                promiseDataDescription.then(
                    function(data) {
                        this.dataDescriptionData = data;
                        this.dataDescriptionLoading = false;
                    }.bind(this), function() {
                        alert('error')
                    })
            },
            changeValue(name, value) {
                Vue.set(this, name, value);
            },
            changeObjectParameter(obj ,name, value) {
                Vue.set(obj, name, value);
            },
        },
        computed: {
            ...mapState('proj', [
                    'dataFrames', 'projectData', 'dataFrameMapping'
                ]),
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement',
                'nodeElements'
            ]),
            activeNodeSettings() {
                return this.projectObjects[this.activeNode]
            },
            displaySettings() {
                return this.activeNodeSettings['display_settings']
            },
            connectorElement() {
                return this.nodeElements[this.activeNode]['connector']
            },
            sortColumn(){
                let sortColumn = this.columnExplorerDisplaySettings['sort_column'];
                return typeof sortColumn!=='undefined' ? this.sortColumns[sortColumn]['sort_value'] : null;
            },
            sortAscending() {
                let sortType = this.columnExplorerDisplaySettings['sort_type'];
                return sortType==='asc' ? 1 : -1;
            },
            columnFilter() {
                let columnFilter = this.columnExplorerDisplaySettings['column_filter'];
                return typeof columnFilter!=='undefined' ?  columnFilter : '';
            },
            typeFilter() {
                let typeFilter = this.columnExplorerDisplaySettings['type_filter'];
                return typeof typeFilter!=='undefined' ?  typeFilter : 'all';
            },
            columnExplorerDisplaySettings() {
                return (this.displaySettings['column_explorer_settings'] = this.displaySettings['column_explorer_settings'] || {})
            },
            columnsDescriptionElement() {
                return this.nodeElements[this.activeNode]['columns_description']
            },
            tableDescriptionElement() {
                return this.nodeElements[this.activeNode]['data_description']
            },
            loading() {
                return this.columnsDescriptionLoading || this.dataDescriptionLoading
            },
            columns() {
                let columns = this.columnDescriptionData;
                for (let i = 0; i < columns.length; i++) {
                    columns[i]['index'] = i
                }

                if (this.sortColumn!==null) {
                    columns = columns.sort(function(a, b){
                        if (a[this.sortColumn]< b[this.sortColumn] ) {
                            return -this.sortAscending;
                        }
                        if (b[this.sortColumn] < a[this.sortColumn] ) {
                            return this.sortAscending;
                        }
                        return 0;
                    }.bind(this));
                }
                let filteredColumns = [];
                for (let column of columns) {

                    let lowerName = column['name'].toLowerCase();
                    let lowerName2 = column['name'].toLowerCase();
                    let lowerFilter = this.columnFilter.toLowerCase();

                    let columnCheck = lowerName2.includes(lowerFilter) || lowerName.includes(lowerFilter) || this.columnFilter==="";
                    let typeCheck = column['type']===this.typeFilter || this.typeFilter==="all";
                    if(typeCheck && columnCheck) {
                        filteredColumns.push(column);
                    }
                }
                return filteredColumns

            }
        },
        created() {
            this.requestDataStats();
        }
    }
</script>

<style src="./DataColumnExplorer.scss" lang="scss">

</style>