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
                    @toolClicked="onToolClick"
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
            <v-server-table :columns="tableColumns" :options="tableOptions" />
            <b-row class="y-100">
                <b-col md="12" xs="12">
                    <div class="conn-node-bar y-100">
                        <draggable v-model="nodeList[activePage]">
                            <div
                                    class="px-4 py-3 conn-node mb-sm list-element d-flex justify-content-between align-items-center "
                                    :class="{'active-node':activeNode==nodeId}"
                                    v-for="nodeId in nodeList[activePage]"
                                    :key="nodeId">
                                <div
                                        v-if="nodeId!=editedNode"
                                        class="conn-node-text"
                                        @click="activateNode(nodeId)"
                                        @dblclick="editNode(nodeId)">
                                    {{projectObjects[nodeId].name}}
                                </div>
                                <input
                                        v-if="nodeId==editedNode"
                                        class="conn-node-text"
                                        v-focus
                                        type="text"
                                        v-model="projectObjects[nodeId].name"
                                        @blur="unblurNode()"
                                        @keyup.enter="unblurNode()">
                                <i @click="deleteNode(nodeId)" class="fa fa-times text-muted" />
                            </div>
                        </draggable>
                        <div class="px-4 py-3 border conn-node-add mb-sm list-element d-flex align-items-center">
                            <b-button variant="outline-success" v-b-modal="'new-connector'" class="mb-xs mr-xs">
                                <i class="fa fa-plus" />
                            </b-button>
                        </div>
                    </div>
                    <div class="conn-node-screen">

                        <Websocket></Websocket>

                        <h3>projectObjects</h3>
                        {{ projectObjects}}<br>
                        <h3>dataObjects</h3>
                        {{ dataObjects}}<br>
                        <h3>nodeList</h3>
                        {{ nodeList}}<br>
                        {{ projectNodeList }}<br>
                        <h3>elementList</h3>
                        {{ elementList }}<br>
                        {{ projectElementList }}<br>
                        <h3>actives</h3>
                        {{ activeProcess }}<br>
                        {{ activePage }}<br>
                        {{ activeNode }}<br>
                        {{ activeElement }}<br>
                        <h3>selectedElement</h3>
                        {{selectedElement}}<br>
                    </div>
                </b-col>
            </b-row>
        </div>
        <div >
            <CreateObjectGroup
                    id="new-connector"
                    :showGroups="true"
                    :filterGroup="selectedElement['group']"
                    title="New Connector Settings"
                    :objDefs="defConnectors"
                    selGroup="SQLConnector"
                    @submit-data-object="newDataObject"
            />
            <CreateObjectGroup
                    id="settings-connector"
                    :showGroups="false"
                    :filterGroup="selectedElement['group']"
                    title="Connector Settings"
                    :currentDataObject="selectedElement"
                    :objDefs="defConnectors"
                    selGroup="SQLConnector"
                    @submit-data-object="updateDataObject"
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
    </div>

</template>

<script>
import draggable from 'vuedraggable';
import api_store from '../../store/modules/api';
import Widget from '@/components/Widget/Widget';
import Toolbar from "../../components/Toolbar/Toolbar";
import Toolbox from "../../components/Toolbox/Toolbox";
import AppIcon from "../../components/AppIcon/AppIcon";
import CreateObjectGroup from "../../components/CreateObjectGroup/CreateObjectGroup";
import Websocket from "../../components/Websocket/Websocket";
import { initProjectBranches, initProcessBranches, createFlowRequest, getUpstreamElements } from '@/core/projectManager';
import { vueTableData } from './data';
import {mapActions, mapState} from "vuex";
import axios from 'axios'

