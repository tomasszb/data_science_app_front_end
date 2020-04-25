<template>
  <div class="projects-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        Data Science APP
        <i class="fa fa-circle text-success"></i>
      </h5>
      <Widget class="widget mx-auto" >
        <b-button class="text-left rounded-0" variant="default" href="main" block><i class="fa fa-file"/> New</b-button>
        <b-button class="text-left rounded-0" variant="default" block><i class="fa fa-folder-open"/> Open</b-button>
        <b-button class="text-left rounded-0" variant="default" block><i class="fa fa-sign-in"/> Import</b-button>
        <br>
        <br>
        <p class="d-block text-left">Open recent</p>
        <b-button class="text-left rounded-0" variant="light" @click="loadData()" block>Default</b-button>
      </Widget>
    </b-container>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import { mapActions} from 'vuex';

export default {
  name: 'ProjectManager',
  components: { Widget },
  computed: {
  },
  methods: {
    ...mapActions('api', ['loadProjectData']),
    loadData() {
      window.console.log('here');
      this.loadProjectData();
      window.console.log('there');
    },
  },
  created() {
    //this.loadProjectData();
  }
};
</script>

<style src="./ProjectManager.scss" lang="scss"></style>
