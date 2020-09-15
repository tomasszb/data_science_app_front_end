<template>
    <div class = 'data-table'>
<!--        <v-server-table :columns="tableColumns" :options="tableOptions"/>-->
<!--        {{[tableIndexName]}}-->
    <Widget
            title=""
            :class="{'data-table':true, 'loading': loading}"
            refresh settings customHeader fullscreen
            @load="requestTable()"
            :fetchingData="loading"
            :showLoader="false"
    >
        <Loader v-if="loading" :class="'widget-loader'" :size="40"></Loader>
        <table >
            <thead>
                <draggable v-model="columns" tag="tr">
                    <th v-for="(column, i) in columns">
                        <div class="table-text">
                            {{column.name}}
                            <i
                                    v-if="column.sort===false"
                                    class="fa fa-sort pl-2  mb-sm fa-sm"
                                    @click="toggleSort($event, i)"/>
                            <i
                                    v-if="column.sort===true & column.ascending===true"
                                    class="fa fa-sort-up pl-2  mb-sm fa-sm"
                                    @click="toggleSort($event, i)"/>
                            <i
                                    v-if="column.sort===true & column.ascending===false"
                                    class="fa fa-sort-down pl-2  mb-sm fa-sm"
                                    @click="toggleSort($event, i)"/>
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
                <b-button :class="{'icon':true, 'mx-4':true, 'disabled':pageIndex===1}" @click="pageIndex=pageIndex-1; requestTable()">
                    <i class="fa fa-chevron-left fa-lg"/>
                </b-button>
                <b-button :class="{'icon':true, 'disabled':lastRow===countRow}" @click="pageIndex=pageIndex+1; requestTable()">
                    <i class="fa fa-chevron-right fa-lg"/>
                </b-button>

            </div>

        </div>
    </Widget>
    </div>
</template>

