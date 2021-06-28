<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <router-link to="/app/main/analytics"><span class="primary-word">Data Science</span> App</router-link>
      </header>
      <ul class="nav">
        <NavLink
            :activeItem="activeItem"
            header="Project Manager"
            link="/app/main"
            iconName="fa-cogs"
            index="main"
            isHeader
        />
        <h5 class="navTitle">
            PROJECT Overview
        </h5>
        <NavLink v-for="process in projectProcesses"
                :key="'po-'+process.id"
                :activeItem="activeItem"
                :header="process.name"
                :link="'/app/'+process.link+'/'+process.id"
                :iconName="process.sideIcon"
                index="conn"
                isHeader
        />
        <li class="headerLink mt-3" v-b-modal="'new-process'">
            <a class="sidebar-link text-warning small font-weight-bold">
                <span class="icon">
                    <i class="fa fa-plus"></i>
                </span>
                    add new
            </a>
        </li>
          <b-modal
              id="new-process"
              headerClass="new-process-modal-header"
              title="New process"
              body-bg-variant="white"
          >
              <div class="d-flex justify-content-start">
                  <b-form-select
                      v-model="newProcessType"
                      :options="processTypes"
                      size="sm"
                      class="c-30 mr-3 d-inline-block"
                  ></b-form-select>
                  <b-form-input
                      placeholder="Name"
                      v-model="newProcessName"
                      size="sm"
                      class="d-inline-block"
                  ></b-form-input>
              </div>

              <template v-slot:modal-footer>
                  <b-button @click="newProcess()" class="btn load-data-button btn-gray btn-sm rounded-0" variant="primary">Create process</b-button>
              </template>
          </b-modal>
      </ul>
    </nav>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from '../../ui/NavLink/NavLink';
import dsw_config from "../../../dsw_config";
import {newDataVisualizationProcess} from "@/core/newObjects/visualize";

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
        newProcessName: "",
        newProcessType: 101,
        processTypes: [
            { value: 101, text: 'Prepare' },
            { value: 103, text: 'Visualize' }
        ]
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    newProcess() {
        if (this.newProcessType === 103) {
            newDataVisualizationProcess({name: this.newProcessName})
        }
        this.newProcessType = 101;
        this.newProcessName = ""
    },
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
    ...mapGetters('proj', ['projectObjects', 'processList']),
    projectObjectSettings () {
      return dsw_config.projectObjectSettings
    },
    projectProcesses () {
      let processes = [];
      for (let id of this.processList) {
        let processAPI = this.projectObjects[id];
        let process = Object.assign({}, processAPI, this.projectObjectSettings[processAPI.type]);
        processes.push(process);
      };
      return processes
    }
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
<style src="./Sidebar2.scss" lang="scss"/>