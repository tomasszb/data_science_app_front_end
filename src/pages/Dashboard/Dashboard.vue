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
export default {
  name: 'Dashboard',
  computed: {
      projectObjects () {
          return this.$store.state.api.projectObjects
      },
      dataObjects () {
          return this.$store.state.api.dataObjects
      },
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
