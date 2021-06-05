<template>
<div
        v-if="this.dataLoaded"
        :class="[{root: true, sidebarClose, sidebarStatic}, 'sing-dashboard', 'sidebar-' + sidebarColorName, 'sidebar-' + sidebarType]">
  <Sidebar />
  <div class="wrap">
<!--    <ToolHeader />-->
    <v-touch class="content" @swipe="handleSwipe" :swipe-options="{direction: 'horizontal'}">

        <router-view />

    </v-touch>
  </div>
</div>
</template>

<script>
    import { mapState, mapActions} from "vuex";

import Sidebar from '@/components/layout/Sidebar/Sidebar';



export default {
    name: 'Layout',
    components: { Sidebar },
    methods: {
        ...mapActions('proj/api', ['loadObjectDefinitions', 'loadProjectData', 'loadProjectList']),
        ...mapActions('websocket', ['websocketConnect']),
        ...mapActions('layout', ['switchSidebar', 'handleSwipe', 'changeSidebarActive', 'toggleSidebar']),
        handleWindowResize() {
          const width = window.innerWidth;

          if (width <= 768 && this.sidebarStatic) {
            this.toggleSidebar();
            this.changeSidebarActive(null);
          }
        },
        wsConnect (projectID) {
            let url = "ws://127.0.0.1:8000/ws/dsw_engine/" + projectID + "/";
            this.$webSocketConnect({"url": url})
        },
        wsDisconnect () {
            this.$webSocketDisconnect()
        }
    },
    computed: {
        ...mapState('proj', ['projectData', 'project']),
        ...mapState('proj', ['dataLoaded']),
        ...mapState('layout', ["sidebarClose", "sidebarStatic", "sidebarColorName", "sidebarType"]),
    },

    created() {
        let projectID = this.project.id;
        let projectVersion= 1;
        if (projectID != null && projectVersion != null) {
            this.loadProjectData({projectID: projectID, projectVersion: projectVersion});
            this.loadObjectDefinitions();
        }
        const staticSidebar = JSON.parse(localStorage.getItem('sidebarStatic'));

        if (staticSidebar) {
          this.$store.state.layout.sidebarStatic = true;
        } else if (!this.sidebarClose) {
          setTimeout(() => {
            this.switchSidebar(true);
            this.changeSidebarActive(null);
          }, 2500);
        }

        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
        // this.wsConnect(projectID);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleWindowResize);
    },
    destroyed() {
        // this.wsDisconnect();
    }
};
</script>

<style src="./Layout.scss" lang="scss" />
