<template>
    <div class="prep-bar flex-vertical-no-scroll">
        <div class="title-bar">
            <span class="title">Preparation</span>
            <span
                    class="add-prep-button"
            >
                <a>Add</a>
            </span>
        </div>
        <div class="flex-vertical">
            <draggable v-model="elementList" >
                <div v-for="(elementID, position) in elementList">
                    <object-selector
                            :key="'po-'+elementID"
                            :objectID="elementID"
                            v-on:settings = "toggleSettings"
                            :position = "position+1"
                            showDetail
                            settingsButton
                            detailType="action_description"
                    />
                    <prep-settings v-if="openSettings === elementID"/>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ObjectSelector from "../ObjectSelector/ObjectSelector"
    import PrepSettings from "../PrepSettings/PrepSettings"
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'Prepbar',
        components: {
            PrepSettings,
            ObjectSelector, draggable
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
                'processList', 'pageLists', 'pageLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            ...mapState('proj', [
                'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements'
            ]),

            elementList: {
                get() {
                    return this.elementLists[this.activeNode]
                },
                set(elementIDs) {
                    for (let i = 0; i < elementIDs.length ;i++) {
                        let elementID = elementIDs[i];
                        let element = R.clone(this.projectObjects[elementID]);
                        element.relative_position = i;
                        this.UPDATE_PROJECT_OBJECT({ObjectId: elementID, Object: element})
                    }
                }
            }
        },
    };
</script>

<style src="./Prepbar.scss" lang="scss"></style>
