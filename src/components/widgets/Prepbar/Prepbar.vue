<template>
    <div class="prep-bar">
        <div class="title-bar">
            <span class="title">Preparation</span>
            <span
                    class="add-prep-button"
            >
                <a>Add</a>
            </span>
        </div>
        <div class="d-flex c-100">
            <source-node-selector></source-node-selector>
            <draggable v-model="nodeList" handle=".handle">
                <div v-for="(nodeID, position) in nodeList">
                    <object-selector
                            :key="'po-'+nodeID"
                            :objectID="nodeID"
                            class="handle"
                            v-on:settings = "toggleSettings"
                            :position = "position+1"
                            showDetail
                            settingsButton
                            detailType="action_description"
                    />
                    <data-object-settings v-if="openSettings === nodeID" :objectID="nodeID" tag="action"/>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ObjectSelector from "../ObjectSelector/ObjectSelector"
    import DataObjectSettings from "../../layout/DataObjectSettings/DataObjectSettings"
    import draggable from 'vuedraggable';
    import SourceNodeSelector from "@/components/widgets/SourceNodeSelector/SourceNodeSelector";
    const R = require('ramda');

    export default {
        name: 'Prepbar',
        components: {
          DataObjectSettings,
            ObjectSelector, SourceNodeSelector, draggable
        },
        data() {
            return {
                openSettings: null
            }
        },
        props: {
            objectType: { type: String, default: null },
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            toggleSettings(objectID) {
                this.openSettings!==objectID ? this.openSettings = objectID : this.openSettings = null
            },
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists',
                'activeProcess', 'activePage', 'activeNode'
            ]),
            ...mapState('proj', [
                'selectedProcess', 'selectedPages', 'selectedNodes'
            ]),

            nodeList: {
                get() {
                    return this.nodeLists[this.activePage]
                },
                set(elementIDs) {
                    for (let i = 0; i < elementIDs.length ;i++) {
                        let elementID = elementIDs[i];
                        let element = R.clone(this.projectObjects[elementID]);
                        element.relative_position = i;
                        this.UPDATE_PROJECT_OBJECT({ObjectID: elementID, Object: element})
                    }
                }
            }
        },
    };
</script>

<style src="./Prepbar.scss" lang="scss"></style>
