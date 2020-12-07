<template>
    <div
            @click="activateObject(objectID)"
            class="object-selector"
            :class="{'active': activeObject===objectID}">
        <div class="flex-horizontal-no-scroll align-items-center">
            <div v-if="position!==0" class="object-selector-position mt-2 mr-3">
                <h4>#{{position}}</h4>
            </div>
            <div class="flex-vertical-no-scroll">
                <div class="d-flex align-items-center">
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
                    <div class="pill-buttons d-flex">
                        <i v-if="settingsButton" @click="emitEvent('settings', objectID)" class="la la-cog"  />
                        <i @click="deleteObject(objectID)" class="fa fa-sort-down"  />
                    </div>
                </div>
                <div class="object-selector-detail" v-if="showDetail">
                    {{detail}}
                </div>
        </div>
        </div>


    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    const R = require('ramda');
    import {getObjectSettings, getObjectSetting} from "../../../core/projectObjectParser";

    export default {
        name: 'ObjectSelector',
        props: {
            objectID: { type: String, default: null },
            showDetail: {type: Boolean, default: false},
            settingsButton: {type: Boolean, default: false},
            detailType: {type: String, default: ''},
            position: {type: Number, default: 0}
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
                'projectObjects', 'dataObjects', 'ProjectTree', 'projectObjectDataObjects',
                'dataObjectTypeMapping', 'dataObjectGroupMapping',
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
            objectType() {
                return getObjectSetting(this.projectObjects, this.objectID, 'type', '')
            },
            activeObject() {
                return this.activeObjectMapping[this.objectGroup]
            },
            title() {
                return this.projectObjects[this.objectID].name
            },
            detail() {
                if (this.detailType==='connector_type') {
                    let connectorID = this.projectObjectDataObjects[this.objectID]['connectors'];
                    return connectorID.length !== 0 ? this.dataObjectTypeMapping[this.dataObjects[connectorID].type] : ''
                }
                if (this.detailType==='action_description') {
                    let actionID = this.projectObjectDataObjects[this.objectID]['action'];
                    return actionID !== null ? this.dataObjectGroupMapping[this.dataObjects[actionID].group] : ''
                }
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
            emitEvent(eventName, objectID) {
                console.log('emiting', eventName, objectID);
                this.$emit(eventName, objectID)
            },
            deleteObject(objectID) {
                this.deletePO(objectID);
            }
        }
    };
</script>

<style src="./ObjectSelector.scss" lang="scss"></style>