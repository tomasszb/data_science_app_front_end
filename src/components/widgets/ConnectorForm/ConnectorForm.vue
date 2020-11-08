<template>
    <b-modal
            id="connector-explorer"
            title="Explore Database"
            size="lg"
            @hide="disableActive"
            body-class="flex-horizontal"
            no-fade
            hide-footer
            hide-header>
        <div class="connector-explorer-panel flex-vertical">
            <div class="connector-explorer-title">
                <div class="title">Connector</div>
                <b-form-group>
                    <b-form-input
                            id="tranparent-field"
                            class="input-no-border input-sm"
                            type="text"
                            autocomplete="off"
                            v-model="connectorFilter"
                            placeholder="Find Connector">
                    </b-form-input>
                </b-form-group>
            </div>
            <div class="connector-type-picker">
                <div v-for="(connectorSubTypes, connectorType) in dataConnectorTypes">
                    <div class="connector-type-header">{{connectorType}}</div>
                    <div v-for="connectorSubType in connectorSubTypes">
                        <div
                                class="connector-name"
                                :class="{'active': activeConnectorSubType===connectorSubType}"
                                @click="selectConnectorSubType(connectorSubType)">
                            {{connectorSubType}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="connector-explorer-form flex-vertical" :class="{hidden: activeConnectorSubType===''}">
            <div class="title">
                {{activeConnectorSubType}}
            </div>
            <div class="connector-kwargs">
<!--                {{activeFunctionKwargs}}-->
                <b-form-group
                        horizontal
                        class="connector-name-form"
                        label=""
                        label-for="connector-name"
                        label-class="text-md-right"
                        :label-cols="4"
                >
                    <b-form-input
                            placeholder="Name"
                            type="text"
                            id="connector-name"
                            autocomplete="off"
                            size="md"
                            class="bg-gray-lighter"/>
                </b-form-group>

                <b-form-group
                        v-for="(kwarg, i) in activeFunctionKwargs"
                        horizontal
                        :key="'connector-kwargs-'+activeNode+'-'+i"
                        :label="kwarg['name']"
                        :label-for="'connector-kwargs-'+activeNode+'-'+i"
                        label-class="text-md-right"
                        :label-cols="4"
                >
                    <b-form-input type="text" :id="'connector-kwargs-'+activeNode+'-'+i" autocomplete="off" size="md"/>
                </b-form-group>
            </div>
            <div class="footer">
                <div class="text-md-right mt-sm">
                    <b-button variant="gray" class="mr-3 width-100">Test</b-button>
                    <b-button variant="warning" class="width-100">Save</b-button>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ObjectSelector from "../ObjectSelector/ObjectSelector"
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'ConnectorForm',
        components: {
            ObjectSelector, draggable
        },
        data() {
          return {
              connectorFilter: '',
              activeConnectorSubType: ''
          }
        },
        props: {
            objectType: { type: String, default: null },
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            selectConnectorSubType(connectorSubType) {
                this.activeConnectorSubType = connectorSubType
            },
            disableActive() {
                this.activeConnectorSubType = ''
            }
        },
        computed: {
            ...mapState('proj', [
                'dataObjectDefinitions', 'activeNode'
            ]),
            dataConnectorTypes() {
                let result = {};
                for (let dataType of this.dataObjectDefinitions["Data Connector"]["children"]) {
                    let filterCheck = dataType['type_name'].toLowerCase().includes(this.connectorFilter);
                    if (filterCheck || this.connectorFilter==='') {
                        (result[dataType["group_name"]] = result[dataType["group_name"]] || []).push(dataType['type_name']);
                    }
                }
                return result
            },
            activeFunction() {
                let result = {};
                for (let dataType of this.dataObjectDefinitions["Data Connector"]["children"]) {
                    if (this.activeConnectorSubType===dataType['type_name']) {
                        result = dataType.hasOwnProperty('function') ? dataType['function'] : {}
                    }
                }
                return result
            },
            activeFunctionKwargs() {
                return this.activeFunction.hasOwnProperty('parameters') ? this.activeFunction['parameters'] : []
            }
        }
    };
</script>

<style src="./ConnectorForm.scss" lang="scss"></style>
