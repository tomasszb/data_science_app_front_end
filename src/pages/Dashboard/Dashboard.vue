<template>
    <div class="dashboard-page">
        <h3>Project Objects</h3><hr><div>{{ projectObjects }}</div><br>
        <h3>Data Objects</h3><hr><div>{{ dataObjects }}</div><br>
        <h3>Node Signatures</h3><hr><div>{{ nodeSignatures }}</div><br>
        <h3>Data Object Parameters</h3><hr><div>{{ dataObjectParameterMapping }}</div><br>
        <h3>Objects Statuses</h3><hr><div>{{ nodeExecutionStatus }}</div><br>
        <h3>Data Object Type Mapping</h3><hr><div>{{ dataObjectTypeMapping }}</div><br>
        <h3>Data Object Group Mapping</h3><hr><div>{{ dataObjectGroupMapping }}</div><br>
        <h3>Dataframes</h3><hr><div>{{ dataFrames }}</div><br>
        <br>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
      name: 'Dashboard',
      computed: {
          ...mapGetters('proj', ['projectObjects', 'dataObjects', 'dataObjectTypeMapping', 'dataObjectGroupMapping',
              'dataObjectParameterMapping', 'nodeSignatures']),
          ...mapState('proj', ['projectObjectStatuses', 'dataFrames', 'dataObjectDefinitions', 'dataFrames', 'nodeExecutionStatus'])
      }
    };
</script>

<style src="./Dashboard.scss" lang="scss" />
