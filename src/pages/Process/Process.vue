<template>
    <div class="content">
        <div v-if="processType===this.dsw_config.LOAD_PROCESS_CD" class="flex-vertical" :key="processKey">
            <tool-header></tool-header>
            <div class="flex-horizontal">
                <nav-sidebar :defaultWidth="400" :minWidth="250" :maxWidth="700" settingPrefix="conn">
                    <connectorbar></connectorbar>
                </nav-sidebar>
                <div class="flex-vertical-no-scroll">
                    <main-content>
                        <template v-slot:node-view-selector>
                            <node-view-selector/>
                        </template>
                        <DataTable
                            v-if="pageDisplayTag===1"
                            :key="processKey + activeNode +  '-data-table'"
                            :nodeID="activeNode"
                        />
                        <DataColumnExplorer
                            v-if="pageDisplayTag===2"
                            :key="processKey + activeNode  + '-data-column-explorer'"
                            :nodeID="activeNode"
                        />
                        <QueryEditor
                            v-if="pageDisplayTag===3"
                            tag="run_query"
                            :key="processKey + activeNode  + '-data-query-editor'"
                            :objectID="activeNode"
                        />

                    </main-content>
                    <tool-footer v-show="activeConnectorGroup === 1000">
                        <sheetbar objectType="node" :defaultWidth="700" :minWidth="600" :maxWidth="1000"  settingPrefix="conn"></sheetbar>
                    </tool-footer>
                </div>
            </div>

        </div>
        <div v-if="processType===this.dsw_config.DATA_PREPARATION_PROCESS_CD" class="flex-vertical" :key="processKey">
            <tool-header></tool-header>
<!--            <div class="flex-vertical">-->
                <div class="flex-horizontal">
                    <nav-sidebar :defaultWidth="450" :minWidth="250" :maxWidth="700"  settingPrefix="prep">
                        <prepbar></prepbar>
                    </nav-sidebar>
                    <main-content>
                        <div>

                        <br><br>
                        </div>
                    </main-content>
                </div>
                <tool-footer>
                    <sheetbar objectType="page" :defaultWidth="700" :minWidth="600" :maxWidth="1000"  settingPrefix="prep"></sheetbar>
                </tool-footer>
<!--            </div>-->
        </div>
        <div v-if="processType===this.dsw_config.DATA_VIS_PROCESS_CD" class="flex-vertical" :key="processKey">
            <tool-header></tool-header>
            <div class="flex-vertical">
                <div class="flex-horizontal">
                    <nav-sidebar :defaultWidth="200" :minWidth="130" :maxWidth="700" settingPrefix="column">
                        <page-columnbar/>
                    </nav-sidebar>
                    <nav-sidebar :defaultWidth="400" :minWidth="130" :maxWidth="700" settingPrefix="chart" class="vis-sidebar-2">
                        <chartbar/>
                    </nav-sidebar>
                    <main-content>
                        <template v-slot:node-view-selector>
                            <node-view-selector/>
                        </template>
<!--                        <toolbox-dashboard></toolbox-dashboard>-->
                        <dashboard></dashboard>
<!--                        {{dataObjects[projectObjects[activePage]["data_object_tags"]["dashboard"]]}}-->

                    </main-content>
                </div>
                <tool-footer>
                    <sheetbar objectType="page" :defaultWidth="700" :minWidth="600" :maxWidth="1000"  settingPrefix="vis"></sheetbar>
                </tool-footer>
            </div>
        </div>
    </div>

</template>

<script>

import NavSidebar from "../../components/layout/NavSidebar/NavSidebar"
import ToolFooter from "../../components/layout/ToolFooter/ToolFooter"
import MainContent from "../../components/layout/MainContent/MainContent"
import DataTable from "../../components/data_widgets/DataTable/DataTable";
import DataColumnExplorer from "../../components/data_widgets/DataColumnExplorer/DataColumnExplorer"
import Chartbar from "../../components/widgets/Chartbar/Chartbar";
import Sheetbar from "../../components/widgets/Sheetbar/Sheetbar"
import Connectorbar from "../../components/widgets/Connectorbar/Connectorbar"
import PageColumnbar from "../../components/widgets/PageColumnbar/PageColumnbar";
import Prepbar from "../../components/widgets/Prepbar/Prepbar"
import NodeViewSelector from "../../components/ui/NodeViewSelector/NodeViewSelector";
import ToolHeader from "../../components/widgets/ToolHeader/ToolHeader";
import QueryEditor from "@/components/widgets/QueryEditor/QueryEditor";
import Dashboard from "@/components/widgets/Dashboard/Dashboard";

import { mapState, mapGetters, mapActions} from "vuex";
import { initProjectBranches, initProcessBranches, createDataFlowRequest, getUpstreamElements } from '@/core/projectManager';
import dsw_config from "../../dsw_config";

export default {
    name: 'Process',
    components: {
        // Connectorbar, Prepbar,
        // NavSidebar, ToolHeader, ToolFooter,
        // DataTable, DataColumnExplorer_old, MainContent,
        // Sheetbar
        DataColumnExplorer, DataTable, QueryEditor,
        NavSidebar, ToolHeader, ToolFooter, MainContent, Connectorbar, Sheetbar, NodeViewSelector, Chartbar,
        Prepbar,
        PageColumnbar,
        Dashboard
    },
    data() {
        return {
            request: null,
            processKey: 0,
        }
    },
    methods: {
        ...mapActions('proj/object_manager',['setActivePO'])
    },
    computed: {
        ...mapState('proj', [
            'projectData',
            'selectedProcess', 'selectedPages', 'selectedNodes'
        ]),
        ...mapGetters('proj', [
            'projectObjects', 'dataObjects',
            'processList', 'pageLists', 'nodeLists',
            'activeProcess', 'activePage', 'activeNode'
        ]),
        processID() {
            return this.$route.params.id
        },
        processType () {
            return this.projectObjects[this.processID].type
        },
        dsw_config() {
            return dsw_config
        },
        pageDisplayTag() {
            return this.projectObjects.getPath(this.activePage + '.display_settings.node_view', 0)
        },
        activeConnectorGroup() {
            return this.projectObjects.getPath(this.activePage + '.data_object_tags.connector.group', null)
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
            this.processKey=this.processKey+1;
            this.setActivePO({
                selectedProcess:value,
                selectedPage:null,
                selectedNode:null
            });
        }
    }
};
</script>

<style src="./Process.scss" lang="scss"></style>