<script>
    import axios from "axios";
    import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
    import draggable from "vuedraggable";
    import Vue from 'vue';
    import Loader from '../Loader/Loader';
    import { getEmptyDataObject, createFlowRequest } from '@/core/projectManager';

    function waitForCondition(dataFrames, tableIndexName) {
        return new Promise(resolve => {
            let start_time = Date.now();
            function checkFlag() {
                if (typeof dataFrames[tableIndexName]!== "undefined") {
                    resolve( {data: dataFrames[tableIndexName], count: 1000});
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
            elementID: { type: String, default: null },
            pageSizes: {type: Array, default: function () { return ['10', '25', '50', '100'] }}
        },
        data() {
            return {
                tableKey:this.elementID+'-table-no-data',
                pageSize: this.pageSizes[0],
                pageIndex: 1,
                countRow:10000,
                loading: false,
                columns: [],
                tableData: []
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_DATA_OBJECT', 'CREATE_DATA_OBJECT', 'UPDATE_PROJECT_OBJECT'
            ]),
            ...mapActions('proj', [
                'createDO'
            ]),
            changePageSize(value) {
                Vue.set(this, 'pageSize', value);
                Vue.set(this, 'pageIndex', 1);
                this.requestTable();
            },
            cleanSortOptions() {
                for(let i = 0; i < this.columns.length; i++) {
                    Vue.set(this.columns[i], 'sort' , false);
                    Vue.set(this.columns[i], 'ascending' , true);
                }
            },
            updateFilterObject() {
                let Element = Object.assign({}, this.projectObjects[this.elementID]);
                let outputFilterID = Element.parameters['output_filter_id'];
                let Filter = {};
                if (outputFilterID === null) {
                    Filter = getEmptyDataObject(200);
                    Element.parameters['output_filter_id'] = Filter.id;
                    this.UPDATE_PROJECT_OBJECT({ObjectID: Element.id, Object: Element});
                }
                else {
                    Filter = Object.assign({}, this.dataObjects[outputFilterID]);
                }
                Filter.parameters = {'kwargs': this.filterKwargs};
                this.UPDATE_DATA_OBJECT({ObjectID: Filter.id, Object: Filter});
            },
            updateSortObject() {
                let Element = Object.assign({}, this.projectObjects[this.elementID]);
                let outputSortID = this.projectObjects[this.elementID].parameters['output_sort_id'];
                let Sort = {};
                if (outputSortID === null) {
                    Sort = getEmptyDataObject(204);
                    Element.parameters['output_sort_id'] = Sort.id;
                    this.UPDATE_PROJECT_OBJECT({ObjectID: Element.id, Object: Element});
                }
                else {
                    Sort = Object.assign({}, this.dataObjects[outputSortID]);
                }
                Sort.parameters = {'kwargs': this.sortKwargs};
                this.UPDATE_DATA_OBJECT({ObjectID: Sort.id, Object: Sort});
            },
            toggleSort(event, columnIndex) {
                let oldSettings = Object.assign({}, this.columns[columnIndex]);
                if (!event.shiftKey) {
                    this.cleanSortOptions();
                }
                if (oldSettings.sort===true && oldSettings.ascending===true) {
                    Vue.set(this.columns[columnIndex], 'ascending' , false);
                    Vue.set(this.columns[columnIndex], 'sort' , true);
                }
                else if (oldSettings.sort===true && oldSettings.ascending===false) {
                    Vue.set(this.columns[columnIndex], 'ascending' , true);
                    Vue.set(this.columns[columnIndex], 'sort' , false);
                }
                else if (oldSettings.sort===false) {
                    Vue.set(this.columns[columnIndex], 'sort' , true);
                    Vue.set(this.columns[columnIndex], 'ascending' , true);
                }

                this.requestTable();
            },
            requestTable() {
                this.loading = true;
                this.updateFilterObject();
                this.updateSortObject();
                console.log('here1');
                const promise = waitForCondition(this.dataFrames, this.tableIndexName);

                if(typeof this.dataFrames[this.tableIndexName] === "undefined"){
                    let request = createFlowRequest({}, [this.activeElement]);
                    this.$newRequest(request['request']['src_request_id'], request['request']['elements'].length);
                    this.$webSocketSend(request);
                }

                promise.then(
                    function(result) {
                        console.log('here2', result);
                        this.tableData = result['data'];
                        let columns = [];
                        for (let columnName of Object.keys(this.tableData[0])) {
                            let result =  {'name': columnName, 'sort': false, 'ascending': true};
                            for (let condition of this.sortKwargs['conditions']) {
                                if (condition.column === result.name) {
                                    result.name = condition.column;
                                    result.sort = true;
                                    result.ascending = condition.ascending;
                                }
                            }
                            columns.push(result)
                        };
                        this.columns = columns;
                        this.loading = false;
                    }.bind(this), function() {
                        alert('error')
                    })
            },

            refreshTable() {
                this.tableKey=this.elementID+'-table-with-data'
            }
        },
        computed: {
            ...mapState('proj', [
                    'dataFrames', 'projectData'
                ]),
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            outputFilterID() {
                return this.projectObjects[this.activeElement].parameters['output_filter_id'];
            },
            outputSortID() {
                return this.projectObjects[this.activeElement].parameters['output_sort_id'];
            },
            tableColumns() {
                return typeof this.dataFrames[this.tableIndexName]!== "undefined" ? Object.keys(this.dataFrames[this.tableIndexName][0]) : ['col']
            },
            firstRow() {
                return (this.pageIndex-1)*this.pageSize + 1
            },
            lastRow() {
                return Math.min(this.pageIndex*this.pageSize, this.countRow)
            },
            filterKwargs() {
                return {'conditions': [{'column':null, 'type':'iloc', 'value':[this.firstRow, this.lastRow]}]};
            },
            sortKwargs() {
                let sortList = [];
                for(let i = 0; i < this.columns.length; i++) {
                    let column = this.columns[i];
                    if (column.sort) {
                        sortList.push({'column': column.name, 'ascending': column.ascending})
                    }
                }
                return {'conditions': sortList};
            },
            tableIndexName() {
                return this.elementID + "-run" + JSON.stringify(this.filterKwargs) + "-" + JSON.stringify(this.sortKwargs)
            }
        },
        created() {
            this.requestTable()
        }
    }
</script>

<style src="./DataTable.scss" lang="scss">

</style>