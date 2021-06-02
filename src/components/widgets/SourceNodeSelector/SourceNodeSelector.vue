<template>
    <div class="source-node-selector mb-4">
        <div class="c-100 d-inline-flex">
            <div class="source-node-selector-position mt-2 mr-3">
                <h4>#0</h4>
            </div>
            <div class="d-inline-flex c-100 align-items-center justify-content-between">
                <div class="source-node-selector-text-area">
                    <div
                        class="source-node-selector-text">
                        {{projectObjects[selectedInputNodeID]["name"]}}
                    </div>
                    <div class="source-node-selector-detail">
                        Select Source Data
                    </div>
                </div>

                <div class="pill-buttons  d-inline-flex align-items-center">
                    <b-nav class="mx-1">
                        <b-dropdown
                            text=""
                            block
                            right
                            offset="15"
                            menu-class="c-95 mt-4"
                            boundary="testing-connector-bar"
                        >
                            <div v-for="(nodes, processName) in inputNodeIDs">
                                <b-dropdown-item disabled> <strong>{{processName}}</strong></b-dropdown-item>
                                <b-dropdown-item
                                    @click="selectedInputNodeID=nodeID"
                                    v-for="(nodeName, nodeID) in nodes"
                                >
                                    {{nodeName}}
                                </b-dropdown-item>
                            </div>

                        </b-dropdown>
                    </b-nav>
                </div>
            </div>
        </div>


    </div>


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
    import Vue from "vue";
    // import AdvancedSelect from '@myena/advanced-select';
    import VueFormulate from '@braid/vue-formulate'
    import VeeValidate from "vee-validate";
    Vue.use(VeeValidate, { inject: false });


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
            selectedInputNodeID: {
                get() {
                    return this.projectObjects[this.activeNode].parameters.source_data_node.toString()
                },
                set(newValue) {
                    // console.log('setting new value selectedInputNodeID', newValue);
                    let obj = R.clone(this.projectObjects[this.activeNode]);
                    obj.parameters.source_data_node = newValue;
                    this.UPDATE_PROJECT_OBJECT({ObjectID: this.activeNode, Object: obj})
                }
            },
            inputNodeIDs() {
                let processIndex = this.processList.indexOf(this.activeProcess);
                let pageIndex = this.pageLists[this.activeProcess].indexOf(this.activeProcess);
                let previousNodeIDs = {};

                for (let i=0; i<=processIndex; i++) {
                    let previousProcessId = this.processList[i];
                    let previousPageIDs = [];

                    if (i === processIndex) {
                        previousPageIDs = this.pageLists[previousProcessId].slice(0, pageIndex-1);
                    } else {
                        previousPageIDs = this.pageLists[previousProcessId];
                    }
                    let processName = this.projectObjects[previousProcessId]["name"];
                    let processGroup = this.projectObjects[previousProcessId]["group"];

                    if (previousPageIDs.length>0) {
                        previousNodeIDs[processName] = {}
                        for (let pageID of previousPageIDs) {
                            if (processGroup === 1) {
                                for (let nodeID of this.nodeLists[pageID]) {
                                    previousNodeIDs[processName][nodeID] = this.projectObjects[nodeID]["name"];
                                }
                            }
                            if (processGroup === 2) {
                                let nodeID = this.nodeLists[pageID][-1];
                                previousNodeIDs[processName][nodeID] = this.projectObjects[nodeID]["name"];
                            }
                        }
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
            ])
        }
    };
</script>

<style src="./SourceNodeSelector.scss" lang="scss"></style>
