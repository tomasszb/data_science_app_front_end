<template>
    <div class="app-container">

        <div v-if="processType===this.dsw_config.LOAD_PROCESS_CD" class="po-process">
            <DataConnectionToolbar/>
            <b-row class="m-0 content-space">
                <b-col class="col-md-2 p-0">
                    <Pagebar></Pagebar>
                </b-col>
                <b-col class="col-md-10 p-0">
                    <DataConnectionNode/>
                    <Nodebar></Nodebar>
                </b-col>
<!--                <DataConnectionModals/>-->
            </b-row>
        </div>

        <div v-if="processType===this.dsw_config.DATA_PREPARATION_PROCESS_CD" class="po-process">
            <DataPreparationToolbar/>
            <b-row class="m-0 content-space">
                <b-col class="col-md-4 p-0">
                    <Pagebar></Pagebar>
                </b-col>
                <b-col class="col-md-8 p-0">
                    <DataPreparationNode/>
                </b-col>
                <Nodebar></Nodebar>
                <DataPreparationModals/>
            </b-row>
        </div>

        <div v-if="processType===this.dsw_config.DATA_VIS_PROCESS_CD" class="po-process">
            <DataConnectionToolbar/>
            <div class="content-space">
                <div class="node-space">
                    <PageColumnbar/>
                    <DataVisualizationNode/>
                </div>
                <Nodebar></Nodebar>
            </div>
<!--            <DataVisualizationModals/>-->
        </div>
    </div>

</template>

<script>

import DataConnectionModals from "../../ProjectObjectFeatures/DataConnection/DataConnectionModals";
import DataPreparationModals from "../../ProjectObjectFeatures/DataPreparation/DataPreparationModals";

import DataConnectionToolbar from "../../ProjectObjectFeatures/DataConnection/DataConnectionToolbar";
import DataPreparationToolbar from "../../ProjectObjectFeatures/DataPreparation/DataPreparationToolbar";

import Pagebar from "../Page/Pagebar/Pagebar"
import PageColumnbar from "../Page/PageColumnbar/PageColumnbar"
import Nodebar from "../Node/Nodebar/Nodebar"

import DataConnectionNode from "../Node/DataConnectionNode"
import DataPreparationNode from "../Node/DataPreparationNode"
import DataVisualizationNode from "../Node/DataVisualizationNode"

import { mapState, mapGetters, mapActions} from "vuex";
import { initProjectBranches, initProcessBranches, createFlowRequest, getUpstreamElements } from '@/core/projectManager';
import dsw_config from "../../../dsw_config";

export default {
    name: 'Process',
    components: {
        Pagebar, Nodebar, PageColumnbar,
        DataConnectionNode, DataVisualizationNode, DataPreparationNode,
        DataConnectionModals, DataConnectionToolbar,
        DataPreparationModals, DataPreparationToolbar,
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

