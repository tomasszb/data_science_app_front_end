<template>
    <div class="chart-dashboard r-100 c-100">
        <div class="chart-dashboard-grid-container r-95">
            {{activeNodeSettings['data_object_tags']}}
            <section class="grid-stack">
                <dashboard-item
                    v-for="(nodeID, index) in nodeLists[activePage]"
                    v-if="getDataVisID(nodeID) !== '' "
                    @activate-node="activateNode(nodeID)"
                    :class="nodeID===activeNode ? 'active' : ''"
                    :grid="grid"
                    :dataObjectID="dataObjectID"
                    :key="'dashboard-item-node-'+nodeID"
                    :index="getDataVisID(nodeID)"
                >
                    <data-visualization
                        :nodeID="nodeID"
                    />
                </dashboard-item>
            </section>
        </div>
        <toolbox-dashboard
            :grid="grid"
            @add-dashboard-item="addNewWidget()"
        />
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import 'gridstack/dist/gridstack.min.css';
    import { GridStack } from 'gridstack';
    // THEN to get HTML5 drag&drop
    import 'gridstack/dist/h5/gridstack-dd-native';
    import DashboardItem from "@/components/widgets/Dashboard/DashboardItem/DashboardItem";
    import DataVisualization from "@/components/data_widgets/DataVisualization/DataVisualization";
    import ToolboxDashboard from "@/components/widgets/Dashboard/ToolboxDashboard/ToolboxDashboard";
    import {getObjectSetting} from "@/core/projectObjectParser";
    const R = require('ramda');
    import Vue from 'vue'

    export default {
        name: 'Dashboard',
        components: {
            DashboardItem, ToolboxDashboard, DataVisualization
        },
        prop: {

        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DATA_OBJECT', 'SET_DO_PARAMETER'
            ]),
            ...mapActions('proj/object_manager', [
                'newNode', 'setActivePO'
            ]),
            newDataObject(type, existDataObjectID=null) {
                let newDataObjectID = 'do-'+(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
                let dataObjectID = existDataObjectID!==null ? existDataObjectID : newDataObjectID;
                this.UPDATE_DATA_OBJECT({
                    ObjectID: dataObjectID,
                    Object: {
                        'id': dataObjectID,
                        'type': type,
                        'name': '',
                        'parameters': {}
                    }
                });
                return dataObjectID;
            },
            activateNode(nodeID) {
                // console.log('activating node')
                this.setActivePO({
                    selectedProcess:null,
                    selectedPage:null,
                    selectedNode:nodeID
                });
            },
            addNewWidget: function () {
                let visID = this.newDataObject(310000);
                let pivotID = this.newDataObject(200601);
                let temlateID = this.newDataObject(300000);
                let newDashboardItem = {
                    id: 'do-vis-'+visID,
                    visualization_object: visID,
                    layout: {
                        x: 0,
                        y: 0,
                        w: 10,
                        h: 20,
                    }
                }
                // let dashSettings = {type: 320000}
                let newProjectObjectSettings = {
                    typeCD: 303,
                    name: '',
                    dataObjectTags: {
                        'data_visualization': visID,
                        'visualization_pivot': pivotID,
                        'chart_template': temlateID
                    },
                    params: {'page_id': this.activePage, source_data_node: this.activeSourceNode}
                }
                this.newNode(newProjectObjectSettings)
                let charts = R.clone(this.dashboardItems);
                charts[visID] = (newDashboardItem);
                Vue.set(this, 'dashboardItems', charts);

                this.$nextTick(() => {
                    this.grid.makeWidget('do-vis-'+visID);
                });
            },
            getDataVisID(nodeID) {
                let dataObjectTags = this.projectObjects[nodeID]['data_object_tags'];
                return 'data_visualization' in dataObjectTags ? dataObjectTags['data_visualization'] : ''
            }
        },
        data() {
            return {
                grid: undefined,
                count: 0,
                info: "",
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists',
                'activeProcess', 'activePage', 'activeNode',
                'dataObjectParameterMapping'
            ]),
            ...mapState('proj', [
                'selectedProcess', 'selectedPages', 'selectedNodes'
            ]),
            dataObjectID() {
                let dataObjectTags =  getObjectSetting(this.projectObjects, this.activePage, 'data_object_tags',{});
                return dataObjectTags["dashboard"].toString()
            },
            dataObjectParameters() {
                return this.dataObjects[this.dataObjectID]['parameters']
            },
            activeSourceNode() {
                return this.projectObjects[this.activeNode]['parameters']['source_data_node']
            },
            activeNodeSettings() {
                return this.projectObjects[this.activeNode]
            },
            dashboardItems: {
                get() {
                    return 'items' in this.dataObjectParameters ? this.dataObjectParameters['items'] : {}
                },
                set(newValue) {
                    this.SET_DO_PARAMETER({
                        id: parseInt(this.dataObjectID),
                        route: 'items',
                        value: newValue
                    });

                }
            }
        },
        mounted: function () {
            // Provides access to the GridStack instance across the Vue component.
            this.grid = GridStack.init(
                {
                    float: false,
                    acceptWidgets: true,
                    cellHeight: '20px',
                    cellWidth: '20px',
                    margin: '1px',
                    disableOneColumnMode: true,
                    draggable: {handle: '.grid-stack-item-content', scroll: false, appendTo: 'body', containment: null},
                    resizable: {autoHide: true, handles: 'n,ne,e,se,s,sw,w,nw'}
                }
            );

            // Use an arrow function so that `this` is bound to the Vue instance. Alternatively, use a custom Vue directive on the `.grid-stack` container element: https://vuejs.org/v2/guide/custom-directive.html
            this.grid.on('change', (event, items) => {
                let dashboardItems = R.clone(this.dashboardItems);
                items.forEach(function(item) {
                    for(let i=0; i<dashboardItems.length; i++) {
                        let dashboardItem = dashboardItems[i];
                        if (item.id === dashboardItem.id) {
                            dashboardItem.layout.x = item.x;
                            dashboardItem.layout.y = item.y;
                            dashboardItem.layout.w = item.w;
                            dashboardItem.layout.h = item.h;

                        }
                    }
                });
                // console.log(dashboardItems)
                Vue.set(this, 'dashboardItems', dashboardItems);
            })
        },
    };
</script>

<style src="./Dashboard.scss" lang="scss"></style>
