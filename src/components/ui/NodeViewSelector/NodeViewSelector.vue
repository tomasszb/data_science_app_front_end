<template>
    <div class=" node-view-selector mr-5">
        <b-button-group v-if="processViewCode !== 2">
            <b-button
                v-for="(nodeViewCode, i) in nodeViewCodes"
                :key="'node-view-key-'+i"
                variant="light"
                size="xs"
                @click="changeNodeView('activeNodeViewCode', nodeViewCode)"
                :class="{
                active: activeNodeViewCode === nodeViewCode
            }"
            >
                {{nodeViewNameCodes[nodeViewCode.toString()]}}
            </b-button>
        </b-button-group>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    const R = require('ramda');
    import Vue from 'vue';
    import {getObjectByRoute} from "../../../core/projectManager";

    export default {
        name: 'NodeViewSelector',
        components: {},
        data() {
            return {
                dataObjectTag : {
                    200: 'connector',
                    201: 'action',
                    202: 'dashboard'
                },
                nodeViewMapping : {
                    1000: [3,1,2],
                    1001: [1,2],
                    1002: [1,2],
                    1003: [1,2],
                    3200: [1,2],
                },
                nodeViewNameCodes : {
                    3: 'SQL',
                    1: 'Data',
                    2: 'Detail'
                },

                processViewMapping : {
                    100: [1,2],
                    101: [1,2],
                    102: [1,2]
                },
                processViewNameCodes : {
                    1: 'existing_object',
                    2: 'new_object'
                }
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DISPLAY_SETTINGS',
            ]),
            ...mapActions('proj/object_manager', [
                'newNode', 'getOrDefault'
            ]),
            changeNodeView(field, value) {
                Vue.set(this, field, value);
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects',
                'activeProcess', 'activePage', 'activeNode'
            ]),

            activeNodeSettings() {
                return this.projectObjects.getKeyOrDefault(this.activeNode, {})
            },
            activePageSettings() {
                return this.projectObjects.getKeyOrDefault(this.activePage, {})
            },
            activeProcessSettings() {
                return this.projectObjects.getKeyOrDefault(this.activeProcess, {})
            },
            mainDataObjectID() {
                let activePageType = this.activePageSettings.getKeyOrDefault('type', null)
                let tag = this.dataObjectTag.getKeyOrDefault(activePageType, '');
                return this.activePageSettings.getPath('data_object_tags.'+tag, null)
            },
            mainDataObject() {
                return this.dataObjects.getKeyOrDefault(this.mainDataObjectID, {})
            },
            nodeViewCodes() {
                let mainDataObjectGroup = this.mainDataObject.getKeyOrDefault('group', null)
                return this.nodeViewMapping.getKeyOrDefault(mainDataObjectGroup, null)
            },
            processViewCodes() {
                let activeProcessType = this.activeProcessSettings.getKeyOrDefault('type', null)
                return this.processViewMapping.getKeyOrDefault(activeProcessType, null)
            },
            activeNodeViewCode: {
                get() {
                    let displaySettings = R.clone(this.activeNodeSettings.getKeyOrDefault('display_settings', {}))
                    if (!displaySettings.hasOwnProperty('node_view') && this.activeNodeSettings.hasOwnProperty('id') ) {
                        displaySettings['node_view'] = this.nodeViewCodes[0];
                        this.UPDATE_DISPLAY_SETTINGS({
                            ObjectID: this.activeNodeSettings.id,
                            displaySettings: displaySettings
                        });
                    }

                    return displaySettings['node_view']
                },
                set(newValue) {
                    let displaySettings = R.clone(this.activeNodeSettings.getKeyOrDefault('display_settings', {}))
                    displaySettings['node_view'] = newValue;
                    if (this.activeNodeSettings.hasOwnProperty('id')) {
                        this.UPDATE_DISPLAY_SETTINGS({
                            ObjectID: this.activeNodeSettings.id,
                            displaySettings: displaySettings
                        });
                    }
                }
            },
            processViewCode: {
                get() {
                    let displaySettings = R.clone(this.activeProcessSettings.getKeyOrDefault('display_settings', {}))
                    if (!displaySettings.hasOwnProperty('process_view') && this.activeProcessSettings.hasOwnProperty('id')) {
                        displaySettings['process_view'] = this.processViewCodes[0];
                        this.UPDATE_DISPLAY_SETTINGS({
                            ObjectID: this.activeProcessSettings.id,
                            displaySettings: displaySettings
                        });
                    }

                    return displaySettings['process_view']
                },
                set(newValue) {
                    let displaySettings = R.clone(this.activeProcessSettings.getKeyOrDefault('display_settings', {}))
                    displaySettings['process_view'] = newValue;

                    if (this.activeProcessSettings.hasOwnProperty('id')) {
                        this.UPDATE_DISPLAY_SETTINGS({
                            ObjectID: this.activeProcessSettings.id,
                            displaySettings: displaySettings
                        });
                    }
                }
            },
        }
    };
</script>

<style src="./NodeViewSelector.scss" lang="scss"></style>
