<template>
    <div class=" node-view-selector mr-5">
        <b-button-group>
            <b-button
                    :key="'node-view-key-'+i"
                    variant="light"
                    size="xs"
                    v-for="(nodeViewName, i) in nodeViewNames"
                    @click="changeNodeView('nodeViewCode', nodeViewNameCodes[nodeViewName])"
                    :class="{ active: nodeViewCode === nodeViewNameCodes[nodeViewName] }"
            >
                {{nodeViewName}}
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
        props: {
            objectType: { type: String, default: null },
        },
        data() {
            return {
                dataObjectTag : {
                    200: 'connector',
                    201: 'action',
                    202: 'chart'
                },
                nodeViewMapping : {
                    1000: ['SQL', 'Data', 'Detail'],
                    1001: ['Data', 'Detail'],
                    1002: ['Data', 'Detail'],
                },
                nodeViewNameCodes : {
                    'SQL': 3,
                    'Data': 1,
                    'Detail': 2
                }
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DISPLAY_SETTINGS',
            ]),
            ...mapActions('proj/object_manager', [
                'newNode'
            ]),
            changeNodeView(field, value) {
                Vue.set(this, field, value);
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects',
                'activePage'
            ]),

            mainDataObjectID() {
                let tag = this.dataObjectTag[this.projectObject.type];
                return this.projectObject['data_object_tags'][tag]
            },
            mainDataObject() {
                return this.dataObjects[this.mainDataObjectID]
            },
            nodeViewNames() {
                return this.nodeViewMapping[this.mainDataObject.group]
            },
            projectObject() {
                return this.projectObjects[this.activePage]
            },
            displaySettings() {
                return this.projectObject['display_settings']
            },
            nodeViewCode: {
                get() {
                    if (!this.displaySettings.hasOwnProperty('node_view') ) {
                        let displaySettings = R.clone(this.displaySettings);
                        displaySettings['node_view'] = this.nodeViewNameCodes[this.nodeViewNames[0]];
                        this.UPDATE_DISPLAY_SETTINGS({
                            ObjectID: this.projectObject.id,
                            displaySettings: displaySettings
                        });
                    }
                    return this.displaySettings.hasOwnProperty('node_view') ? this.displaySettings['node_view'] : this.nodeViewNameCodes[this.nodeViewNames[0]]
                },
                set(newValue) {
                    let displaySettings = R.clone(this.displaySettings);
                    displaySettings['node_view'] = newValue;
                    this.UPDATE_DISPLAY_SETTINGS({
                        ObjectID: this.projectObject.id,
                        displaySettings: displaySettings
                    });
                }
            }
        }
    };
</script>

<style src="./NodeViewSelector.scss" lang="scss"></style>
