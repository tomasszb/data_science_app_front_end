<template>
  <div class="projects-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        Data Science APP
        <i class="fa fa-circle text-success"></i>
      </h5>
      <Widget class="widget mx-auto" >
        <b-button class="text-left rounded-0" variant="default" href="#/new" block><i class="fa fa-file"/> New</b-button>
        <b-button class="text-left rounded-0" variant="default" block><i class="fa fa-folder-open"/> Open</b-button>
        <b-button class="text-left rounded-0" variant="default" block><i class="fa fa-sign-in"/> Import</b-button>
        <br>
        <br>
        <p class="d-block text-left">Open recent</p>
        <b-button
                :key="'p-'+project.id"
                v-for="project in projectList"
                class="text-left rounded-0"
                variant="light"
                @click="openProject(project)"
                block>
          {{project.name}}
        </b-button>
      </Widget>

    </b-container>
  </div>
</template>

<script>
import Widget from '@/components/layout/Widget/Widget';
import { mapActions, mapState} from 'vuex';
import router from '../../Routes';

export default {
  name: 'ProjectManager',
  components: { Widget },
  computed: {
    ...mapState('proj', ['projectList']),
  },
  methods: {
    ...mapActions('proj/api', ['loadProjectData', 'loadProjectList']),
    openProject(project) {
        let projectID = project.id;
        let projectVersion = project.version;
        localStorage.setItem('project_id', projectID);
        localStorage.setItem('project_version', projectVersion);


      this.loadProjectData({projectID: projectID, projectVersion: projectVersion});
      router.push('/app/main');
    }
  },
  created() {
    //this.loadProjectData();
  },
  mounted() {
    this.loadProjectList();
  }
};
</script>

<style src="./ProjectManager.scss" lang="scss"></style>
