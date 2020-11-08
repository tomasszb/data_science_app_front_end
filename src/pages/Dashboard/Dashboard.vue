<template>
    <div class="dashboard-page">
        <div>
            {{ projectObjects }}
        </div>
        <hr>
        <div>
            {{ dataObjects }}
        </div>
        <hr>
        <div>
            {{ projectObjectStatuses }}
        </div>
        <hr>
        <div>
            {{ dataObjectTypeMapping }}
        </div>
        <hr>
        <div>
            {{ dataObjectGroupMapping }}
        </div>



    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
      name: 'Dashboard',
      computed: {
          ...mapGetters('proj', ['projectObjects', 'dataObjects', 'dataObjectTypeMapping', 'dataObjectGroupMapping']),
          ...mapState('proj', ['projectObjectStatuses', 'dataFrames', 'dataObjectDefinitions'])
      }
    };
</script>

<style src="./Dashboard.scss" lang="scss" />
