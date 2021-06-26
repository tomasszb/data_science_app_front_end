<template>
    <div>
        <div class="text-gray-light small font-weight-bold mt-2 mb-2">
            Data Source
        </div>
        <div class="source-node-selector mb-4">
            <b-dropdown
                block
                split
                class="d-inline-flex c-100"
                menu-class="w-100 mt-3"
            >
                <template slot="button-content">
                    <div class="d-inline-flex c-100 align-items-center">
                        <i class='fa fa-link mr-3'/>
                        <div class="source-node-selector-text">
                            {{projectObjects[selectedInputNodeID]['name']}}
                        </div>
                    </div>

                </template>
                <div v-for="(nodes, processName) in inputNodes[0]">
                    <b-dropdown-group id="dropdown-group-1" :header="processName">
                        <b-dropdown-item
                            @click="selectedInputNodeID=nodeID"
                            v-for="(nodeName, nodeID) in nodes"
                        >
                            {{nodeID}}-{{nodeName}}
                        </b-dropdown-item>
                    </b-dropdown-group>
                    <b-dropdown-divider/>
                </div>
            </b-dropdown>

        </div>
    </div>
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
                    let result = this.projectObjects.getPath(
                        this.activePage+".display_settings.selected_source_node",
                        null
                    );
                    if (result===null) {
                        Vue.set(this, 'selectedInputNodeID', this.inputNodes[1][0]);
                    }
                    return this.projectObjects[this.activePage]["display_settings"]["selected_source_node"]
                },
                set(newValue) {
                    let obj = R.clone(this.projectObjects[this.activePage]);
                    obj = obj.setPath('display_settings.selected_source_node', newValue);
                    this.UPDATE_PROJECT_OBJECT({ObjectID: this.activePage, Object: obj})
                }
            },
            inputNodes() {
                let processIndex = this.processList.indexOf(this.activeProcess);
                let pageIndex = this.pageLists[this.activeProcess].indexOf(this.activeProcess);
                let previousNodeIDs = {};
                let previousNodeIDsList = []

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
                                    previousNodeIDsList.push(nodeID);
                                }
                            }
                            if (processGroup === 2) {
                                let nodeID = this.nodeLists[pageID][-1];
                                previousNodeIDs[processName][nodeID] = this.projectObjects[nodeID]["name"];
                                previousNodeIDsList.push(nodeID);
                            }
                        }
                    }
                }
                return [previousNodeIDs, previousNodeIDsList]
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
