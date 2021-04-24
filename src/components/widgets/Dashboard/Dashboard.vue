<template>
    <div class="chart-dashboard r-100 c-100">
<!--        <button type="button" @click="addNewWidget()">Add Widget</button> {{ info }}-->
        <div class="chart-dashboard-grid-container">
            <section class="grid-stack"></section>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import 'gridstack/dist/gridstack.min.css';
    import { GridStack } from 'gridstack';
    // THEN to get HTML5 drag&drop
    import 'gridstack/dist/h5/gridstack-dd-native';
    // OR to get legacy jquery-ui drag&drop (support Mobile touch devices, h5 does not yet)
    // import 'gridstack/dist/jq/gridstack-dd-jqueryui';

    export default {
        name: 'Dashboard',
        components: {
        },
        prop: {

        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            addNewWidget: function () {
                const node ={
                    x: Math.round(0 ),
                    y: Math.round(0 ),
                    w: Math.round(10 + 3 * Math.random()),
                    h: Math.round(10 + 3 * Math.random()),
                };
                node.id = node.content = String(this.count++);
                this.grid.addWidget(node);
            },
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
        },
        items: [
            { x: 2, y: 1, h: 2 },
            { x: 2, y: 4, w: 3},
            { x: 4, y: 2},
            { x: 3, y: 1, h: 2 },
            { x: 0, y: 6, w: 2, h: 2 }
        ],
        watch: {
            /**
             * Clear the info text after a two second timeout. Clears previous timeout first.
             */
            info: function (newVal, oldVal) {
                if (newVal.length === 0) return;

                window.clearTimeout(this.timerId);
                this.timerId = window.setTimeout(() => {
                    this.info = "";
                }, 2000);
            },
        },
        mounted: function () {
            // Provides access to the GridStack instance across the Vue component.
            this.grid = GridStack.init(
                {
                    float: false,
                    cellHeight: '20px',
                    cellWidth: '20px',
                    margin: '1px',
                    disableOneColumnMode: true,
                    draggable: {handle: '.grid-stack-item-content', scroll: false, appendTo: 'body', containment: null},
                    resizable: {autoHide: true, handles: 'n,ne,e,se,s,sw,w,nw'}
                }
            );

            // Use an arrow function so that `this` is bound to the Vue instance. Alternatively, use a custom Vue directive on the `.grid-stack` container element: https://vuejs.org/v2/guide/custom-directive.html
            this.grid.on("dragstop", (event, element) => {
                const node = element.gridstackNode;
                // `this` will only access your Vue instance if you used an arrow function, otherwise `this` binds to window scope. see https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/
                this.info = `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`;
            });
        },
    };
</script>

<style src="./Dashboard.scss" lang="scss"></style>
