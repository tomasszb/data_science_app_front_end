<template>
    <div class="connector-explorer flex-vertical">
        <div class="connector-explorer-panel flex-vertical">
            <div class="connector-explorer-title">
                <b-input-group id="transparent-field" class="input-group-transparent">
                    <b-input-group-text class="bg-transparent" slot="prepend">
                        <i class="fa fa-search" />
                    </b-input-group-text>
                    <b-form-input
                        type="text"
                        class="px-2"
                        autocomplete="off"
                        v-model="connectorFilter"
                        placeholder="Find Connector"
                    ></b-form-input>
                </b-input-group>
            </div>
            <div class="connector-type-picker flex-vertical">
                <div v-for="(connectorTypes, connectorGroup) in dataConnectorGroups" class="c-100 float-left mt-4">
                    <h5 class="mb-3 font-weight-bold">
                        &nbsp {{dataObjectGroupMapping[connectorGroup]}}
                    </h5>
                    <div v-for="connectorType in connectorTypes" class="float-left">
                        <ConnectorType
                            :name="dataObjectTypeMapping[connectorType]"
                            :key="connectorType"
                            :active="false"
                            @click.native="selectConnectorTypeGroup(connectorType, connectorGroup) "
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
    import DataObjectSettings from "../../layout/DataObjectSettings/DataObjectSettings";
    import ConnectorType from "@/components/widgets/ConnectorExplorer/ConnectorType/ConnectorType";
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'ConnectorForm',
        components: {
            ConnectorType, DataObjectSettings, draggable
        },
        data() {
          return {
              connectorFilter: '',
              activeConnectorType: '',
              elementName: '',
              dataObjectID: ''
          }
        },
        props: {
            objectType: { type: String, default: null },
            type: { type: String, default: null },
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DATA_OBJECT', 'UPDATE_DISPLAY_SETTINGS'
            ]),
            ...mapActions('proj/object_manager', [
                'newPage', 'setActivePO'
            ]),
            selectConnectorTypeGroup(connectorType, connectorGroup) {
                this.newDataObject();
                let objectID = this.dataObjectID;
                let object = R.clone(this.dataObjects[objectID]);
                // console.log('selectConnectorTypeGroup',connectorType, connectorGroup, this.dataConnectorGroups)
                // console.log('selectConnectorTypeGroup', this.dataObjectTypeMapping)
                // console.log('selectConnectorTypeGroup', this.dataObjectGroupMapping)
                object['type'] = connectorType;
                object['type_text'] = this.dataObjectTypeMapping[connectorType];
                object['group'] = connectorGroup;
                object['group_text'] = this.dataObjectGroupMapping[connectorGroup];
                object['parameters'] = {};
                this.UPDATE_DATA_OBJECT({ObjectID: objectID, Object: object});
                this.activeConnectorType = connectorType;
                this.newPage({
                    typeCD: 200,
                    selName: 'New '+this.dataObjectTypeMapping[this.activeConnectorType]+' connector',
                    dataObjectTags: {'connector': objectID}
                });
                this.resetProcessViewCode();
            },
            newDataObject(existDataObjectID=null) {
                let newDataObjectID = 'do-'+(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
                let dataObjectID = existDataObjectID!==null ? existDataObjectID : newDataObjectID;
                this.UPDATE_DATA_OBJECT({
                    ObjectID: dataObjectID,
                    Object: {
                        'id': dataObjectID,
                        'type': this.activeConnectorType,
                        'tag': "connector",
                        'parameters': {}
                    }
                });
                this.dataObjectID = dataObjectID;
            },
            disableActive() {
                this.activeConnectorType = ''
            },
            resetProcessViewCode() {
                let displaySettings = R.clone(this.projectObjects.getPath(this.activeProcess+'.display_settings', {}))
                delete displaySettings['process_view'];
                this.UPDATE_DISPLAY_SETTINGS({
                    ObjectID: this.activeProcess,
                    displaySettings: displaySettings
                });
            }
        },
        computed: {
            ...mapState('proj', [
                'dataObjectDefinitions'
            ]),
            ...mapGetters('proj', [
                'dataObjects', 'dataObjectTypeMapping', 'dataObjectGroupMapping',
                'activeNode', 'activeProcess', 'activePage', 'projectObjects'
            ]),
            dataConnectorGroups() {
                let result = {};
                for (let dataType of this.dataObjectDefinitions["Data Connector"]["children"]) {
                    let filterCheck = this.dataObjectTypeMapping[dataType['type_cd']].toLowerCase().includes(this.connectorFilter.toLowerCase());
                    if (filterCheck || this.connectorFilter==='') {
                        (result[dataType["group_cd"]] = result[dataType["group_cd"]] || []).push(dataType['type_cd']);
                    }
                }
                return result
            },
            dataObject() {
                return this.dataObjects[this.dataObjectID]
            },
            activeFunction() {
                let result = {};
                for (let dataType of this.dataObjectDefinitions["Data Connector"]["children"]) {
                    if (this.activeConnectorType===dataType['type_name']) {
                        result = dataType.hasOwnProperty('function') ? dataType['function'] : {}
                    }
                }
                return result
            },
            activeFunctionKwargs() {
                return this.activeFunction.hasOwnProperty('parameters') ? this.activeFunction['parameters'] : []
            },
            projectObject() {
                return this.projectObjects[this.activePage]
            },
            displaySettings() {
                return this.projectObject['display_settings']
            }
        },
    };
</script>

<style src="./ConnectorForm.scss" lang="scss"></style>
