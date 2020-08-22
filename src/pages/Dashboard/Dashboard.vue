<template>
    <div class="dashboard-page">
        <div>
            {{ projectObjects }}
        </div>
        <hr>
        <div>
            {{ dataObjects }}
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
      name: 'Dashboard',
      computed: {
          ...mapGetters('proj', ['projectObjects', 'dataObjects']),
      }
    };
</script>

<style src="./Dashboard.scss" lang="scss" />
