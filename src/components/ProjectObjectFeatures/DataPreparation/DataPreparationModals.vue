<template>
    <div>
        {{prepDefinitions}}
        <CreateObjectGroup
                id="new-data-prep"
                :showGroups="true"
                :filterGroup="dsw_config.OBJ_ACTION_CD"
                title="New Action Settings"
                :objDefs="prepDefinitions"
                selGroup="NewColumn"
                @submit-data-object="alert('new-data-prep')"
        />
    </div>
</template>

<script>
    import CreateObjectGroup from "../../../components/AppFeatures/CreateObjectGroup/CreateObjectGroup";
    import dsw_config from "../../../dsw_config";
    import {mapState, mapGetters} from "vuex";

    export default {
        name: "DataConnectionModals",
        components: {CreateObjectGroup},
        computed: {
            ...mapState('proj', ['dataObjectDefinitions']),
            ...mapGetters('proj', ['activeElement', 'dataObjects', 'projectObjects']),
            dsw_config() {
                return dsw_config;
            },
            activeActionSettings() {
                return this.dataObjects[this.projectObjects[this.activeElement]['parameters']['action_id']]
            },
            prepDefinitions() {
                let defs = this.dataObjectDefinitions.filter(function (el) {
                    return el['type']===dsw_config.OBJ_ACTION_CD
                });
                return defs[0].children
            }
        }
    }
</script>

<style scoped>

</style>