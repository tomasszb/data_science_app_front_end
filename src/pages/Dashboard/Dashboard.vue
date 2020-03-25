<template>
    <div class="dashboard-page">
        {{ projectData }}
    </div>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    projectData () {
        return this.$store.state.api.projectData
    }
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
