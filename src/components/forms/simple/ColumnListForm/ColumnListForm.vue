<template>
    <b-form-group
        class="column-list-form"
        :label="name"
        :label-sr-only="!showLabel"
        :label-cols="horizontal ? 3 : 0"
        :horizontal="horizontal"
    >
        <div class="chart-column-container-outer p-3 pb-3 mb-3">
            <div class="chart-column-container">
                <draggable
                        class="dragArea list-group"
                        v-model="columnList"
                        group="columns"
                        ghost-class="ghost"
                        animation="200"
                        @change="checkChangedColumn"
                >
                    <ColumnButton
                        v-for="(column, index) in columnList"
                        :key="'po-column-form-'+column.name+index"
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
    import {mapGetters, mapMutations, mapState} from "vuex";
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
                'dataObjects', 'projectObjects', 'activeNode'
            ]),
            parentParameters() {
                return this.dataObjects[this.objectID]['parameters']
            },
            activeNodeSettings() {
                return this.projectObjects[this.activeNode]
            },
            displaySettings() {
                return this.activeNodeSettings['display_settings']
            },
            inactiveChartSettings() {
                return (this.displaySettings['inactive_chart_settings'] = this.displaySettings['inactive_chart_settings'] || [])
            },
            columnList: {
                get() {
                    let list = getObjectByRoute(this.route, this.parentParameters)[this.parameterIndex];
                    return typeof list !== 'undefined' ? list : []
                },
                set(newValue) {
                    this.SET_DO_PARAMETER({
                        id: this.objectID,
                        route: this.route.concat(this.parameterIndex),
                        value: newValue
                    });
                    let displaySettings = R.clone(this.displaySettings);
                    let pivotColumns = typeof displaySettings['pivot_columns']!=='undefined' ? displaySettings['pivot_columns'] : {};
                    pivotColumns[this.parameterIndex] = newValue;
                    displaySettings['pivot_columns'] = pivotColumns;

                    this.UPDATE_DISPLAY_SETTINGS({
                        ObjectID: this.activeNode,
                        displaySettings: displaySettings
                    });
                }
            }
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER', 'UPDATE_DISPLAY_SETTINGS'
            ]),
            checkChangedColumn(event) {
                let columnList = this.columnList;
                if (event.hasOwnProperty('moved') || event.hasOwnProperty('added')) {
                    let action = event.hasOwnProperty('moved') ? 'moved' : 'added';
                    let columnIndex = event[action].newIndex;
                    let column = this.columnList[columnIndex];
                    // console.log('checkChangedColumn', event, columnIndex, column, 'end');
                    if (column.type==='float64' || column.type==='int64') {
                        if (typeof column['aggregate_function'] === 'undefined') {
                            columnList[columnIndex]['aggregate_function'] = 'sum';
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
