<template>
    <Widget
            title=""
            :class="{'data-table':true, 'loading': loading, 'flex-grow-1': true}"
            refresh settings customHeader fullscreen
            @load="requestTable()"
            :fetchingData="loading"
            :showLoader="false"
    >
        <Loader v-if="loading" :class="'widget-loader'" :size="40"></Loader>
        <table>
            <thead>
                <draggable v-model="columns" tag="tr">
                    <th v-for="(column, i) in columns">
                        <div class="table-text">
                            {{column.name}}
                            <i
                                    v-if="column.sort===false"
                                    class="fa fa-sort pl-2  mb-sm fa-sm"
                                    @click="changeSort($event, i)"/>
                            <i
                                    v-if="column.sort===true & column.ascending===true"
                                    class="fa fa-sort-up pl-2  mb-sm fa-sm"
                                    @click="changeSort($event, i)"/>
                            <i
                                    v-if="column.sort===true & column.ascending===false"
                                    class="fa fa-sort-down pl-2  mb-sm fa-sm"
                                    @click="changeSort($event, i)"/>
                        </div>


                    </th>
                </draggable>
            </thead>
            <tbody>
                <tr v-for="(row, i) in tableData">
                    <td
                            v-for="column in columns"
                            :class="{even: i%2==0, odd: i%2==1}"
                    >
                        <div class="table-text">
                            {{row[column.name]}}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <div class="table-footer">
                Rows per page: &nbsp;&nbsp;
                <b-dropdown id="simple-select" :text="pageSize" variant="light" class="pr-5">
                    <b-dropdown-item-button
                            v-for="(pageSize, i) in pageSizes"
                            :key="'table-page_option-'+i"
                            @click="changePageSize(pageSize)"
                    >
                        {{pageSize}}
                    </b-dropdown-item-button>
                </b-dropdown>
                {{firstRow}} - {{lastRow}} of {{countRow}}
                <b-button :class="{'icon':true, 'mx-4':true, 'disabled':pageIndex===1}" @click="changePageIndex(-1)">
                    <i class="fa fa-chevron-left fa-lg"/>
                </b-button>
                <b-button :class="{'icon':true, 'disabled':lastRow===countRow}" @click="changePageIndex(1)">
                    <i class="fa fa-chevron-right fa-lg"/>
                </b-button>

            </div>

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
    const R = require('ramda');

    function waitForCondition(dataFrames, dataFrameID) {
        return new Promise(resolve => {
            let start_time = Date.now();
            function checkFlag() {
                if (typeof dataFrames[dataFrameID]!== "undefined") {
                    resolve( {data: dataFrames[dataFrameID], count: 1000});
                } else {
                        window.setTimeout(checkFlag, 200);
                    }
                }
                checkFlag()
            })
        }

    export default {
        name: "DataTable",
        components: {
            draggable, Loader
        },
        props: {
            pageSizes: {type: Array, default: function () { return ['10', '25', '50', '100'] }}
        },
        data() {
            return {
                tableKey:this.activeElement+'-table-no-data',
                pageSize: this.pageSizes[0],
                pageIndex: 1,
                countRow:10000,

                defaultPageSize: this.pageSizes[0],
                defaultPageIndex: 1,
                defaultCountRow: 10000,

                loading: false,
                columns: [],
                column_names: [],
                tableData: []
            }
        },
        watch: {
            activeNode(newValue) {
                this.setDefaultTableSettings();
                this.requestTable();

            },
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_DATA_OBJECT', 'CREATE_DATA_OBJECT', 'UPDATE_PROJECT_OBJECT', 'UPDATE_DISPLAY_SETTINGS', 'UPDATE_DATAFRAME_MAPPING'
            ]),
            ...mapActions('proj', [
                'createDO'
            ]),

            setDefaultTableSettings() {
                if (Object.keys(this.tableDisplaySettings).length !== 0) {
                    this.pageSize = this.tableDisplaySettings['page_size'];
                    this.pageIndex = this.tableDisplaySettings['page_index'];
                    this.countRow = this.tableDisplaySettings['count_row'];
                    this.columns = this.tableDisplaySettings['columns'];
                } else {
                    this.pageSize = this.defaultPageSize;
                    this.pageIndex = this.defaultPageIndex;
                    this.countRow = this.defaultCountRow;
                    this.columns = []
                }
            },

            changePageSize(value) {
                Vue.set(this, 'pageSize', value);
                Vue.set(this, 'pageIndex', 1);
                this.requestTable();
            },
            changePageIndex(value) {
                Vue.set(this, 'pageIndex', this.pageIndex+value);
                this.requestTable()
            },
            changeSort(event, columnIndex) {
                let oldSettings = Object.assign({}, this.columns[columnIndex]);
                if (!event.shiftKey) {this.cleanSortOptions()}

                Vue.set(
                    this.columns[columnIndex],
                    'ascending' ,
                    oldSettings.ascending===false || oldSettings.sort===false
                );

                Vue.set(
                    this.columns[columnIndex],
                    'sort' ,
                    oldSettings.ascending===true || oldSettings.sort===false
                );

                this.requestTable();
            },
            cleanSortOptions() {
                for(let i = 0; i < this.columns.length; i++) {
                    Vue.set(this.columns[i], 'sort' , false);
                    Vue.set(this.columns[i], 'ascending' , true);
                }
            },
            updateFilterObject() {
                let Filter = R.clone(this.dataObjects[this.tableFilterID]);
                Filter.parameters = this.filterParameters;
                this.UPDATE_DATA_OBJECT({ObjectID: Filter.id, Object: Filter});
            },
            updateSortObject() {
                let Sort = R.clone(this.dataObjects[this.tableSortID]);
                Sort.parameters = this.sortParameters;
                this.UPDATE_DATA_OBJECT({ObjectID: Sort.id, Object: Sort});
            },
            updateDisplaySettings() {
                let displaySettings = R.clone(this.displaySettings);
                displaySettings['table_settings'] = {
                    'page_size': this.pageSize,
                    'page_index': this.pageIndex,
                    'count_row': this.countRow,
                    'columns': this.columns
                };
                this.UPDATE_DISPLAY_SETTINGS({
                    ObjectID: this.projectObjects[this.activeNode].id,
                    displaySettings: displaySettings
                });
            },
            requestTable() {
                this.loading = true;
                this.updateFilterObject();
                this.updateSortObject();
                this.updateDisplaySettings();

                if(typeof this.dataFrames[this.dataFrameID] === "undefined") {
                    let request = createFlowRequest(
                        {},
                        [this.connectorElement],
                        [this.tableSortElement, this.tableFilterElement]
                    );
                    let src_request_id = request['request']['src_request_id'];
                    let project_object_id = this.tableFilterElement;
                    let dataFrameID = src_request_id + '-id:' + project_object_id.toString();
                    this.UPDATE_DATAFRAME_MAPPING({dataFrameID: dataFrameID, settings: this.tableSettings});
                    this.$newRequest(request['request']['src_request_id'], request['request']['elements'].length);
                    this.$webSocketSend(request);
                }

                const promise = waitForCondition(this.dataFrames, this.dataFrameID);

                promise.then(
                    function(result) {
                        this.tableData = result['data'];
                        let columns = [];
                        let column_names = [];
                        for (let columnName of Object.keys(this.tableData[0])) {
                            let result =  {'name': columnName, 'sort': false, 'ascending': true};
                            for (let condition of this.sortParameters['conditions']) {
                                if (condition.column === result.name) {
                                    result.name = condition.column;
                                    result.sort = true;
                                    result.ascending = condition.ascending;
                                }
                            }
                            columns.push(result);
                            column_names.push(columnName);
                        };
                        this.column_names = column_names
                        this.columns = columns;
                        this.loading = false;
                    }.bind(this), function() {
                        alert('error')
                    })
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
            tableDisplaySettings() {
                return (this.displaySettings['table_settings'] = this.displaySettings['table_settings'] || {})
            },
            tableFilterID() {
                return this.projectObjects[this.activeNode]['table_filter'].parameters['action_id'];
            },
            tableSortID() {
                return this.projectObjects[this.nodeElements[this.activeNode]['table_sort']].parameters['action_id'];
            },
            tableColumns() {
                return typeof this.dataFrames[this.dataFrameID]!== "undefined" ? Object.keys(this.dataFrames[this.dataFrameID][0]) : ['col']
            },
            firstRow() {
                return (this.pageIndex-1)*this.pageSize + 1
            },
            lastRow() {
                return Math.min(this.pageIndex*this.pageSize, this.countRow)
            },
            filterParameters() {
                return {'lower': this.firstRow, 'upper': this.lastRow};
            },
            sortParameters() {
                let sortList = [];
                for(let i = 0; i < this.columns.length; i++) {
                    let column = this.columns[i];
                    if (column.sort) {
                        sortList.push({'column': column.name, 'ascending': column.ascending})
                    }
                }
                return {'conditions': sortList};
            },
            columnParameters() {
                let result = '';
                for (let p of this.sortParameters['conditions']) {
                    let cIndex = this.column_names.indexOf(p['column']).toString();
                    let cOrder = p['ascending'] ? 'a' : 'd';
                    result = result.concat('-c', cIndex, cOrder)
                }
                return result
            },
            tableSettings() {
                return this.activeNode + '-' +this.pageSize.toString() + '-' + this.pageIndex.toString() + '-' + this.countRow.toString() + '-' + this.columnParameters
            },
            dataFrameID() {
                return this.dataFrameMapping[this.tableSettings]
            }

        },
        created() {
            this.setDefaultTableSettings();
            this.requestTable();
        }
    }
</script>

<style src="./DataTable.scss" lang="scss">

</style>