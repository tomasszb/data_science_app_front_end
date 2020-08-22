<template>
<div
        v-if="this.dataLoaded"
        :class="[{root: true, sidebarClose, sidebarStatic}, 'sing-dashboard', 'sidebar-' + sidebarColorName, 'sidebar-' + sidebarType]">
  <Sidebar />
  <div class="wrap">
<!--    <Header />-->
    <v-touch class="content" @swipe="handleSwipe" :swipe-options="{direction: 'horizontal'}">

        <router-view />

    </v-touch>
  </div>
</div>
</template>

<script>
    import { mapState, mapActions} from "vuex";

import Sidebar from '@/components/AppFeatures/Sidebar/Sidebar';
import Header from '@/components/AppFeatures/Header/Header';
import Toolbar from '@/components/AppFeatures/Toolbar/Toolbar';



export default {
    name: 'Layout',
    components: { Sidebar, Header, Toolbar },
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
        wsConnect () {
            let url = "ws://127.0.0.1:8000/ws/dsw_engine/" + this.projectData.project_id + "_" +this.projectData.owner_id+"/";
            this.$webSocketConnect({"url": url})
        },
        wsDisconnect () {
            this.$webSocketDisconnect()
        }
    },
    computed: {
        ...mapState('proj', ['projectData']),
        ...mapState('proj', ['dataLoaded']),
        ...mapState(["sidebarClose", "sidebarStatic", "sidebarColorName", "sidebarType"]),
    },

    created() {
        let projectID = localStorage.getItem('project_id');
        let projectVersion= localStorage.getItem('project_version');
        this.loadProjectData({projectID: projectID, projectVersion: projectVersion});
        this.loadObjectDefinitions();

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
        this.wsConnect();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleWindowResize);
    },
    destroyed() {
        this.wsDisconnect();
    }
};
</script>

<style src="./Layout.scss" lang="scss" />
