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
          return this.$store.state.proj.projectObjects
      },
      dataObjects () {
          return this.$store.state.proj.dataObjects
      },
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
