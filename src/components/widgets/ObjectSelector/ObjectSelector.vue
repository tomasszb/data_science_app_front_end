<template>
    <div
            @click="activateObject(objectID)"
            class="object-selector"
            :class="{'active': activeObject===objectID}">
        <div class="c-100 d-inline-flex">
            <div v-if="position!==0" class="object-selector-position mt-2 mr-3">
                <h4>#{{position}}</h4>
            </div>
            <div class="d-inline-flex c-100 align-items-center justify-content-between">
                    <div class="object-selector-text-area">
                        <div
                                v-show="objectID!==editedObject"
                                class="object-selector-text"
                                @dblclick="editObjectName(objectID)">
                            {{title}}
                        </div>
                        <div
                                v-show="objectID===editedObject"
                                class="input object-selector-text"
                                role="textbox">
                            <span
                                v-focus
                                @keydown="onInput"
                                v-click-outside="unblurObject"
                                :ref="'object_selector_input'+objectID"
                                contenteditable>
                                {{title}}
                            </span>
                        </div>
                        <div class="object-selector-detail" v-if="showDetail">
                            {{detail}}
                        </div>
                    </div>

                    <div class="pill-buttons  d-inline-flex align-items-center">
                        <i v-if="settingsButton" @click="emitEvent('settings', objectID)" class="la la-cog mx-1"  />
<!--                        <i @click="deleteObject(objectID)" class="fa fa-sort-down"  />-->
                        <b-nav class="mx-1">
                            <b-dropdown
                                    text=""
                                    right
                                    boundary="testing-connector-bar"
                                    @show="activateObject(objectID)"
                            >
                                <b-dropdown-item @click="editObjectName(objectID)">Rename</b-dropdown-item>
                                <b-dropdown-item @click="editObject">Edit</b-dropdown-item>
                                <b-dropdown-item @click="deleteObject(objectID)">Delete</b-dropdown-item>
                                <b-dropdown-item @click="duplicateObject(objectID)">Duplicate</b-dropdown-item>
                                <b-dropdown-item @click="runChildren(objectID)">Load Data</b-dropdown-item>
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
    import ClickOutside from 'vue-click-outside'
    import {getObjectSettings, getObjectSetting} from "../../../core/projectObjectParser";
    import {createDataFlowRequest} from '@/core/projectManager';
    import TreeModel from "tree-model";

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
            ClickOutside,
            focus: {
                inserted (el) {
                    el.focus()
                }
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree', 'projectTreeModel',
                'dataObjectTypeMapping', 'dataObjectGroupMapping',
                'processList', 'pageLists', 'nodeLists',
                'activeProcess', 'activePage', 'activeNode',
                'nodeSignatures'
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
                'setActivePO', 'copyProjectObject', 'deleteProjectObject'
            ]),
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_NODE_EXECUTION_STATUS'
            ]),
            updateName(name) {
                let object = R.clone(this.projectObjects[this.objectID]);
                object.name = name;
                this.UPDATE_PROJECT_OBJECT({ObjectID: this.objectID, Object:object})
            },
            onInput(e) {
                if(e.key=='Escape') {
                    e.target.innerText = this.title
                    this.editedObject = null;
                }
                else if(e.key=='Enter') {
                    this.updateName(e.target.innerText);
                    this.editedObject = null;
                }
                else if(e.target.innerText.length>=this.maxInputTextLen && e.key!=='Backspace' && e.key!=='Delete') {
                    e.preventDefault();
                }
            },
            runChildren(objectID) {

                let projectObject = this.projectTreeModel.first(function (obj) {
                    return obj.model.id === objectID;
                });
                for (const child of projectObject.children) {
                    let childID = child.model.id;
                    if (this.projectObjects[childID].group === 3) {
                        let request = createDataFlowRequest(childID, ['run_connector', 'get_output_table']);

                        this.UPDATE_NODE_EXECUTION_STATUS({
                            nodeID: childID,
                            executionTemplate: "get_output_table",
                            nodeSignature: this.nodeSignatures[childID],
                            status: 'requested'});
                        this.$webSocketSend(request);
                    }
                }
            },
            editObjectName(objectID) {
              this.editedObject = objectID;
              // this.$refs.object_selector_input.focus();
              // this.$refs.object_selector_input.select();
              // document.execCommand('selectAll',false,null)
              // this.$refs.object_selector_input.setSelectionRange(0, this.$refs.object_selector_input.value.length)
            },
            unblurObject() {
                if (this.editedObject === this.objectID) {
                    // // console.log(this.$refs["object_selector_input"+this.objectID])
                    this.updateName(this.$refs["object_selector_input"+this.objectID].innerText);
                }
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
            renameObject() {
              this.$bvModal.show('existing-connector-explorer');
            },
            editObject() {
                this.$bvModal.show('existing-connector-explorer');
            },
            deleteObject(objectID) {
                this.deleteProjectObject({projectObjectID: objectID});
            }
        }
    };
</script>

<style src="./ObjectSelector.scss" lang="scss"></style>
