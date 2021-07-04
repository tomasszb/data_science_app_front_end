<template>
    <b-form-group
        class="column-list-form"
        :label="name"
        :label-sr-only="!showLabel"
        :label-cols="horizontal ? 3 : 0"
        :horizontal="horizontal"
    >
        <div class="chart-column-container-outer bg-white p-3 pb-3 mb-3">
            <div class="chart-column-container">
                <draggable
                        class="dragArea list-group"
                        v-model="columnList"
                        group="columns"
                        ghost-class="ghost"
                        animation="200"
                        :disabled="disabled"
                        @change="checkChangedColumn"
                >
                    <ColumnButton
                        v-for="(column, index) in columnList"
                        @remove="removeColumn(index)"
                        :parent="name"
                        :key="'po-column-form-'+name+'-'+column.name+'-'+index"
                        :name="column.name"
                        :type="column.type"
                        :agrFunction="column.aggregate_function"
                    />
                </draggable>
            </div>
        </div>

    </b-form-group>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import Vue from 'vue';
    import draggable from "vuedraggable";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    import ColumnButton from "@/components/widgets/PageColumnbar/ColumnButton/ColumnButton";
    const R = require('ramda');

    export default {
        name: 'ColumnListForm',
        components: {
            vSelect, draggable, ColumnButton
        },
        props: {
            objectID: {type: [Number, String], default: null},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false},
            showLabel: {type: Boolean, default: true},
            parameterIndex: {type: [Number, String]},
            settings: {type: Object, default: function() {return {}} },
            route: {type: Array, default: function() {return []}},
            defaultValue: {},
        },
        data() {
            return {
                // columnList:[]
            }
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects', 'projectObjects', 'activePage', 'activeNode'
            ]),
            parentParameters() {
                return this.dataObjects[this.objectID]['parameters']
            },
            activeNodeSettings() {
                return this.projectObjects[this.activeNode]
            },
            activePageSettings() {
                return this.projectObjects[this.activePage]
            },
            displaySettings() {
                return this.activeNodeSettings['display_settings']
            },
            temporarySettings() {
                return this.activeNodeSettings['temporary_settings']
            },
            inactiveChartSettings() {
                return (this.displaySettings['inactive_chart_settings'] = this.displaySettings['inactive_chart_settings'] || [])
            },
            disabled() {
                if(this.columnList.length>=this.settings.max_columns) {
                    return true
                }
                else {
                    return false
                }
            },
            columnList: {
                get() {
                    let temporaryFields = this.activeNodeSettings.getPath('temporary_settings.pivot_columns.'+this.activeNodeSettings['parameters']['source_data_node'], {})
                    let parentParameters =this.parentParameters
                    let list = parentParameters.getPath(this.route+'.'+this.parameterIndex, null);
                    let list2 = temporaryFields.getPath(this.parameterIndex, null)
                    console.log('columnList2', list, list2, this.route, temporaryFields)

                    if (list === null && list2 !==null) {
                        Vue.set(this, 'columnList', list2)
                        return list2
                    }
                    return list !== null ? list : []
                },
                set(newValue) {
                    this.setDataObjectParameter({
                        id: this.objectID,
                        route: this.route.concat(this.parameterIndex),
                        value: newValue
                    });
                    let temporarySettings = R.clone(this.temporarySettings);
                    let pivotColumns = typeof temporarySettings['pivot_columns']!=='undefined' ? temporarySettings['pivot_columns'] : {};
                    this.setDeep(pivotColumns, [this.activePageSettings['parameters']['source_data_node'],this.parameterIndex], newValue);
                    pivotColumns = pivotColumns.setPath(this.activePageSettings['parameters']['source_data_node']+'.'+this.parameterIndex, newValue)

                    temporarySettings['pivot_columns'] = pivotColumns;

                    this.UPDATE_TEMPORARY_SETTINGS({
                        ObjectID: this.activeNode,
                        temporarySettings: temporarySettings
                    });
                }
            }
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER', 'UPDATE_TEMPORARY_SETTINGS', 'UPDATE_DATA_OBJECT'
            ]),
            ...mapActions('proj/object_manager', [
                'setDataObjectParameter'
            ]),
            removeColumn(index) {
                let columnList = this.columnList;
                columnList.splice(index, 1);
                Vue.set(this, 'columnList', columnList);
            },
            checkChangedColumn(event) {
                let columnList = this.columnList;
                if (event.hasOwnProperty('moved') || event.hasOwnProperty('added')) {
                    let action = event.hasOwnProperty('moved') ? 'moved' : 'added';
                    let columnIndex = event[action].newIndex;
                    let column = this.columnList[columnIndex];
                    // console.log('checkChangedColumn', event, columnIndex, column, 'end');
                    if (column.type==='float64' || column.type==='int64') {
                        if (this.settings.aggregate) {
                            columnList[columnIndex]['aggregate_function'] = 'sum';
                            Vue.set(this, 'columnList', columnList);
                            // console.log('hello there', this.columnList);
                        }
                        else if (!this.settings.aggregate) {
                            columnList[columnIndex]['aggregate_function'] = null;
                            Vue.set(this, 'columnList', columnList);
                            // console.log('hello there', this.columnList);
                        }
                    }
                }
                // console.log(this.columnList)

            }
        },
    };
</script>

<style src="./ColumnListForm.scss" lang="scss"></style>
