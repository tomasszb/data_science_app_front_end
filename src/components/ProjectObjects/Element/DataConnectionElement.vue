<template>
    <div>
        <DataTable
                :elementID = "activeElement"
        />
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions} from "vuex";
    import DataTable from "../../widgets/DataTable/DataTable"
    import { initProjectBranches, initProcessBranches, createFlowRequest, getUpstreamElements } from '@/core/projectManager';

    export default {
        name: 'Element',
        components: {DataTable},
        data() {
            return {
                request: null
            }
        },
        methods: {
            ...mapActions('proj/object_manager',['setActivePO']),

            runFlow() {
                let request = createFlowRequest(
                    this.elementLists,
                    this.projectObjects,
                    this.dataObjects,
                    {}
                );
                this.request = request;
            }
        },
        computed: {
            ...mapState('proj', [
                'projectData',
                'dataFrames',
                'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements'
            ]),
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            dataFrame() {
                console.log(this.dataFrames);
                return this.dataFrames['11-run'];
            },
            columns() {
                return ['Year', 'Player', 'Pos', 'Age', 'Tm']
            },
            options() {
                return {
                    filterByColumn: true,
                    perPage: 10,
                    pagination: { chunk: 10, dropdown: false },
                    filterable: ['Year', 'Player', 'Pos', 'Age', 'Tm'],
                }
            },
        }
    };
</script>


