<template>
    <div>
        <CreateObjectGroup
                id="new-connector"
                :showGroups="true"
                :filterGroup="dsw_config.OBJ_DATA_CONNECTOR_CD"
                title="New Connector Settings"
                :objDefs="connDefinitions"
                @submit-data-object="alert('new-connector')"
        />
        <CreateObjectGroup
                id="settings-connector"
                :showGroups="false"
                :filterGroup="dsw_config.OBJ_DATA_CONNECTOR_CD"
                title="Connector Settings"
                :currentDataObject="activeConnectorSettings"
                :objDefs="connDefinitions"
                @submit-data-object="alert('settings-connector')"
        />
        <b-modal
                id="connector-explorer"
                title="Explore Database"
                size="lg"
                body-class="bg-white"
                hide-footer>
<!--            <v-client-table :data="data" :columns="columns" :options="options" />-->
        </b-modal>
    </div>
</template>

<script>
    import CreateObjectGroup from "../old/CreateObjectGroup/CreateObjectGroup";
    import dsw_config from "../../dsw_config";
    import {mapState, mapGetters} from "vuex";
    import project_store from "../../store/modules/proj";

    export default {
        name: "DataConnectionModals",
        components: {CreateObjectGroup},
        computed: {
            ...mapState('proj', ['dataObjectDefinitions']),
            ...mapGetters('proj', ['activeElement', 'dataObjects', 'projectObjects']),
            dsw_config() {
                return dsw_config;
            },
            activeConnectorSettings() {
                // return this.dataObjects[this.projectObjects[this.activeElement]['parameters']['connector_id']]
            },
            connDefinitions() {
                let defs = this.dataObjectDefinitions.filter(function (el) {
                    return el['type']===dsw_config.OBJ_DATA_CONNECTOR_CD
                });
                return defs[0].children
            }
        }
    }
</script>

<style scoped>

</style>
