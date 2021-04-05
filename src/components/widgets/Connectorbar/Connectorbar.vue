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
        <draggable id="testing-connector-bar" class="flex-vertical r-95" v-model="pageList">
            <div v-for="(pageID, position) in pageList">
                <object-selector
                  v-on:settings = "toggleSettings"
                  :key="'po-'+pageID"
                  :objectID="pageID"
                  showDetail
                  settingsButton
                  detailType="connector_type"
                />
                <data-object-settings v-if="openSettings === pageID" :objectID="pageID" tag="connector"/>
            </div>
        </draggable>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ObjectSelector from "../ObjectSelector/ObjectSelector"
    import ConnectorExplorer from "../ConnectorExplorer/ConnectorExplorer"
    import DataObjectSettings from "../../layout/DataObjectSettings/DataObjectSettings"
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'Connectorbar',
        data() {
            return {
              openSettings: null
            }
        },
        components: {
            ObjectSelector, ConnectorExplorer, draggable, DataObjectSettings
        },
        props: {
            objectType: { type: String, default: null },
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            toggleSettings(objectID) {
                this.openSettings!==objectID ? this.openSettings = objectID : this.openSettings = null
            },
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
