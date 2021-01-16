<template>
    <div class="page-column-bar">
        <b-dropdown :text="projectObjects[selectedInputNodeID].name" class="page-columnbar-picker mb-4">
            <b-dropdown-item-button
                    v-for="(nodeID, i) in inputNodeIDs"
                    :key="'table-page_option-'+i"
                    @click="selectInputNodeID(nodeID)"
            >
                {{projectObjects[nodeID].name}}
            </b-dropdown-item-button>
        </b-dropdown>
        <br>
        <draggable v-model="columnList" :group="{ name: 'columns', pull: 'clone', put: false }">
            <ColumnButton
                    v-for="column in columnList"
                    :key="'po-column-'+column.name"
                    :name="column.name"
                    :type="column.type"
            />
        </draggable>
        <Widget
                class="mt-3"
                title="<h6>Aggregated <span class='fw-semi-bold'>values</span></h6>"
                collapse customHeader
        >
            <div class="chart-column-container p-3 pb-3">

            </div>
        </Widget>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ColumnButton from "./ColumnButton/ColumnButton"
    import draggable from 'vuedraggable';

    export default {
        name: 'Pagecolumnbar',
        components: {
            ColumnButton, draggable
        },
        data() {
            return {
                selectedInputNodeID: null,
                columnList: [
                    {name: "year", type: "date"},
                    {name: "player", type: "abc"},
                    {name: "pos", type: "abc"},
                    {name: "age", type: "int"},
                    {name: "g", type: "abc"},
                    {name: "gs", type: "abc"}
                ]
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
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            ...mapState('proj', [
                'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements'
            ]),
            inputNodeIDs() {
                let processIndex = this.processList.indexOf(this.activeProcess);
                let previousNodeIDs = [];

                for (let i=0; i<processIndex; i++) {
                    let previousProcessId = this.processList[i];
                    let previousPageIDs = this.pageLists[previousProcessId];
                    for (let pageID of previousPageIDs) {
                        previousNodeIDs = previousNodeIDs.concat(this.nodeLists[pageID])
                    }
                }
                return previousNodeIDs
            }

        },
        watch: {
            activeNode: function(activeNodeID) {
                this.selectedInputNodeID = this.projectObjects[activeNodeID].parameters.source_data_node.toString()
            }
        },
        created() {
            this.selectedInputNodeID = this.projectObjects[this.activeNode].parameters.source_data_node.toString()
        }

    };
</script>

<style src="./PageColumnbar.scss" lang="scss"></style>
