<template>
    <div class="connector-explorer flex-horizontal-no-scroll">
        <div class="connector-explorer-panel flex-vertical">
            <div class="connector-explorer-title">
                <div class="title">Connector</div>
                {{dataObjectID}}
                <b-form-group>
                    <b-form-input
                            id="transparent-field"
                            class="input-no-border input-sm"
                            type="text"
                            autocomplete="off"
                            v-model="connectorFilter"
                            placeholder="Find Connector">
                    </b-form-input>
                </b-form-group>
            </div>
            <div class="connector-type-picker">
                <div v-for="(connectorTypes, connectorGroup) in dataConnectorGroups">
                    <div class="connector-type-header">{{dataObjectGroupMapping[connectorGroup]}}</div>
                    <div v-for="connectorType in connectorTypes">
                        <div
                                class="connector-name"
                                :class="{'active': activeConnectorType===connectorType}"
                                @click="selectConnectorTypeGroup(connectorType, connectorGroup) ">
                            {{dataObjectTypeMapping[connectorType]}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="connector-explorer-form" :class="{hidden: activeConnectorType===''}">
            <div class="title">
                {{dataObjectTypeMapping[activeConnectorType]}}
            </div>
            <div class="connector-kwargs">
                <!--                {{activeFunctionKwargs}}-->
                <b-form-group
                        horizontal
                        class="connector-name-form"
                        label-class="text-md-right"
                >
                    <b-form-input
                            placeholder="Connector Name"
                            type="text"
                            v-model="elementName"
                            id="connector-name"
                            autocomplete="off"
                            size="md"
                            class="bg-gray-lighter"/>
                </b-form-group>
                <data-object-settings
                        :dataObjectID="dataObjectID"
                        :horizontal="true"
                />

            </div>
            <div class="footer">
                <div class="text-md-right mt-sm">
                    <b-button variant="gray" class="mr-3 width-100">Test</b-button>
                    <b-button variant="warning" class="width-100" @click="saveConnector">Save</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
    import DataObjectSettings from "../../layout/DataObjectSettings/DataObjectSettings";
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'ConnectorForm',
        components: {
            DataObjectSettings, draggable
        },
        data() {
          return {
              connectorFilter: '',
              activeConnectorType: '',
              elementName: '',
          }
        },
        props: {
            objectType: { type: String, default: null },
            type: { type: String, default: null },
            dataObjectID: { type: String, default: '' },
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DATA_OBJECT'
            ]),
            ...mapActions('proj/object_manager', [
                'newPage'
            ]),
            selectConnectorTypeGroup(connectorType, connectorGroup) {
                let objectID = this.dataObjectID;
                let object = R.clone(this.dataObjects[objectID]);
                object['type'] = connectorType;
                object['type_text'] = this.dataObjectTypeMapping[connectorType];
                object['group'] = connectorGroup;
                object['group_text'] = this.dataObjectGroupMapping[connectorGroup];
                object['parameters'] = {};
                this.UPDATE_DATA_OBJECT({ObjectID: objectID, Object: object});
                this.activeConnectorType = connectorType;
            },
            disableActive() {
                this.activeConnectorType = ''
            },
            saveConnector() {
                if (this.type==='new') {
                    this.newPage({
                        typeCD: 200,
                        selName: this.elementName,
                        dataObjectTags: {'connector': this.dataObjectID}
                    });
                }
                this.$bvModal.hide('new-connector-explorer');
                this.$bvModal.hide('existing-connector-explorer');
            }
        },
        computed: {
            ...mapState('proj', [
                'dataObjectDefinitions'
            ]),
            ...mapGetters('proj', [
                'dataObjects', 'dataObjectTypeMapping', 'dataObjectGroupMapping', 'activeNode', 'activeProcess', 'activePage', 'dataObjects'
            ]),
            dataConnectorGroups() {
                let result = {};
                for (let dataType of this.dataObjectDefinitions["Data Connector"]["children"]) {
                    let filterCheck = this.dataObjectTypeMapping[dataType['type_cd']].toLowerCase().includes(this.connectorFilter);
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
            }
        },
        mounted() {
            if (this.dataObject.type) {
                this.activeConnectorType = this.dataObject.type;
            }

        }
    };
</script>

<style src="./ConnectorForm.scss" lang="scss"></style>
