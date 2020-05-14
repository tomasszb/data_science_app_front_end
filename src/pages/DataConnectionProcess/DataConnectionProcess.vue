<template>
    <div class="conn-page">
        <Toolbar>
            <Toolbox
                    header="all connectors"
                    :childrenTools="[
                     [
                         {
                         action: 'directive',
                         id: 'conn-tool-new-all',
                         bigIcon: true,
                         svg: true,
                         directive: 'new-connector',
                         tooltip: 'setup a new connector',
                         fontIconClass: 'la la-plus-square',
                         svgIconName: 'svg6 - browser-4',
                         name: 'new conn',
                        }
                     ],
                     [
                         {
                         action: 'conectAll',
                         id: 'conn-tool-connect-all',
                         bigIcon: false,
                         svg: false,
                         tooltip: 'connect all connectors',
                         fontIconClass: 'la la-chain',
                         svgIconName: 'svg1 - server',
                         name: 'connect all',
                        },
                        {
                         action: 'loadAll',
                         id: 'conn-tool-load-all',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'load data for all connectors',
                         fontIconClass: 'la la-fast-forward',
                         svgIconName: 'svg1 - server-1',
                         name: 'load all',
                        }
                     ]
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="connector controls"
                    :childrenTools="[
                     [
                         {
                         action: 'directive',
                         id: 'conn-tool-settings-conn',
                         svg: true,
                         directive: 'settings-connector',
                         bigIcon: true,
                         tooltip: 'open settings',
                         fontIconClass: 'la la-cog',
                         svgIconName: 'svg5 - settings',
                         name: 'settings'
                         },
                     ],
                     [
                         {
                         action: 'saveConn',
                         id: 'conn-tool-export-all',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'export all connectors',
                         fontIconClass: 'la la-file-code-o',
                         svgIconName: 'svg7 - 017-data-storage',
                         name: 'save',
                        }
                     ],
                     [
                         {
                         action: 'directive',
                         id: 'conn-tool-explore-conn',
                         svg: true,
                         directive: 'connector-explorer',
                         bigIcon: true,
                         tooltip: 'explore',
                         fontIconClass: 'la la-sitemap',
                         svgIconName: 'svg7 - 009-loupe',
                         name: 'explore'
                        },
                     ],

                     [
                         {
                         action: 'connectConn',
                         id: 'conn-tool-connect',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'connect',
                         fontIconClass: 'la la-chain',
                         svgIconName: 'svg1 - server-1',
                         name: 'connect'
                         },
                         {
                         action: 'loadConn',
                         id: 'conn-tool-run-conn',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'run all queries',
                         fontIconClass: 'la la-play',
                         svgIconName: 'svg1 - server-1',
                         name: 'load'
                         },
                     ],
                     [
                         {
                         action: 'duplicateConn',
                         id: 'conn-tool-duplicate-conn',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'duplicate connector',
                         fontIconClass: 'la la-copy',
                         svgIconName: 'svg7 - 011-file-management',
                         name: 'duplicate'
                         },
                         {
                         action: 'deleteConn',
                         id: 'conn-tool-delete-conn',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'delete connector',
                         fontIconClass: 'la la-close',
                         svgIconName: 'svg7 - 011-file-management',
                         name: 'delete'
                         },
                     ]
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="query"
                    :childrenTools="[
                     [
                         {
                         action: 'analyzeQuery',
                         id: 'conn-tool-analyze-query',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'analyze query',
                         fontIconClass: 'la la-tachometer',
                         svgIconName: 'svg3 - microscope',
                         name: 'analyze'
                         },
                     ],
                     [
                         {
                         action: 'paramsQuery',
                         id: 'conn-tool-params-query',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'define query parameters',
                         fontIconClass: 'la la-th-list',
                         svgIconName: 'svg7 - exchange',
                         name: 'parameters'
                         },
                     ],
                     [
                         {
                         action: 'checkpointsQuery',
                         id: 'conn-tool-checkpoints-query',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'show checkpoints',
                         fontIconClass: 'la la-th-list',
                         svgIconName: 'svg4 - push-pin',
                         name: 'checkpoints'
                         },
                     ],

                     [
                         {
                         action: 'saveChekpointQuery',
                         id: 'conn-tool-save-checkpoint-query',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'save checkpoint',
                         fontIconClass: 'la la-save',
                         svgIconName: 'svg1 - server-1',
                         name: 'save checkpoint'
                         },
                         {
                         action: 'runQuery',
                         id: 'conn-tool-run-query',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'run query',
                         fontIconClass: 'la la-play',
                         svgIconName: 'svg1 - server-1',
                         name: 'run'
                         },
                     ],
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="editor"
                    :childrenTools="[
                     [
                         {
                         action: 'syntax',
                         id: 'conn-tool-syntax',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'select sql syntax',
                         fontIconClass: 'la la-code',
                         svgIconName: 'svg6 - coding',
                         name: 'syntax'
                        },
                     ],
                     [
                         {
                         action: 'commentsShowHide',
                         id: 'conn-tool-comments-show-hide',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'show comments',
                         fontIconClass: 'la la-comments',
                         svgIconName: 'svg6 - coding',
                         name: 'comments'
                        },
                        {
                         action: 'autocomplete',
                         id: 'conn-tool-autocomplete',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'autocomplete',
                         fontIconClass: 'la la-language',
                         svgIconName: 'svg6 - coding',
                         name: 'autocomplete'
                        },
                     ]
                ]"
            />
        </Toolbar>

        <div class="conn-content">
            <b-row class="y-100">
                <b-col md="12" xs="12">
                    <div class="conn-node-bar y-100">
                        <draggable v-model="node_list[activePage['id']]">
                            <div
                                    class="px-4 py-3 conn-node mb-sm list-element d-flex justify-content-between align-items-center "
                                    :class="{'active-node':activeNode['id']==nodeId}"
                                    v-for="(nodeId, nodeIndex) in node_list[activePage['id']]"
                                    :key="nodeId">
                                <div
                                        v-if="nodeId!=editedNode"
                                        class="conn-node-text"
                                        @click="activateNode(nodeId, nodeIndex)"
                                        @dblclick="editNode(nodeId)">
                                    {{nodes[activePage['id']][nodeId].name}}
                                </div>
                                <input
                                        v-if="nodeId==editedNode"
                                        class="conn-node-text"
                                        v-focus
                                        type="text"
                                        v-model="nodes[activePage['id']][nodeId].name"
                                        @blur="unblurNode()"
                                        @keyup.enter="unblurNode()">
                                <i @click="deleteNode(nodeId, nodeIndex)" class="fa fa-times text-muted" />
                            </div>
                        </draggable>
                        <div
                                class="px-4 py-3 border conn-node-add mb-sm list-element d-flex align-items-center"
                                @click="addNode()">
                            <b-button variant="outline-success" class="mb-xs mr-xs">
                                <i class="fa fa-plus" />
                            </b-button>
                        </div>
                    </div>
                    <div class="conn-node-screen">
                        {{ activeProcess }}<br>
                        {{ activePage }}<br>
                        {{ activeNode }}<br>
                        {{ activeElement }}<br>
                        {{ nodes }}<br>
                        {{ node_list }}<br>
                    </div>
                </b-col>
            </b-row>
        </div>

        <CreateObjectGroup
                id="new-connector"
                :showGroups="true"
                :filterGroup=0
                title="New Connector Settings"
                :objDefs="defConnectors"
                selGroup="SQLConnector"
        />
        <CreateObjectGroup
                id="settings-connector"
                :showGroups="false"
                :filterGroup=0
                title="Connector Settings"
                :objDefs="defConnectors"
                selGroup="SQLConnector"
        />
        <b-modal
                id="connector-explorer"
                title="Explore Database"
                size="lg"
                body-class="bg-white"
                hide-footer>
            <v-client-table :data="data" :columns="columns" :options="options" />
        </b-modal>

    </div>

