<template>
    <div class="">
        Rows per page: &nbsp;
        <b-dropdown id="simple-select" :text="pageSize.toString()" variant="light" class="pr-5">
            <b-dropdown-item-button
                    v-for="(pageSize, i) in pageSizes"
                    :key="'table-page_option-'+i"
                    @click="changePageSize(pageSize)"
            >
                {{pageSize}}
            </b-dropdown-item-button>
        </b-dropdown>
        <div class="d-inline-flex">
            {{firstRow}} - {{lastRow}} of {{dataSize}}
        </div>
        <b-button :class="{'icon':true, 'mx-4':true, 'disabled':pageIndex===1 || dataSize==='--'}" @click="changePageIndex(-1)">
            <i class="fa fa-chevron-left fa-lg"/>
        </b-button>
        <b-button :class="{'icon':true, 'disabled':lastRow===dataSize || dataSize==='--'}" @click="changePageIndex(1)">
            <i class="fa fa-chevron-right fa-lg"/>
        </b-button>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import Vue from "vue";
    import {getResultObjectID, getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');

    export default {
        name: 'TablePageControl',
        components: {
            vSelect
        },
        props: {
            pageSizes: {type: Array, default: function() {return [10,25,50,100]}},
            route: {type: String, default: ''},
            nodeID: {type: String, default: ''},
            filterID: {type: String, default: null},
            nodeSignature: {type: Number, default: null},
        },
        data() {
            return {
                dataSize: '--'
            }
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects'
            ]),
            ...mapState('proj', [
                'dataFrames'
            ]),
            filterParameters() {
                return this.dataObjects[this.filterID]['parameters']
            },
            pageIndex: {
                get() {
                    return this.filterParameters.getPath('page_index')
                },
                set(newValue) {
                    let pageIndexRoute = this.route!== "" ? [this.route, 'page_index'].join('.') : 'page_index';
                    this.SET_DO_PARAMETER({id: this.filterID, route: pageIndexRoute, value: newValue});
                }
            },
            pageSize: {
                get() {
                    return this.filterParameters.getPath('page_size')
                },
                set(newValue) {
                    let pageSizeRoute = this.route!== "" ? [this.route, 'page_size'].join('.') : 'page_size';
                    this.SET_DO_PARAMETER({id: this.filterID, route: pageSizeRoute, value: newValue});
                }
            },
            firstRow() {
                return (this.pageIndex - 1) * this.pageSize + 1
            },
            lastRow() {
                return this.pageIndex * this.pageSize
            },
            dataSizeLive() {
                let dataFrameID = getResultObjectID([this.nodeID, 'output_table_quick_info']);
                let dataFrame = this.dataFrames[dataFrameID];
                return typeof dataFrame!== "undefined" ? dataFrame['size'] : '--'
            }
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER'
            ]),
            changePageSize(value) {
                Vue.set(this, 'pageSize', value);
                Vue.set(this, 'pageIndex', 1);
                this.$emit('request-table');
            },
            changePageIndex(value) {
                Vue.set(this, 'pageIndex', this.pageIndex+value);
                this.$emit('request-table');
            },
            updateDataSize() {
                if(this.dataSizeLive!==this.dataSize && this.dataSizeLive!=='--') {
                    this.dataSize = this.dataSizeLive
                }
            }
        },
        watch: {
            dataSizeLive(newValue, oldValue) {
                this.updateDataSize()
            }
        },
        mounted() {
            this.updateDataSize()
        }
    };
</script>

<style src="./TablePageControl.scss" lang="scss"></style>
