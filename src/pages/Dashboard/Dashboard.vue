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



    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
      name: 'Dashboard',
      computed: {
          ...mapGetters('proj', ['projectObjects', 'dataObjects']),
          ...mapState('proj', ['projectObjectStatuses', 'dataFrames'])
      }
    };
</script>

<style src="./Dashboard.scss" lang="scss" />
