<template>
    <div class="connector-bar">
        <div class="title-bar">
            <span class="title">Connections</span>
            <span
                    class="add-connector-button"
                    v-b-modal="'new-connector-explorer'"
            >
                <a>Add</a>
            </span>
            <connector-explorer/>
        </div>
        <draggable id="testing-connector-bar" class="justify-content-start align-items-center page-list" v-model="pageList">
                <object-selector
                        v-for="pageID in pageList"
                        :key="'po-'+pageID"
                        :objectID="pageID"
                        showDetail
                        detailType="connector_type"
                />

        </draggable>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ObjectSelector from "../ObjectSelector/ObjectSelector"
    import ConnectorExplorer from "../ConnectorExplorer/ConnectorExplorer"
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'Connectorbar',
        components: {
            ObjectSelector, ConnectorExplorer, draggable
        },
        props: {
            objectType: { type: String, default: null },
        },
        methods: {
            ...mapMutations('proj', ['UPDATE_PROJECT_OBJECT']),
        },
        computed: {
            ...mapGetters('proj', ['projectObjects', 'pageLists', 'activeProcess']),

            pageList: {
                get() {
                    return this.pageLists[this.activeProcess]
                },
                set(pageIDs) {
                    for (let i = 0; i < pageIDs.length ;i++) {
                        let pageID = pageIDs[i];
                        let page = R.clone(this.projectObjects[pageID]);
                        page.relative_position = i+1;
                        console.log(pageID, pageIDs, page);
                        this.UPDATE_PROJECT_OBJECT({ObjectID: pageID, Object: page})
                    }
                }
            }
        }
    };
</script>

<style src="./Connectorbar.scss" lang="scss"></style>
