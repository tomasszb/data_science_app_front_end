<template>
    <div class="sheet-bar">
        <div class="d-flex justify-content-start align-items-center">
            <draggable v-model="objectList" class="d-flex justify-content-start">
                <object-selector
                        v-for="objectID in objectList"
                        :key="'po-'+objectID"
                        :objectID="objectID"
                        :objectNameInitial="projectObjects[objectID].name"
                        :objectType="objectType"
                />
            </draggable>
            <i class="fa fa-plus ml-3 list-element node-add" @click="addNode()"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import ObjectSelector from "../ObjectSelector/ObjectSelector"
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'Sheetbar',
        components: {
            ObjectSelector, draggable
        },
        props: {
            objectType: { type: String, default: null },
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'new'
            ]),
            ...mapActions('proj/object_manager', [
                'newNode'
            ]),
            addNode() {
                console.log('here')
                this.newNode({
                    typeCD: 300,
                    dataObjectTags: {'query': null}
                });

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

            objectLists() {
                if (this.objectType==='page') {
                    return this.pageLists[this.activeProcess]
                }
                if (this.objectType==='node') {
                    return this.nodeLists[this.activePage]
                }
                if (this.objectType==='element') {
                    return this.elementLists[this.activeNode]
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
