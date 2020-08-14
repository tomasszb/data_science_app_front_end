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
            iconName="flaticon-home"
            index="main"
            isHeader
        />
        <h5 class="navTitle">PROJECT Overview</h5>
        <NavLink v-for="process in projectProcesses"
                :key="'po-'+process.id"
                :activeItem="activeItem"
                :header="process.name"
                :link="'/app/'+process.link+'/'+process.id"
                :iconName="process.sideIcon"
                index="conn"
                isHeader
        />
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';
import dsw_config from "../../../dsw_config";

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'danger',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'primary',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
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
    window.console.log('here');
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
    projectObjectSettings () {
      return dsw_config.projectObjectSettings
    },
    projectObjects () {
      return this.$store.state.proj.projectObjects
    },
    projectProcesses () {
      let processes = [];
      for (let id in this.projectObjects) {
        if (this.projectObjects[id].group==1) {
          let processAPI = this.projectObjects[id];
          let process = Object.assign({}, processAPI, this.projectObjectSettings[processAPI.type]);
          processes.push(process);
        }
      };
      return processes
    }
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
