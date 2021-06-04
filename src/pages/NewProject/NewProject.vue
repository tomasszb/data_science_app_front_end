<template>
  <div class="projects-page">
    <b-container>
      <h5 class="auth-logo">
          <i class="fa fa-circle text-success"></i>
            Create New Project
          <i class="fa fa-circle text-success"></i>
      </h5>
      <Widget class="widget mx-auto new-project-form" >
          <b-form-group
              horizontal
              class="mb-4"
              label="Name:"
              label-for="new-project-file"
              label-cols-sm="2"
              label-size="md"
              label-class="text-md-left"
          >
              <b-form-input type="text" id="new-project-file" size="sm" placeholder="Project Name" v-model="name"/>
          </b-form-group>

          <b-form-group class="abc-checkbox mb-3">
              <input type="checkbox" id="new-project-jupyter-check" v-model="notebookCheck"/>
              <label class="pl-3" for="new-project-jupyter-check">Notebooks</label>
          </b-form-group>

          <b-form-group class="abc-checkbox mb-5">
              <input type="checkbox" id="new-project-python-check" v-model="pythonCheck"/>
              <label class="pl-3" for="new-project-python-check">Python scripts</label>
          </b-form-group>
          <hr>
          <a class="fa fa-chevron-left" href="#/projects"></a>
          <b-button variant="info" size="sm" class="px-4 float-right" @click="newProject"><strong>Create</strong></b-button>

          <br>
        <br>
      </Widget>
        <div class="text-center mt-3">
            {{project.id}}
            {{project.status}}
        </div>
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
    data() {
      return {
          inputFiles: [],
          name: "",
          notebookCheck: true,
          pythonCheck: true
        }
    },
  computed: {
    ...mapState('proj', ['projectList', 'project']),
      newProjectData() {
        return {
            "name": this.name,
            "notebook": this.notebookCheck,
            "pythonCheck": this.pythonCheck
        }
      }
  },
  methods: {
    ...mapActions('proj/api', ['createNewProject']),
    newProject(project) {
        localStorage.removeItem('project_id');
        localStorage.removeItem('project_version');
        this.status = 'creating project structure'
      this.createNewProject({data: this.newProjectData} );
    }
  }
};
</script>

<style src="./NewProject.scss" lang="scss"></style>