export default {
    name: 'DataConnectionProcess',
    components: {Toolbar, Toolbox, AppIcon, Widget, CreateObjectGroup, draggable, Websocket},
    data() {
        return {
            data: vueTableData(),
            columns: ['database', 'table', 'column'],
            options: {
                filterByColumn: true,
                perPage: 20,
                perPageValues: [],
                pagination: { chunk: 20, dropdown: false },
                filterable: ['PLAYER'],
            },

            editedNode: null,
            newPoCounter: 0,
            newDoCounter: 0,

            projectObjects : {},
            dataObjects: {},

            processList: [],
            pageList : {},
            nodeList : {},
            elementList : {},

            projectProcessList: [],
            projectPageList : {},
            projectNodeList : {},
            projectElementList : {},

            activeProcess: {},
            activePage: {},
            activeNode: {},
            activeElement: {},

            tableData: [{'col':1}],
            tableColumns: ['col'],
            tableOptions: {
                requestFunction(settings) {
                    window.console.log(settings);
                    return axios.get('http://127.0.0.1:8000/media/data.json').then(response => {
                        let start_index = (settings.page-1)*settings.limit;
                        let end_index = settings.page*settings.limit;
                        let filtered = response.data;
                        let orderBy = settings.orderBy;
                        if (orderBy !== null) {
                            filtered = filtered.sort(function(a, b) {
                                let result = null;
                                let x = a[orderBy];
                                let y = b[orderBy];

                                if (settings.ascending===1) {
                                    result = ((x < y) ? -1 : ((x > y) ? 1 : 0));
                                }
                                if (settings.ascending===0) {
                                    result = ((y < x) ? -1 : ((y > x) ? 1 : 0));
                                }
                                return result
                            })
                        }
                        filtered = filtered.slice(start_index,end_index);

                        return {data: filtered, count: response.data.length}
                    })
                },
                filterByColumn: true,
                perPage: 20,
                perPageValues: [],
                pagination: { chunk: 20, dropdown: false },
                filterable: this.tableColumns,
            }
        }
    },

    methods: {
        ...mapActions('api', ['updateProjectObjects']),
        fetchData() {
            axios.get('http://127.0.0.1:8000/media/data.json').then(response => {
                this.tableColumns = Object.keys(response.data[0]);
            })
        },
        newDataObject(DoSettings) {
            let newDataObjectID = '_' + this.newDoCounter;
            let newDataObject = {'id': newDataObjectID};
            newDataObject = {...newDataObject, ...DoSettings};
            this.dataObjects[newDataObjectID] = newDataObject;
            this.dataObjects = JSON.parse(JSON.stringify(this.dataObjects));
            this.newDoCounter+=1;
            this.addDataConnectionNode(newDataObject);
        },
        updateDataObject(DoSettings) {
            let DataObjectID = DoSettings.id;
            this.dataObjects[DataObjectID] = DoSettings;
            this.dataObjects = JSON.parse(JSON.stringify(this.dataObjects));
        },
        addDataConnectionNode(DoSettings) {
            let newNodeID = '_' + this.newPoCounter;
            this.nodeList[this.activePage].push(newNodeID);
            let node = {name:'New Connector '+this.newPoCounter, id:newNodeID};
            this.projectObjects[newNodeID] = node;
            this.activeNode=newNodeID;
            this.elementList[newNodeID] = [];
            this.newPoCounter+=1;
            this.projectObjects=JSON.parse(JSON.stringify(this.projectObjects));
            this.addDataConnectionElement(newNodeID, DoSettings);
        },
        addDataConnectionElement(nodeID, DoSettings) {
            let newElementID = '_' + this.newPoCounter;
            let connectorID = DoSettings['id'];
            this.elementList[nodeID].push(newElementID);
            let element = {
                name:DoSettings['name'],
                id:newElementID,
                group:4,
                type:400,
                parameters: {
                    connector_id: connectorID,
                    node_id: nodeID,
                }
            };
            this.projectObjects[newElementID] = element;
            this.activeElement=newElementID;
            this.newPoCounter+=1;
            this.projectObjects=JSON.parse(JSON.stringify(this.projectObjects));
        },
        editNode(nodeId) {
            this.editedNode = nodeId
        },
        unblurNode() {
            this.editedNode = null
        },
        activateNode(nodeId) {
            this.activeNode = nodeId;
            this.activeElement = this.elementList[this.activeNode][0];
        },
        deleteNode(nodeId) {
            let nodeIndex = this.nodeList[this.activePage].indexOf(nodeId);
            this.nodeList[this.activePage].splice(nodeIndex, 1);
            for (var i = 0; i < this.elementList[nodeId].length; i++) {
                let elementId = this.elementList[nodeId][i];
                let element = this.projectObjects[elementId];
                delete this.dataObjects[element['parameters']['connector_id']]
                delete this.projectObjects[elementId];
            }
            delete this.elementList[nodeId];
            delete this.projectObjects[nodeId];
            if (this.activeNode == nodeId) {
                this.activeNode = this.nodeList[this.activePage][0];
            }

        },
        updateProjectObjects() {

        },
        onToolClick(action) {
            let src_request_id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
            let projectID = this.$store.state.api.projectData['project_id'];
            let ownerID = this.$store.state.api.projectData['owner_id'];
            let upstreamElements = getUpstreamElements(this.projectObjects, this.elementList, [], [this.activeElement]);
            let request = createFlowRequest(
                this.projectElementList,
                upstreamElements,
                this.projectObjects,
                projectID,
                ownerID,
                this.dataObjects,
                src_request_id,
                {}
                );
            this.$newRequest(src_request_id, request['request']['elements'].length);
            this.$webSocketSend(request);
        }
    },
    computed: {
        ...mapState('api', ['projectData']),
        processID() {
            return this.$route.params.id
        },
        selectedElement () {
            return this.dataObjects[this.projectObjects[this.activeElement]['parameters']['connector_id']]
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
        this.fetchData();
        this.projectObjects = JSON.parse(JSON.stringify(this.$store.state.api.projectObjects));
        this.dataObjects = JSON.parse(JSON.stringify(this.$store.state.api.dataObjects));

        this.activeProcess = this.$route.params.id;


        [this.processList, this.pageList, this.nodeList, this.elementList] = initProcessBranches(this.projectObjects, this.activeProcess);
        [this.projectProcessList, this.projectPageList, this.projectNodeList, this.projectElementList] = initProjectBranches(this.projectObjects);

        this.activePage = this.pageList[this.activeProcess][0];
        this.activeNode = this.nodeList[this.activePage][0];
        this.activeElement = this.elementList[this.activeNode][0];


    }
};
</script>

<style src="./DataConnectionProcess.scss" lang="scss"></style>

