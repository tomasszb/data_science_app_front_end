<template>
    <div class="connector-bar">
        <div class="title-bar">
            <span class="title">Connections</span>
            <span
                    class="add-connector-button"
                    v-b-modal="'connector-explorer'"
            >
                <a>Add</a>
            </span>
            <connector-form/>
        </div>
        <div class="d-flex justify-content-start align-items-center flex-vertical">
            <draggable v-model="pageList" class="d-flex justify-content-start flex-vertical">
                <object-selector
                        v-for="pageID in pageList"
                        :key="'po-'+pageID"
                        :objectID="pageID"
                        activeBorder
                        rounded
                />
            </draggable>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ObjectSelector from "../ObjectSelector/ObjectSelector"
    import ConnectorForm from "../ConnectorForm/ConnectorForm"
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'Connectorbar',
        components: {
            ObjectSelector, ConnectorForm, draggable
        },
        props: {
            objectType: { type: String, default: null },
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'pageLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            ...mapState('proj', [
                'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements'
            ]),

            pageList: {
                get() {
                    return this.pageLists[this.activeProcess]
                },
                set(pageIDs) {
                    for (let i = 0; i < pageIDs.length ;i++) {
                        let pageID = pageIDs[i];
                        let node = R.clone(this.projectObjects[pageID]);
                        node.relative_position = i;
                        this.UPDATE_PROJECT_OBJECT({ObjectId: pageID, Object: node})
                    }
                }
            }
        }
    };
</script>

<style src="./Connectorbar.scss" lang="scss"></style>
