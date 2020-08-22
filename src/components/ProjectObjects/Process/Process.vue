<template>
    <div class="po-process">
        <DataConnectionToolbar v-if="processType===this.dsw_config.LOAD_PROCESS_CD"/>
        <DataPreparationToolbar v-if="processType===this.dsw_config.DATA_PREPARATION_PROCESS_CD"/>

        <Pagebar></Pagebar>

        <DataConnectionModals v-if="processType===this.dsw_config.LOAD_PROCESS_CD"/>
        <DataPreparationModals v-if="processType===this.dsw_config.DATA_PREPARATION_PROCESS_CD"/>
    </div>

</template>

<script>

import DataConnectionModals from "../../ProjectObjectFeatures/DataConnection/DataConnectionModals";
import DataPreparationModals from "../../ProjectObjectFeatures/DataPreparation/DataPreparationModals";

import DataConnectionToolbar from "../../ProjectObjectFeatures/DataConnection/DataConnectionToolbar";
import DataPreparationToolbar from "../../ProjectObjectFeatures/DataPreparation/DataPreparationToolbar";

import Pagebar from "../../AppFeatures/Pagebar/Pagebar"

import { mapState, mapGetters, mapActions} from "vuex";
import dsw_config from "../../../dsw_config";

export default {
    name: 'Process',
    components: {
        Pagebar,
        DataConnectionModals, DataConnectionToolbar,
        DataPreparationModals, DataPreparationToolbar
    },
    methods: {
        ...mapActions('proj/object_manager',['setActivePO']),

        wsConnect () {
            let url = "ws://127.0.0.1:8000/ws/dsw_engine/" + this.projectData.project_id + "_" +this.projectData.owner_id+"/";
            this.$webSocketConnect({"url": url})
        },
        wsDisconnect () {
            this.$webSocketDisconnect()
        }
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

