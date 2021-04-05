<template>
    <b-form class="mb-3">
        <b-form-group description="Filter Columns" class="d-inline-flex mr-5">
            <b-input-group>
                <b-form-input type="text" size="sm" v-model="columnFilter"></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-form-group description="Sort By" class="d-inline-flex mr-5">
            <b-dropdown
                    id="simple-select"
                    :text="sortColumn!=='' ? sortColumns[sortColumn].display : '-'"
                    variant="default"
                    size="sm"
                    class="mr-2">
                <b-dropdown-item-button
                        v-for="(column, index) in sortColumns"
                        :key="'sort-column-key-'+index"
                        href="#"
                        @click="changeValue('sortColumn', index)">
                    {{column.display}}
                </b-dropdown-item-button>
            </b-dropdown>
            <b-dropdown
                    id="simple-select"
                    :text="sortType!=='' ? sortTypes[sortType].display : '-'"
                    variant="default"
                    size="sm">
                <b-dropdown-item-button
                        v-for="(column, index) in sortTypes"
                        :key="'sort-type-key-'+index"
                        href="#"
                        @click="changeValue('sortType', index)">
                    {{column.display}}
                </b-dropdown-item-button>
            </b-dropdown>
        </b-form-group>
        <b-form-group description="Show Type" class="d-inline-flex mr-5">
            <b-dropdown
                    id="type-filter-dropdown"
                    :text="typeFilter!=='' ? typeFilters[typeFilter].display : '-'"
                    variant="default"
                    size="sm">
                <b-dropdown-item-button
                        v-for="(column, index) in typeFilters"
                        :key="'type-filter-key-'+index"
                        href="#"
                        @click="changeValue('typeFilter', index)">
                    {{column.display}}
                </b-dropdown-item-button>
            </b-dropdown>
        </b-form-group>
    </b-form>
</template>

<script>
    import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
    import Vue from 'vue';
    const R = require('ramda');

    export default {
        name: "DataColumnExplorer",
        components: {},
        props: {
            sortColumns: { type: Object, default: function() {return {}}},
            sortTypes: { type: Object, default: function() {return {}}},
            typeFilters: { type: Object, default: function() {return {}}},
            defaultColumnFilter: { type: String, default: '' },
            defaultSortColumn: { type: String, default: '' },
            defaultSortType: { type: String, default: '' },
            defaultTypeFilter: { type: String, default: '' }
        },
        data() {
            return {
                columnFilter: "",
                sortColumn: "",
                sortType: "",
                typeFilter: "",
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_DATA_OBJECT', 'CREATE_DATA_OBJECT', 'UPDATE_PROJECT_OBJECT', 'UPDATE_DISPLAY_SETTINGS'
            ]),
            ...mapActions('proj', [
                'createDO'
            ]),
            updateDisplaySettings() {
                let columnExplorerDisplaySettings = R.clone(this.columnExplorerDisplaySettings);
                columnExplorerDisplaySettings['column_filter'] = this.columnFilter;
                columnExplorerDisplaySettings['sort_column'] = this.sortColumn;
                columnExplorerDisplaySettings['sort_type'] = this.sortType;
                columnExplorerDisplaySettings['type_filter'] = this.typeFilter;

                let displaySettings = R.clone(this.displaySettings);
                displaySettings['column_explorer_settings'] = columnExplorerDisplaySettings;

                    this.UPDATE_DISPLAY_SETTINGS({
                        ObjectID: this.activeNodeSettings.id,
                        displaySettings: displaySettings
                    });
            },
            setDefaultTableSettings() {
                if (Object.keys(this.columnExplorerDisplaySettings).length !== 0) {
                    this.columnFilter = this.columnExplorerDisplaySettings['column_filter'];
                    this.sortColumn = this.columnExplorerDisplaySettings['sort_column'];
                    this.sortType = this.columnExplorerDisplaySettings['sort_type'];
                    this.typeFilter = this.columnExplorerDisplaySettings['type_filter'];
                } else {
                    this.columnFilter = this.defaultColumnFilter;
                    this.sortColumn = this.defaultSortColumn;
                    this.sortType = this.defaultSortType;
                    this.typeFilter = this.defaultTypeFilter;
                }
                this.updateDisplaySettings()
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
            columnExplorerDisplaySettings() {
                return (this.displaySettings['column_explorer_settings'] = this.displaySettings['column_explorer_settings'] || {})
            },
        },
        watch: {
            columnFilter() {
                this.updateDisplaySettings()
            },
            sortColumn() {
                this.updateDisplaySettings()
            },
            sortType() {
                this.updateDisplaySettings()
            },
            typeFilter() {
                this.updateDisplaySettings()
            }
        },
        created() {
            this.setDefaultTableSettings()
        }
    }
</script>