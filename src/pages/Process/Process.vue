<template>
    <div class="content">
        <div v-if="processType===this.dsw_config.LOAD_PROCESS_CD" class="flex-vertical" :key="processKey">
            <tool-header></tool-header>
            <div class="flex-horizontal">
                <nav-sidebar :defaultWidth="250" :minWidth="130" :maxWidth="500" settingPrefix="conn">
                    <connectorbar></connectorbar>
                </nav-sidebar>
                    <main-content>
                        <template v-slot:node-view-selector>
                            <node-view-selector/>
                        </template>
                        <DataTable
                            v-if="pageDisplayTag===0"
                            :key="processKey + '-data-table'"
                            :nodeID="activeNode"
                        />
                        <DataColumnExplorer
                            v-if="pageDisplayTag===1"
                            :key="processKey  + '-data-column-explorer'"
                            :nodeID="activeNode"
                        />

                    </main-content>
                    <tool-footer v-show="activeConnectorGroup === 1000">
                        <sheetbar objectType="node" :defaultWidth="700" :minWidth="600" :maxWidth="1000"  settingPrefix="conn"></sheetbar>
                    </tool-footer>

            </div>
        </div>
        <div v-if="processType===this.dsw_config.DATA_PREPARATION_PROCESS_CD" class="flex-vertical" :key="processKey">
            <tool-header></tool-header>
<!--            <div class="flex-vertical">-->
                <div class="flex-horizontal">
                    <nav-sidebar :defaultWidth="450" :minWidth="200" :maxWidth="700"  settingPrefix="prep">
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
                    <nav-sidebar :defaultWidth="400" :minWidth="130" :maxWidth="700" settingPrefix="chart">
                        <chartbar/>
                    </nav-sidebar>
                    <main-content></main-content>
                </div>
                <tool-footer>
                    <sheetbar objectType="node" :defaultWidth="700" :minWidth="600" :maxWidth="1000"  settingPrefix="vis"></sheetbar>
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

import { mapState, mapGetters, mapActions} from "vuex";
import { initProjectBranches, initProcessBranches, createFlowRequest, getUpstreamElements } from '@/core/projectManager';
import dsw_config from "../../dsw_config";

export default {
    name: 'Process',
    components: {
        // Connectorbar, Prepbar,
        // NavSidebar, ToolHeader, ToolFooter,
        // DataTable, DataColumnExplorer_old, MainContent,
        // Sheetbar
        DataColumnExplorer, DataTable,
        NavSidebar, ToolHeader, ToolFooter, MainContent, Connectorbar, Sheetbar, NodeViewSelector, Chartbar,
        Prepbar,
        PageColumnbar
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
            'activeProcess', 'activePage', 'activeNode',
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
        activePageDisplaySettings() {
            return this.projectObjects[this.activePage]['display_settings']
        },
        pageDisplayTag() {
            let displayTag = this.activePageDisplaySettings['node_view'];
            console.log('display tag', displayTag, this.projectObjects[this.activePage]);
            return typeof displayTag!=='undefined' ? displayTag : 0
        },
        activeConnectorGroup() {
            let dataObjectTags = this.projectObjects[this.activePage]['data_object_tags'];
            return dataObjectTags.hasOwnProperty('connector') ? this.dataObjects[dataObjectTags['connector']].group : null
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

