<template>
    <div class="content">
        <div v-if="processType===this.dsw_config.LOAD_PROCESS_CD" class="flex-vertical">
            <tool-header></tool-header>
            <div class="flex-horizontal">
                <nav-sidebar :defaultWidth="200" settingPrefix="conn">
                    <connectorbar></connectorbar>
                </nav-sidebar>
                <div class="flex-vertical">
                    <main-content>
                        <DataTable/>
                    </main-content>
                    <tool-footer>
                        <sheetbar objectType="node"></sheetbar>
                    </tool-footer>
                </div>
            </div>
        </div>
        <div v-if="processType===this.dsw_config.DATA_PREPARATION_PROCESS_CD" class="flex-vertical">
            <tool-header></tool-header>
            <div class="flex-vertical">
                <div class="flex-horizontal">
                    <nav-sidebar :defaultWidth="450" settingPrefix="prep"></nav-sidebar>
                    <main-content>
                        <div>

                        <br><br>
                        </div>
                    </main-content>
                </div>
                <tool-footer>
                    <sheetbar objectType="page"></sheetbar>
                </tool-footer>
            </div>
        </div>
        <div v-if="processType===this.dsw_config.DATA_VIS_PROCESS_CD" class="flex-vertical">
            <tool-header></tool-header>
            <div class="flex-vertical">
                <div class="flex-horizontal">
                    <nav-sidebar :defaultWidth="200" settingPrefix="column"></nav-sidebar>
                    <nav-sidebar :defaultWidth="300" settingPrefix="chart"></nav-sidebar>
                    <main-content></main-content>
                </div>
                <tool-footer>
                    <sheetbar objectType="node"></sheetbar>
                </tool-footer>
            </div>
        </div>
    </div>

</template>

<script>

import NavSidebar from "../../components/layout/NavSidebar/NavSidebar"
import ToolHeader from "../../components/layout/ToolHeader/ToolHeader"
import ToolFooter from "../../components/layout/ToolFooter/ToolFooter"
import MainContent from "../../components/layout/MainContent/MainContent"
import DataTable from "../../components/widgets/DataTable/DataTable"
import Sheetbar from "../../components/widgets/Sheetbar/Sheetbar"
import Connectorbar from "../../components/widgets/Connectorbar/Connectorbar"

import { mapState, mapGetters, mapActions} from "vuex";
import { initProjectBranches, initProcessBranches, createFlowRequest, getUpstreamElements } from '@/core/projectManager';
import dsw_config from "../../dsw_config";

export default {
    name: 'Process',
    components: {
        Connectorbar,
        NavSidebar, ToolHeader, ToolFooter,
        DataTable, MainContent,
        Sheetbar
    },
    data() {
        return {
            request: null
        }
    },
    methods: {
        ...mapActions('proj/object_manager',['setActivePO'])
    },
    computed: {
        ...mapState('proj', [
            'projectData',
            'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements'
        ]),
        ...mapGetters('proj', [
            'projectObjects', 'dataObjects', 'ProjectTree',
            'processList', 'pageLists', 'nodeLists', 'elementLists',
            'activeProcess', 'activePage', 'activeNode', 'activeElement'
        ]),
        processID() {
            return this.$route.params.id
        },
        processType () {
            return this.projectObjects[this.processID].type
        },
        dsw_config() {
            return dsw_config
        }
    },
    directives: {
        focus: {
            inserted (el) {
                el.focus()
            }
        }
    },
    watch: {
        processID: function (value) {
            this.setActivePO({
                selectedProcess:value,
                selectedPage:null,
                selectedNode:null,
                selectedElement:null
            });
        }
    }
};
</script>

<style src="./Process.scss" lang="scss"></style>

