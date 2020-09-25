<template>
    <div class="chart-bar y-100">
        <h4 class="mb-4"><span class='fw-semi-bold'>Chart</span> Settings</h4>
        <ChartTypeSelector/>
        <ChartDataCard chartType=""/>
        <Widget
                class="mb-2"
                title="<h5>Chart<span class='fw-semi-bold'> Layout</span></h5>"
                collapse customHeader>
        </Widget>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import draggable from 'vuedraggable';
    import ChartTypeSelector from "./ChartTypeSelector/ChartTypeSelector";
    import ChartDataCard from "./ChartTypeSelector/ChartDataCard/ChartDataCard";

    export default {
        name: 'Chartbar',
        components: {
            ChartTypeSelector, ChartDataCard, draggable
        },
        prop: {

        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            ...mapState('proj', [
                'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements'
            ]),
            pageList: {
                get() {
                    return this.pageLists[this.activeProcess]
                },
                set(pagesIDs) {
                    for (let i = 0; i < pagesIDs.length ;i++) {
                        let pagesID = pagesIDs[i];
                        let page = JSON.parse(JSON.stringify(this.projectObjects[pagesID]));
                        page.relative_position = i;
                        this.UPDATE_PROJECT_OBJECT({ObjectId: pagesID, Object:page})
                    }
                }
            },

        }
    };
</script>

<style src="./Chartbar.scss" lang="scss"></style>
