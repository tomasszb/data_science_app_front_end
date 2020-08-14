<template>
    <div>
        <CreateObjectGroup
                id="new-connector"
                :showGroups="true"
                :filterGroup="selectedElement['group']"
                title="New Connector Settings"
                :objDefs="defConnectors"
                selGroup="SQLConnector"
                @submit-data-object="newDataObject"
        />
        <CreateObjectGroup
                id="settings-connector"
                :showGroups="false"
                :filterGroup="selectedElement['group']"
                title="Connector Settings"
                :currentDataObject="selectedElement"
                :objDefs="defConnectors"
                selGroup="SQLConnector"
                @submit-data-object="updateDataObject"
        />
        <b-modal
                id="connector-explorer"
                title="Explore Database"
                size="lg"
                body-class="bg-white"
                hide-footer>
            <v-client-table :data="data" :columns="columns" :options="options" />
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: "DataConnectionModals"
    }
</script>

<style scoped>

</style>