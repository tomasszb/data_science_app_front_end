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
                        <connector-explorer v-if="processDisplayTag===2"/>
                        <div v-if="processDisplayTag===1">
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
                        </div>


                    </main-content>
                    <tool-footer v-show="activeConnectorGroup === 1000">
                        <sheetbar objectType="node" :defaultWidth="700" :minWidth="600" :maxWidth="1000"  settingPrefix="conn"></sheetbar>
                    </tool-footer>
                </div>
            </div>

        </div>
        <div v-if="processType===this.dsw_config.DATA_PREPARATION_PROCESS_CD" class="flex-vertical" :key="processKey">
            <tool-header></tool-header>
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
        </div>
        <div v-if="processType===this.dsw_config.DATA_VIS_PROCESS_CD" class="flex-vertical" :key="processKey">
            <tool-header></tool-header>
            <div class="flex-vertical">
                <div class="flex-horizontal-no-scroll">
                    <nav-sidebar
                        v-if="nodeTagsChartTemplate!==null"
                        :defaultWidth="600"
                        :minWidth="500"
                        :maxWidth="650"
                        settingPrefix="chart-column"
                        class="vis-sidebar-2"
                    >
                        <div class="flex-vertical-no-scroll">
                            <ChartTypeSelector
                                :sidebarPrefixes="['chart-column']"
                                settingPrefix="chart-column"
                                :chartsSettings="chartsSettings"
                            />
                            <div class="flex-horizontal-no-scroll">
                                <div class="c-45 border-right">
                                    <page-columnbar/>
                                </div>
                                <div class="c-55">
                                    <chartbar/>
                                </div>
                            </div>
                        </div>
                    </nav-sidebar>
                    <main-content>
                        <template v-slot:node-view-selector>
                            <node-view-selector/>
                        </template>
                        <dashboard></dashboard>
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
import ChartTypeSelector from "@/components/widgets/Chartbar/ChartTypeSelector/ChartTypeSelector";

import { mapState, mapGetters, mapActions} from "vuex";
import { initProjectBranches, initProcessBranches, createDataFlowRequest, getUpstreamElements } from '@/core/projectManager';
import dsw_config from "../../dsw_config";
import ConnectorExplorer from "@/components/widgets/ConnectorExplorer/ConnectorExplorer";
import {chartsSettings} from '@/components/widgets/Chartbar/chartsSettings_new';
import {getObjectSetting} from "@/core/projectObjectParser";

export default {
    name: 'Process',
    components: {
        ConnectorExplorer,
        // Connectorbar, Prepbar,
        // NavSidebar, ToolHeader, ToolFooter,
        // DataTable, DataColumnExplorer_old, MainContent,
        // Sheetbar
        DataColumnExplorer, DataTable, QueryEditor,
        NavSidebar, ToolHeader, ToolFooter, MainContent, Connectorbar, Sheetbar, NodeViewSelector,
        Chartbar, ChartTypeSelector,
        Prepbar,
        PageColumnbar,
        Dashboard
    },
    data() {
        return {
            request: null,
            processKey: 0,
            chartsSettings: chartsSettings,
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
            return this.projectObjects.getPath(this.activeNode + '.display_settings.node_view', 0)
        },
        nodeTagsChartTemplate() {
            return this.projectObjects.getPath(this.activeNode + '.data_object_tags.chart_template', null)
        },
        processDisplayTag() {
            return this.projectObjects.getPath(this.activeProcess + '.display_settings.process_view', 0)
        },
        activeConnectorGroup() {
            return this.projectObjects.getPath(this.activePage + '.data_object_tags.connector.group', null)
        },
        processDisplaySettings() {
            // console.log('displaySettings', getObjectSetting(this.projectObjects, this.activeProcess, 'display_settings', {}));
            return getObjectSetting(
                this.projectObjects,
                this.activeProcess,
                'display_settings',
                {}
            );
        },
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

