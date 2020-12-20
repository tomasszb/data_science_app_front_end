<template>
    <div class=" node-view-selector mr-5">
        <b-button-group>
            <b-button
                    :key="'node-view-key-'+i"
                    variant="light"
                    size="xs"
                    v-for="(nodeView, i) in nodeViewMapping[mainDataObject.group]"
                    @click="changeNodeView('nodeViewIndex', i)"
                    :class="{ active: nodeViewIndex === i }"
            >
                {{nodeView}}
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
                    1000: ['Sql Query', 'Data', 'Columns'],
                    1001: ['Data', 'Columns'],
                    1002: ['Data', 'Columns'],
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
            changeNodeView(field, index) {
                Vue.set(this, field, index);
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects',
                'activePage'
            ]),

            mainDataObjectID() {
                let tag = this.dataObjectTag[this.projectObject.type];
                console.log(tag, this.projectObject, this.projectObject['data_object_tags']);
                return this.projectObject['data_object_tags'][tag]
            },
            mainDataObject() {
                console.log(this.mainDataObjectID, this.dataObjects[this.mainDataObjectID]);
                return this.dataObjects[this.mainDataObjectID]
            },
            projectObject() {
                return this.projectObjects[this.activePage]
            },
            displaySettings() {
                return this.projectObject['display_settings']
            },
            nodeViewIndex: {
                get() {
                    return this.displaySettings.hasOwnProperty('node_view') ? this.displaySettings['node_view'] : 0
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
