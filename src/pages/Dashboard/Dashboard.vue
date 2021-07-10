<template>
    <div class="dashboard-page">
        <h3>Project Objects</h3><hr><div>{{ projectObjects }}</div><br>
        <h3>Data Objects</h3><hr><div>{{ dataObjects }}</div><br>
        <h3>Project Data Tree</h3><hr><div>{{ ProjectDataTree }}</div><br>
        <h3>Active Objects</h3><hr>
            <div>processList:{{ processList }}</div><br>
            <div>pageLists:{{ pageLists }}</div><br>
            <div>nodeLists:{{ nodeLists }}</div><br>
            <div>activeProcess:{{ activeProcess }}</div><br>
            <div>activePage:{{ activePage }}</div><br>
            <div>activeNode:{{ activeNode }}</div><br>
        <h3>Node Signatures</h3><hr><div>{{ nodeSignatures }}</div><br>
        <h3>Data Object Parameters</h3><hr><div>{{ dataObjectParameterMapping }}</div><br>
        <h3>Objects Statuses</h3><hr><div>{{ nodeExecutionStatus }}</div><br>
        <h3>Data Object Type Mapping</h3><hr><div>{{ dataObjectTypeMapping }}</div><br>
        <h3>Data Object Group Mapping</h3><hr><div>{{ dataObjectGroupMapping }}</div><br>
        <h3>Dataframes</h3><hr><div>{{ dataFrames.keys }}</div><br>
        <br>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    const VueScrollTo = require('vue-scrollto');

    export default {
      name: 'Dashboard',
        directives: {
            scrollTo: VueScrollTo
        },
      computed: {
          ...mapGetters('proj', ['projectObjects', 'dataObjects', 'dataObjectTypeMapping', 'dataObjectGroupMapping',
              'dataObjectParameterMapping', 'nodeSignatures', 'ProjectDataTree',
              'processList', 'pageLists', 'nodeLists',
              'activeProcess', 'activePage', 'activeNode'
          ]),
          ...mapState('proj', ['projectObjectStatuses', 'dataObjectDefinitions', 'dataFrames', 'nodeExecutionStatus'])
      }
    };
</script>

<style src="./Dashboard.scss" lang="scss" />
