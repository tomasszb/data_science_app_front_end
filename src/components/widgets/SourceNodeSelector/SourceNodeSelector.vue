<template>
    <FormulateInput
        type="select"
        placeholder="Choose a time"
        :option-groups="{
            Morning: {
              10: '10am',
              11: '11am'
            },
            Afternoon: {
              15: '3pm',
              17: '5pm'
            }
        }"
    />

<!--    <advanced-select-->
<!--        v-model="value"-->
<!--        :options="options"-->
<!--        :multiple="false"-->
<!--        :collapse-headers="true"-->
<!--    />-->
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    const R = require('ramda');
    // import AdvancedSelect from '@myena/advanced-select';
    import VueFormulate from '@braid/vue-formulate'


    export default {
        name: 'SourceNodeSelector',
        components: {
            VueFormulate
        },
        props: {
            objectID: { type: String, default: null },
            showDetail: {type: Boolean, default: false},
            settingsButton: {type: Boolean, default: false},
            detailType: {type: String, default: ''},
            position: {type: Number, default: 0}
        },
        data() {
            return {
                selectedInputNodeID: null,
                options: [
                    { value: 1, text: 'One' },
                    {
                        label: 'Group 1',
                        options: [
                            { value: 3, text: 'Three' },
                            { value: 4, text: 'Four', disabled: true },
                            { value: 5, text: 'Five' },
                        ],
                    },
                    {
                        label: 'Group 2',
                        options: [
                            { value: 6, text: 'Six' },
                            { value: 7, text: 'Seven' },
                            { value: 8, text: 'Eight' },
                        ],
                    },
                ],
                value: [1],
            }
        },
        directives: {
            focus: {
                inserted (el) {
                    el.focus()
                }
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree', 'projectTreeModel',
                'dataObjectTypeMapping', 'dataObjectGroupMapping',
                'processList', 'pageLists', 'nodeLists',
                'activeProcess', 'activePage', 'activeNode',
                'nodeSignatures'
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
        methods: {
            ...mapActions('proj/object_manager', [
                'setActivePO', 'copyProjectObject', 'deleteProjectObject'
            ]),
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_NODE_EXECUTION_STATUS'
            ]),
            selectInputNodeID(inputNodeID) {
                this.selectedInputNodeID = inputNodeID
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

<style src="./SourceNodeSelector.scss" lang="scss"></style>