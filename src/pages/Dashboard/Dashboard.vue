<template>
    <div class="dashboard-page">
        <div>
            {{ projectProcesses }}
        </div>
        <hr>
        <div>
            {{ projectPages }}
        </div>
        <hr>
        <div>
            {{ projectNodes }}
        </div>
        <hr>
        <div>
            {{ projectElements }}
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
      projectData () {
          return this.$store.state.api.projectData
      },
      projectProcesses () {
          return this.$store.state.api.projectProcesses
      },
      projectPages () {
          return this.$store.state.api.projectPages
      },
      projectNodes () {
          return this.$store.state.api.projectNodes
      },
      projectElements () {
          return this.$store.state.api.projectElements
      },
      dataObjects () {
          return this.$store.state.api.dataObjects
      },
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
