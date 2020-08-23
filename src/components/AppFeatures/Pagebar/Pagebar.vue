<template>
        <b-row class="y-100">
            <b-col md="12" xs="12">
                <div class="page-bar y-100">
                    <draggable v-model="pageList">
                        <Page
                                v-for="pageID in pageList"
                                class="px-4 py-3 po-page-pill mb-sm list-element d-flex justify-content-between align-items-center "
                                :class="{'active-page':activePage==pageID}"
                                :key="'po-'+pageID"
                                :pageID="pageID"
                                :active="activePage===pageID"
                        />
                        <div class="px-4 py-3 border page-add mb-sm list-element d-flex align-items-center">
                            <b-button variant="outline-success" v-b-modal="'new-connector'" class="mb-xs mr-xs">
                                <i class="fa fa-plus" />
                            </b-button>
                        </div>
                    </draggable>
                </div>
            </b-col>
        </b-row>

</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import Page from "../../ProjectObjects/Page/Page"
    import draggable from 'vuedraggable';

    export default {
        name: 'Pagebar',
        components: {
            Page, draggable
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
            pageList: {
                get() {
                    return this.pageLists[this.activeProcess]
                },
                set(pagesIDs) {
                    for (let i = 0; i < pagesIDs.length ;i++) {
                        let pagesID = pagesIDs[i];
                        let page = this.projectObjects[pagesID];
                        page.relative_position = i;
                        this.UPDATE_PROJECT_OBJECT(pagesID, page)
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
