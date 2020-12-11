<template>
    <div
            @click="activateObject(objectID)"
            class="object-selector"
            :class="{'active': activeObject===objectID}">
        <div class="c-100">
            <div v-if="position!==0" class="object-selector-position mt-2 mr-3">
                <h4>#{{position}}</h4>
            </div>
            <div class="d-inline-flex c-100">
                    <div class="c-95">
                        <div
                                v-if="objectID!==editedObject"
                                class="object-selector-text"
                                @dblclick="editObjectName(objectID)">
                            {{title}}
                        </div>
                        <div
                                v-if="objectID===editedObject"
                                class="input object-selector-text"
                                role="textbox">
                            <span v-focus @keydown="onInput" @blur="unblurObject" contenteditable>{{title}}</span>
                        </div>
                        <div class="object-selector-detail" v-if="showDetail">
                            {{detail}}
                        </div>
                    </div>

                    <div class="pill-buttons c-5">
                        <i v-if="settingsButton" @click="emitEvent('settings', objectID)" class="la la-cog"  />
<!--                        <i @click="deleteObject(objectID)" class="fa fa-sort-down"  />-->
                        <b-nav>
                            <b-dropdown
                                    text=""
                                    right
                                    boundary="testing-connector-bar"
                                    @show="activateObject(objectID)"
                            >
                                <b-dropdown-item @click="editObject">Rename</b-dropdown-item>
                                <b-dropdown-item @click="editObject">Edit</b-dropdown-item>
                                <b-dropdown-item @click="deleteObject(objectID)">Delete</b-dropdown-item>
                                <b-dropdown-item @click="duplicateObject(objectID)">Duplicate</b-dropdown-item>
                                <b-dropdown-item @click="editObject">Load Data</b-dropdown-item>
                            </b-dropdown>
                        </b-nav>
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
                'processList', 'pageLists', 'nodeLists',
                'activeProcess', 'activePage', 'activeNode'
            ]),
            activeObjectMapping() {
                return {
                    1: this.activeProcess,
                    2: this.activePage,
                    3: this.activeNode
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
            projectObject() {
                return this.projectObjects[this.objectID]
            },
            connectedDataObjects() {
                return this.projectObject['data_object_tags']
            },
            title() {
                return this.projectObjects[this.objectID].name
            },
            detail() {
                let detail = '';
                if (this.detailType==='connector_type') {
                    if (this.connectedDataObjects.hasOwnProperty('connector')) {
                        let connectorID = this.connectedDataObjects['connector'];
                        detail = this.dataObjects[connectorID]['type_text'];

                    }
                }
                if (this.detailType==='action_description') {
                    if (this.connectedDataObjects.hasOwnProperty('action')) {
                        let actionID = this.connectedDataObjects['action'];
                        detail = this.dataObjects[actionID]['type_text'];
                    }
                }
                return detail
            }
        },
        methods: {
            ...mapActions('proj/object_manager', [
                'setActivePO', 'copyProjectObject'
            ]),
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            updateName(name) {
                let object = R.clone(this.projectObjects[this.objectID]);
                object.name = name;
                console.log(object);
                this.UPDATE_PROJECT_OBJECT({ObjectID: this.objectID, Object:object})
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
            editObjectName(objectID) {
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
                this.$emit(eventName, objectID)
            },
            duplicateObject(objectID) {
                this.copyProjectObject({projectObjectID: objectID});
            },
            editObject() {
                this.$bvModal.show('existing-connector-explorer');
            },
            deleteObject(objectID) {
                this.copyProjectObject({projectObjectID: objectID});
            }
        }
    };
</script>

<style src="./ObjectSelector.scss" lang="scss"></style>