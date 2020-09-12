<template>
    <div class="page-bar y-100">
        <draggable v-model="pageList">
            <PageButton
                    v-for="pageID in pageList"
                    class="px-4 py-3 po-page-pill mb-sm list-element"
                    :class="{'active-page':activePage==pageID}"
                    :key="'po-'+pageID"
                    :pageID="pageID"
                    :active="activePage===pageID"
            />
            <div class="px-4 py-3 border page-add mb-sm list-element align-items-center">
                <b-button variant="outline-success" v-b-modal="'new-connector'" class="mb-xs mr-xs">
                    <i class="fa fa-plus" />
                </b-button>
            </div>
        </draggable>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import PageButton from "./PageButton/PageButton"
    import draggable from 'vuedraggable';

    export default {
        name: 'Pagebar',
        components: {
            PageButton, draggable
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
            inputNodes() {
                let previousProcessIndex = this.processList.indexOf(this.activeProcess) - 1;
                let previousNodeIDs = [];

                if (previousProcessIndex >= 0) {
                    let previousProcessId = this.processList[previousProcessIndex];
                    let previousPageIDs = this.pageLists[previousProcessId];
                    for(let pageID of previousPageIDs) {
                        previousNodeIDs.push(this.nodeLists[pageID].slice(-1)[0])
                    }
                }
                return previousNodeIDs
            }
        }
    };
</script>

<style src="./Pagebar.scss" lang="scss"></style>
