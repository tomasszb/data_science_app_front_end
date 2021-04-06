<template>
    <div class="sheet-bar r-100">
        <div class="align-items-center r-100 d-flex">
            <vue-resizable
                :width="width"
                :min-width="minWidth"
                :max-width="maxWidth"
                :height="0"
                :active="['r']"
                :disableAttributes="['h']"
                class="d-inline-block r-100"
                @resize:end="storeWidth"
            >
                <div class="sheet-bar-sheet-area">
                    <draggable v-model="objectList" class=" d-flex r-100  ">
                        <object-selector
                            v-for="objectID in objectList"
                            :key="'po-'+objectID"
                            :objectID="objectID"
                            :objectNameInitial="projectObjects[objectID].name"
                            :objectType="objectType"
                        />
                    </draggable>
                </div>

            </vue-resizable>
            <div class="flex-horizontal sheet-bar-button-area align-items-center">
                <i class="fa fa-plus ml-5 mr-1 sheet-bar-button" @click="addNode()"/>
                <i class="fa fa-arrow-left ml-4 sheet-bar-button" @click="scroll_left()"/>
                <i class="fa fa-arrow-right ml-3 sheet-bar-button" @click="scroll_right()"/>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import ObjectSelector from "../ObjectSelector/ObjectSelector"
    import draggable from 'vuedraggable';
    import VueResizable from 'vue-resizable'
    import {getObjectSetting} from "@/core/projectObjectParser";
    const R = require('ramda');

    export default {
        name: 'Sheetbar',
        components: {
            ObjectSelector, draggable, VueResizable
        },
        props: {
            objectType: { type: String, default: null },
            defaultWidth: { type: Number},
            minWidth: { type: Number },
            maxWidth: { type: Number },
            settingPrefix: { type: String }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DISPLAY_SETTINGS'
            ]),
            ...mapActions('proj/object_manager', [
                'newNode', 'newPage'
            ]),
            addNode() {
                if (this.objectType==='page') {
                    this.newPage({
                        typeCD: 200,
                        selName: 'newPage',
                        dataObjectTags: {}
                    });
                }
                if (this.objectType==='node') {
                    this.newNode({
                        typeCD: 300,
                        dataObjectTags: {'query': null}
                    });
                }

            },
            scroll_left() {
                let content = document.querySelector(".sheet-bar-sheet-area");
                content.scrollLeft -= 50;
            },
            scroll_right() {
                let content = document.querySelector(".sheet-bar-sheet-area");
                content.scrollLeft += 40;
            },
            storeWidth(event) {
                let displaySettings = R.clone(this.displaySettings);
                displaySettings[this.settingName] = event.width;
                this.UPDATE_DISPLAY_SETTINGS({
                    ObjectID: this.projectObjects[this.activeObject].id,
                    displaySettings: displaySettings
                });
            }
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

            displaySettings() {
                console.log('displaySettings', getObjectSetting(this.projectObjects, this.activeObject, 'display_settings', {}));
                return getObjectSetting(
                    this.projectObjects,
                    this.activeObject,
                    'display_settings',
                    {}
                );
            },
            width() {
                if (this.displaySettings.hasOwnProperty(this.settingName)) {
                    return this.displaySettings[this.settingName]
                }
                else {
                    return this.defaultWidth
                }
            },
            settingName() {
                return this.settingPrefix + "-sheetbar-width"
            },

            objectLists() {
                if (this.objectType==='page') {
                    return this.pageLists[this.activeProcess]
                }
                if (this.objectType==='node') {
                    return this.nodeLists[this.activePage]
                }
            },

            activeObject() {
                if (this.objectType==='page') {
                    return this.activePage
                }
                if (this.objectType==='node') {
                    return this.activeNode
                }
            },

            objectList: {
                get() {
                    return this.objectLists
                },
                set(objectIDs) {
                    for (let i = 0; i < objectIDs.length ;i++) {
                        let objectID = objectIDs[i];
                        let object = R.clone(this.projectObjects[objectID]);
                        object.relative_position = i;
                        this.UPDATE_PROJECT_OBJECT({ObjectId: objectID, Object: object})
                    }
                }
            }
        }
    };
</script>

<style src="./Sheetbar.scss" lang="scss"></style>