</template>

<script>
import draggable from 'vuedraggable';
import api_store from '../../store/api/api';
import Widget from '@/components/Widget/Widget';
import Toolbar from "../../components/Toolbar/Toolbar";
import Toolbox from "../../components/Toolbox/Toolbox";
import AppIcon from "../../components/AppIcon/AppIcon";
import CreateObjectGroup from "../../components/CreateObjectGroup/CreateObjectGroup";
import { vueTableData } from './data';
import {mapActions} from "vuex";

export default {
    name: 'DataConnectionProcess',
    components: {Toolbar, Toolbox, AppIcon, Widget, CreateObjectGroup, draggable},
    data() {
        return {
            randomCounter: 0,
            data: vueTableData(),
            columns: ['database', 'table', 'column'],
            options: {
                filterByColumn: true,
                perPage: 20,
                perPageValues: [],
                pagination: { chunk: 20, dropdown: false },
                filterable: ['database', 'table', 'column'],
            },
            editedNode: null,

            processes : {},
            pages : {},
            nodes : {},
            elements : {},

            process_list: [],
            page_list : {},
            node_list : {},
            element_list : {},

            activeProcess: {},
            activePage: {},
            activeNode: {},
            activeElement: {},
        }
    },
    methods: {
        ...mapActions('api', ['updateProjectObjects']),
        addNode() {
            let randomID = '_' + this.randomCounter;
            this.node_list[this.activePage['id']].push(randomID);
            this.nodes[this.activePage['id']][randomID] = {'name':'New Connector '+this.randomCounter, 'id':randomID};
            this.randomCounter+=1;
        },
        editNode(nodeId) {
            this.editedNode = nodeId
        },
        unblurNode() {
            this.editedNode = null
        },
        activateNode(nodeId, nodeIndex) {
            this.activeNode = {'id': nodeId, 'index': nodeIndex}
        },
        deleteNode(nodeId, nodeIndex) {
            this.node_list[this.activePage['id']].splice(nodeIndex, 1);
            delete this.nodes[this.activePage['id']][nodeId];
            if (this.activeNode['id'] == nodeId) {
                this.activeNode = {'id': this.node_list[this.activePage['id']][0], 'index': 0};
            }

        },
        updateProjectObjects() {

        }
    },
    computed: {
        processID() {
            return this.$route.params.id
        },
        defConnectors () {
            let defs = api_store.state.dataObjectDefinitions;
            for (let item of defs) {
                if (item.name=="Connectors") {
                    return item.children
                }
            }
        },
    },
    directives: {
        focus: {
            inserted (el) {
                el.focus()
            }
        }
    },
    created() {
        function assign(obj, keyPath, value) {
            let lastKeyIndex = keyPath.length-1;
            for (let i = 0; i < lastKeyIndex; ++ i) {
                let key = keyPath[i];
                if (!(key in obj)){
                    obj[key] = {}
                }
                obj = obj[key];
            }
            obj[keyPath[lastKeyIndex]] = value;
        }

        let processes = {};
        let pages = {};
        let nodes = {};
        let elements = {};

        let process_list = [];
        let page_list = {};
        let node_list = {};
        let element_list = {};

        let projectObjects = this.$store.state.api.projectObjects;

        for (let id in projectObjects) {
            if (projectObjects.hasOwnProperty(id)) {
                if (projectObjects[id]['group'] === 1) {
                    processes[id] = projectObjects[id];
                    process_list.push(id)
                }
            }
        }

        for (let id in projectObjects) {
            if (projectObjects.hasOwnProperty(id)) {
                if (projectObjects[id]['group']  === 2) {
                    let page = projectObjects[id];
                    if ('process_id' in page['parameters']) {
                        let process_id = page['parameters']['process_id'];
                        if (process_id===parseInt(this.$route.params.id, 10)) {
                            assign(pages, [process_id, id], page);
                            if (!(process_id in page_list)) {
                                page_list[process_id] = []
                            }
                            page_list[process_id].push(page['id']);
                        }
                    }

                }
            }
        }

        for (let id in projectObjects) {
            if (projectObjects.hasOwnProperty(id)) {
                if (projectObjects[id]['group'] === 3) {
                    let node = projectObjects[id];
                    if ('page_id' in node['parameters']) {
                        let page_id = node['parameters']['page_id'];
                        let page_list_all = [].concat.apply([], Object.values(page_list));
                        if (page_list_all.includes(page_id)) {
                            assign(nodes,[page_id, id], node);
                            if (!(page_id in node_list)) {
                                node_list[page_id] = []
                            }
                            node_list[page_id].push(node['id']);
                        }
                    }

                }
            }
        }

        for (let id in projectObjects) {
            if (projectObjects.hasOwnProperty(id)) {
                if (projectObjects[id]['group'] === 4) {
                    let element = projectObjects[id];
                    if ('node_id' in element['parameters']) {
                        let node_id = element['parameters']['node_id'];
                        let node_list_all = [].concat.apply([], Object.values(node_list));
                        if (node_list_all.includes(node_id)) {
                            assign(elements,[node_id, id], element);
                            if (!(node_id in element_list)) {
                                element_list[node_id] = []
                            }
                            element_list[node_id].push(element['id']);
                        }
                    }
                }
            }
        }

        this.processes = processes;
        this.pages = pages;
        this.nodes = nodes;
        this.elements = elements;

        this.process_list = process_list;
        this.page_list = page_list;
        this.node_list = node_list;
        this.element_list = element_list;

        this.activeProcess = {'id': this.$route.params.id, 'index': 0};
        this.activePage = {'id': this.page_list[this.activeProcess['id']][0], 'index': 0};
        this.activeNode = {'id': this.node_list[this.activePage['id']][0], 'index': 0};
        this.activeElement = {'id': this.element_list[this.activeNode['id']][0], 'index': 0};

    }
};
</script>

<style src="./DataConnectionProcess.scss" lang="scss"></style>

