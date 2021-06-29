<template>
    <div class="page-column-bar flex-vertical-no-scroll pb-4">
        <source-node-selector></source-node-selector>
        <div class="text-gray-light small font-weight-bold mt-2 mb-2">
            Columns
        </div>
        <div class="flex-vertical">
            <draggable
                v-model="columnList"
                :group="{ name: 'columns', pull: 'clone', put: false }"
                ghost-class="ghost"
                drag-class="dragged"
                animation="200"
            >
                <ColumnButton
                    v-for="column in columnList"
                    :key="'po-column-'+column.name"
                    :name="column.name"
                    :type="column.type"
                />
            </draggable>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ColumnButton from "./ColumnButton/ColumnButton"
    import SourceNodeSelector from "@/components/widgets/SourceNodeSelector/SourceNodeSelector";
    import { getResultObjectID } from '@/core/projectManager';
    import draggable from 'vuedraggable';
    import Vue from "vue";

    export default {
        name: 'Pagecolumnbar',
        components: {
            ColumnButton, SourceNodeSelector, draggable
        },
        data() {
            return {
                resultObjectID: null,
                columnList: null
            }
        },
        prop: {

        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            selectInputNodeID(inputNodeID) {
                this.selectedInputNodeID = inputNodeID
            },
            getColumnList() {
                let result = []
                let columns = this.dataFrames[this.resultObjectID]["columns"];
                let types = this.dataFrames[this.resultObjectID]["column_types"];
                for (let i = 0; i < columns.length ;i++) {
                    result.push({'name': columns[i], 'type': types[columns[i]]})
                }
                return result
            },
            getResultObjectID() {
                return getResultObjectID([this.selectedInputNodeID, 'output_table_quick_info', this.nodeSignatures[this.selectedInputNodeID]])
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement',
                'nodeSignatures'
            ]),
            ...mapState('proj', [
                'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements', 'dataFrames'
            ]),
            selectedInputNodeID() {
                return this.projectObjects.getPath(this.activePage+".parameters.source_data_node", '')
            }
        },
        watch: {
            selectedInputNodeID(newValue, oldValue) {
                if(newValue!==null) {
                    Vue.set(this, 'resultObjectID', this.getResultObjectID());
                    Vue.set(this, 'columnList', this.getColumnList());
                }
            }
        },
        mounted() {
            if (this.selectedInputNodeID!==null) {
                Vue.set(this, 'resultObjectID', this.getResultObjectID());
                Vue.set(this, 'columnList', this.getColumnList());

            }
        }

    };
</script>

<style src="./PageColumnbar.scss" lang="scss"></style>
