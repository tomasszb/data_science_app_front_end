<template>
    <div class = 'data-table'>
        {{tableIndexName}}
<!--        <v-server-table :columns="tableColumns" :options="tableOptions"/>-->
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
    import {mapGetters, mapMutations, mapState} from "vuex";
    import draggable from "vuedraggable";
    import Vue from 'vue';
    import Loader from '../Loader/Loader';

    function waitForCondition(dataFrames, output_filter) {
        return new Promise(resolve => {
            let start_time = Date.now();
            function checkFlag() {
                if (typeof dataFrames[output_filter]!== "undefined") {
                    resolve( {data: dataFrames[output_filter], count: 1000});
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
                countRow:102,
                loading: false,
                columns: [
                    {'name': 'Column 1', 'width': '10ch', 'sort': true, 'ascending': true},
                    {'name': 'Column 2', 'width': '10ch', 'sort': true, 'ascending': false},
                    {'name': 'Column 3', 'width': '10ch', 'sort': false, 'ascending': true},
                    {'name': 'Column 4', 'width': '10ch', 'sort': false, 'ascending': true},
                    {'name': 'Column 5', 'width': '10ch', 'sort': false, 'ascending': true},
                    {'name': 'Column 6', 'width': '10ch', 'sort': false, 'ascending': true},
                    {'name': 'Column 7', 'width': '10ch', 'sort': false, 'ascending': true},
                    {'name': 'Column 8', 'width': '10ch', 'sort': false, 'ascending': true},
                    {'name': 'Column 9', 'width': '10ch', 'sort': false, 'ascending': true},
                    {'name': 'Column 10', 'width': '10ch', 'sort': false, 'ascending': true},
                    {'name': 'Column 11', 'width': '10ch', 'sort': false, 'ascending': true},
                    {'name': 'Column 12', 'width': '10ch', 'sort': false, 'ascending': true},
                ],
                tableData: [
                    {'Column 1': 234123214, 'Column 2': 232332, 'Column 3': 132413421, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 'dweiudhqweoidhqewiuodqhwdohqwiodhwqiewhewi', 'Column 2': 432, 'Column 3': 31423124, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 142332, 'Column 2': 232, 'Column 3': 1432143234, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 3421, 'Column 2': 323, 'Column 3': 3421342342, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 32143423, 'Column 2': 423, 'Column 3': 134232, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 234123214, 'Column 2': 232332, 'Column 3': 132413421, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 'dweiudhqweoidhqewiuodqhwdohqwiodhwqiewhewi', 'Column 2': 432, 'Column 3': 31423124, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 142332, 'Column 2': 232, 'Column 3': 1432143234, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 3421, 'Column 2': 323, 'Column 3': 3421342342, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 32143423, 'Column 2': 423, 'Column 3': 134232, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 234123214, 'Column 2': 232332, 'Column 3': 132413421, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 'dweiudhqweoidhqewiuodqhwdohqwiodhwqiewhewi', 'Column 2': 432, 'Column 3': 31423124, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 142332, 'Column 2': 232, 'Column 3': 1432143234, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 3421, 'Column 2': 323, 'Column 3': 3421342342, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 32143423, 'Column 2': 423, 'Column 3': 134232, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 234123214, 'Column 2': 232332, 'Column 3': 132413421, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 'dweiudhqweoidhqewiuodqhwdohqwiodhwqiewhewi', 'Column 2': 432, 'Column 3': 31423124, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 142332, 'Column 2': 232, 'Column 3': 1432143234, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 3421, 'Column 2': 323, 'Column 3': 3421342342, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 32143423, 'Column 2': 423, 'Column 3': 134232, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 234123214, 'Column 2': 232332, 'Column 3': 132413421, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 'dweiudhqweoidhqewiuodqhwdohqwiodhwqiewhewi', 'Column 2': 432, 'Column 3': 31423124, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 142332, 'Column 2': 232, 'Column 3': 1432143234, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 3421, 'Column 2': 323, 'Column 3': 3421342342, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 32143423, 'Column 2': 423, 'Column 3': 134232, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 234123214, 'Column 2': 232332, 'Column 3': 132413421, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 'dweiudhqweoidhqewiuodqhwdohqwiodhwqiewhewi', 'Column 2': 432, 'Column 3': 31423124, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 142332, 'Column 2': 232, 'Column 3': 1432143234, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 3421, 'Column 2': 323, 'Column 3': 3421342342, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 32143423, 'Column 2': 423, 'Column 3': 134232, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 234123214, 'Column 2': 232332, 'Column 3': 132413421, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 'dweiudhqweoidhqewiuodqhwdohqwiodhwqiewhewi', 'Column 2': 432, 'Column 3': 31423124, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 142332, 'Column 2': 232, 'Column 3': 1432143234, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 3421, 'Column 2': 323, 'Column 3': 3421342342, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 32143423, 'Column 2': 423, 'Column 3': 134232, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 234123214, 'Column 2': 232332, 'Column 3': 132413421, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 'dweiudhqweoidhqewiuodqhwdohqwiodhwqiewhewi', 'Column 2': 432, 'Column 3': 31423124, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 142332, 'Column 2': 232, 'Column 3': 1432143234, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 3421, 'Column 2': 323, 'Column 3': 3421342342, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 32143423, 'Column 2': 423, 'Column 3': 134232, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 234123214, 'Column 2': 232332, 'Column 3': 132413421, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 'dweiudhqweoidhqewiuodqhwdohqwiodhwqiewhewi', 'Column 2': 432, 'Column 3': 31423124, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 142332, 'Column 2': 232, 'Column 3': 1432143234, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 3421, 'Column 2': 323, 'Column 3': 3421342342, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421},
                    {'Column 1': 32143423, 'Column 2': 423, 'Column 3': 134232, 'Column 4': 234123214, 'Column 5': 1324334324, 'Column 6': 132413421, 'Column 7': 234123214, 'Column 8': 1324334324, 'Column 9': 132413421, 'Column 10': 234123214, 'Column 11': 1324334324, 'Column 12': 132413421}

                ]
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_DATA_OBJECT'
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
            updateFilter(start, end) {
                let dataLen = null;
                let filterObject = Object.assign({}, this.dataObjects[this.outputFilterID]);
                filterObject['parameters']['kwargs'] = {'conditions': [{'column':null, 'type':'iloc', 'value':[start, end]}]};
                this.UPDATE_DATA_OBJECT(this.outputFilterID, filterObject);
            },
            updateSort(sortList) {
                let dataLen = null;
                let sortObject = Object.assign({}, this.dataObjects[this.outputSortID]);
                sortObject['parameters']['kwargs'] = {'conditions': sortList};
                this.UPDATE_DATA_OBJECT(this.outputSortID, sortObject);
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
                setTimeout(function() {
                    this.loading = false;
                }.bind(this), 500);
            },

            refreshTable() {
                this.tableKey=this.elementID+'-table-with-data'
            }
        },
        computed: {
            ...mapState('proj', [
                    'dataFrames',
                ]),
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            // outputFilterID() {
            //     let FilterID = this.projectObjects[this.activeElement].parameters['output_filter_id'];
            //     if(FilterID===null) {
            //         FilterID = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
            //     }
            //     return FilterID
            // },
            // outputSortID() {
            //     let SortID = this.projectObjects[this.activeElement].parameters['output_sort_id'];
            //     if(SortID===null) {
            //         SortID = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
            //     }
            //     return SortID
            // },
            // outputFilterKwargs() {
            //     return this.dataObjects[this.outputFilterID]['parameters']['kwargs']
            // },
            // outputSortKwargs() {
            //     return this.dataObjects[this.outputSortID]['parameters']['kwargs']
            // },
            // tableIndexName() {
            //     return this.elementID + "-run" + JSON.stringify(this.outputFilterKwargs)
            // },
            // tableIndexNameNew() {
            //     return this.elementID + "-run" + JSON.stringify(this.outputFilterKwargs) + "-" + JSON.stringify(this.outputSortKwargs)
            // },
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
                        sortList.push({'name': column.name, 'asc': column.ascending})
                    }
                }
                return {'conditions': sortList};
            },
            tableIndexName() {
                return this.elementID + "-run" + JSON.stringify(this.filterKwargs) + "-" + JSON.stringify(this.sortKwargs)
            }
        }
    }
</script>

<style src="./DataTable.scss" lang="scss">

</style>