<template>
    <div>
        <b-modal
                id="new-connector-explorer"
                title="Explore Database"
                size="lg"
                @hide="disableActive"
                @show="newDataObject(existDataObjectID=null)"
                body-class="flex-horizontal"
                no-fade
                hide-footer
                hide-header>
            <connector-form :dataObjectID="dataObjectID"/>
        </b-modal>
        <b-modal
                id="existing-connector-explorer"
                title="Explore Database"
                size="lg"
                @hide="disableActive"
                body-class="flex-horizontal"
                no-fade
                hide-footer
                hide-header>
            <connector-form/>
        </b-modal>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
    import ConnectorForm from "../ConnectorForm/ConnectorForm";
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'ConnectorExplorer',
        components: {
            ConnectorForm, draggable
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
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DATA_OBJECT'
            ]),
            ...mapActions('proj/object_manager', [
                'newPage'
            ]),
            disableActive() {
                // this.activeConnectorType = ''
            },
            newDataObject(existDataObjectID=null) {
                let newDataObjectID = 'do-'+(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
                let dataObjectID = existDataObjectID!==null ? existDataObjectID : newDataObjectID;
                this.UPDATE_DATA_OBJECT({
                    ObjectID: dataObjectID,
                    Object: {
                        'id': dataObjectID,
                        'type': this.activeConnectorType,
                        'parameters': {}
                    }
                });
                this.dataObjectID = dataObjectID;
            }
        }
    };
</script>

<style src="./ConnectorExplorer.scss" lang="scss"></style>
