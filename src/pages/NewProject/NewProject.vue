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
            {{project.status}}
        </div>
    </b-container>
  </div>
</template>

<script>
import Widget from '@/components/layout/Widget/Widget';
import {mapActions, mapMutations, mapState} from 'vuex';
import router from '../../Routes';
const R = require('ramda');
import { createProjectFlowRequest, getResultObjectID } from '@/core/projectManager';

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
        ...mapState('proj', ['projectList', 'project', 'projectExecutionStatus']),
          newProjectData() {
            return {
                "name": this.name,
                "notebook": this.notebookCheck,
                "python": this.pythonCheck
            }
          },
          createFoldersStatus() {
            let resultID = getResultObjectID([this.project.id, "create_new_project_folders"]);
            let status = this.projectExecutionStatus[resultID];
            return typeof status!=='undefined'? status : 'not_requested'

          }
    },
    methods: {
        ...mapActions('proj/api', ['createNewProject']),
        ...mapMutations('proj', ['SET_PROJECT_VARIABLE']),
        newProject(project) {
            localStorage.removeItem('project_id');
            localStorage.removeItem('version_number');
          this.createNewProject({data: this.newProjectData} );
        }
    },
    watch:{
        project(value) {
            if (value.status ==='project registered') {
                let request = createProjectFlowRequest(
                    ["create_new_project_folders"],
                    [this.project.parameters],
                    this.project.id
                )
                this.$webSocketSend(request);
            }
            if (value.status === 'ready') {
                router.push('/app/main');
            }
        },
        createFoldersStatus(value) {
            if (value === 'running') {
                let project = R.clone(this.project)
                project.status = 'creating folder structure'
                this.SET_PROJECT_VARIABLE(project)
            }
            if (value === 'success') {
                let project = R.clone(this.project)
                project.status = 'ready'
                this.SET_PROJECT_VARIABLE(project)
            }
        }
    }

};
</script>

<style src="./NewProject.scss" lang="scss"></style>
