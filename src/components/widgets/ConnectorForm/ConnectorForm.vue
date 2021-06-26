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
    import {newDataLoadPage} from "@/core/newObjects/load";

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
            ...mapMutations('proj', ['UPDATE_DISPLAY_SETTINGS']),
            selectConnectorTypeGroup(connectorType, connectorGroup) {
                newDataLoadPage({
                    processID: this.activeProcess,
                    connectorType: connectorType
                });
                this.resetProcessViewCode();
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
