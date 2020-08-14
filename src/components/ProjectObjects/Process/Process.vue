<template>
    <div class="po-process">
        <div v-if="proccessType='conn'">
            <DataConnectionToolbar/>
            <Page
                    :pageID="nodeList[activePage]"
                    :nodeIDs="nodeList[activePage]"
                    type="sheet"
                    :multipleAllowed="false"
            />
            <DataConnectionModals/>
        </div>

        <div v-if="proccessType='prep'">
            <DataConnectionToolbar/>
<!--            <SideObjectExplorer/>-->
            <Page
                    :pageID="nodeList[activePage]"
                    :nodeIDs="nodeList[activePage]"
                    type="step"
                    :multipleAllowed="true"
            />
            <DataPreparationModals/>
        </div>
    </div>

</template>

<script>
import project_store from '../../../store/modules/proj';

import DataConnectionModals from "../../ProjectObjectFeatures/DataConnection/DataConnectionModals";
import DataPreparationModals from "../../ProjectObjectFeatures/DataPreparation/DataPreparationModals";

import DataConnectionToolbar from "../../ProjectObjectFeatures/DataConnection/DataConnectionToolbar";
import DataPreparationToolbar from "../../ProjectObjectFeatures/DataPreparation/DataPreparationToolbar";

import { initProjectBranches, initProcessBranches, createFlowRequest, getUpstreamElements } from '@/core/projectManager';
import { vueTableData } from './data';
import {mapActions, mapState} from "vuex";
import axios from 'axios'

export default {
    name: 'DataConnectionProcess',
    components: {
        DataConnectionModals, DataConnectionToolbar,
        DataPreparationModals, DataPreparationToolbar
    },
    data() {
        return {
            processType: 'conn',
            data: vueTableData(),

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
            tableColumns: ['col']
        }
    },

    methods: {
        ...mapActions('proj', ['updateProjectObjects']),
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
            let projectID = this.$store.state.proj.projectData['project_id'];
            let ownerID = this.$store.state.proj.projectData['owner_id'];
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
        ...mapState('proj', ['projectData']),
        processID() {
            return this.$route.params.id
        },
        selectedElement () {
            return this.dataObjects[this.projectObjects[this.activeElement]['parameters']['connector_id']]
        },
        defConnectors () {
            let defs = project_store.state.dataObjectDefinitions;
            for (let item of defs) {
                if (item.name=="Connectors") {
                    return item.children
                }
            }
        },
        dataObjDefs () {
            let defs = project_store.state.dataObjectDefinitions;
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
        this.projectObjects = JSON.parse(JSON.stringify(this.$store.state.proj.projectObjects));
        this.dataObjects = JSON.parse(JSON.stringify(this.$store.state.proj.dataObjects));

        this.activeProcess = this.$route.params.id;


        [this.processList, this.pageList, this.nodeList, this.elementList] = initProcessBranches(this.projectObjects, this.activeProcess);
        [this.projectProcessList, this.projectPageList, this.projectNodeList, this.projectElementList] = initProjectBranches(this.projectObjects);

        this.activePage = this.pageList[this.activeProcess][0];
        this.activeNode = this.nodeList[this.activePage][0];
        this.activeElement = this.elementList[this.activeNode][0];


    }
};
</script>

<style src="Process.scss" lang="scss"></style>

