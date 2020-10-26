<template>
    <div
            @click="activateObject(objectID)"
            class="object-selector"
            :class="{'active': activeObject===objectID}">
        <div
                v-if="objectID!==editedObject"
                class="object-selector-text"
                @dblclick="editObject(objectID)">
            {{title}}
        </div>
        <div
                v-if="objectID===editedObject"
                class="input object-selector-text"
                role="textbox">
            <span v-focus @keydown="onInput" @blur="unblurObject" contenteditable>{{title}}</span>
        </div>
        <div class="pill-buttons">
            <i @click="deleteObject(objectID)" class="fa fa-sort-down"  />
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    const R = require('ramda');
    import {getObjectSettings, getObjectSetting} from "../../../core/projectObjectParser";

    export default {
        name: 'ObjectButton',
        props: {
            objectID: { type: String, default: null }
        },
        data() {
            return {
                editedObject: null,
                maxInputTextLen: 40
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
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            activeObjectMapping() {
                return {
                    1: this.activeProcess,
                    2: this.activePage,
                    3: this.activeNode,
                    4: this.activeElement
                }
            },
            objectGroup() {
                return getObjectSetting(this.projectObjects, this.objectID, 'group', '')
            },
            activeObject() {
                return this.activeObjectMapping[this.objectGroup]
            },
            title() {
                return this.projectObjects[this.objectID].name
            }
        },
        methods: {
            ...mapActions('proj/object_manager', [
                'setActivePO', 'deletePO'
            ]),
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            updateName(name) {
                let object = R.clone(this.projectObjects[this.objectID]);
                object.name = name;
                this.UPDATE_PROJECT_OBJECT({ObjectId: this.objectID, Object:object})
            },
            onInput(e) {
                if(e.key=='Escape') {
                    this.unblurObject();
                }
                else if(e.key=='Enter') {
                    this.unblurObject();
                    this.updateName(e.target.innerText);
                }
                else if(e.target.innerText.length>=this.maxInputTextLen && e.key!=='Backspace' && e.key!=='Delete') {
                    e.preventDefault();
                }
            },
            editObject(objectID) {
                this.editedObject = objectID;
            },
            unblurObject() {
                this.editedObject = null;
            },

            activateObject(objectID) {
                this.setActivePO({
                        selectedProcess: this.objectGroup===1 ? objectID : null,
                        selectedPage: this.objectGroup===2 ? objectID : null,
                        selectedNode: this.objectGroup===3 ? objectID : null,
                        selectedElement: this.objectGroup===4 ? objectID : null
                });
            },
            deleteObject(objectID) {
                this.deletePO(objectID);
            }
        }
    };
</script>

<style src="./ObjectSelector.scss" lang="scss"></style>