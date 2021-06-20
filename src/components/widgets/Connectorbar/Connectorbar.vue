<template>
    <div class="connector-bar">
        <div class="title-bar" id="connector-bar-title-bar">
            <span class="title">Connections</span>
            <span
                    class="add-connector-button"
                    v-b-modal="'new-connector-explorer'"
            >
                <a @click="addNewConnectorView()">Add</a>
            </span>
<!--            <connector-explorer/>-->
        </div>
        <div class="flex-vertical-no-scroll r-95 ">
            <draggable id="testing-connector-bar" ref="testing-connector-bar" class="flex-vertical " v-model="pageList" handle=".handle">
                <div v-for="(pageID, position) in pageList" >
                    <object-selector
                        v-on:settings = "toggleSettings"
                        :id = "'po-'+pageID+'-'+position"
                        :key="'po-'+pageID+'-'+position"
                        class="handle"
                        :objectID="pageID"
                        showDetail
                        settingsButton
                        detailType="connector_type"
                    />
                    <data-object-settings v-if="openSettings === pageID" :objectID="pageID" tag="connector"/>
                </div>
            </draggable>
        </div>

    </div>
</template>

<script>
    import Vue from "vue";

    const VueScrollTo = require('vue-scrollto');
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ObjectSelector from "../ObjectSelector/ObjectSelector"
    import ConnectorExplorer from "../ConnectorExplorer/ConnectorExplorer"
    import DataObjectSettings from "../../layout/DataObjectSettings/DataObjectSettings"
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'Connectorbar',
        directives: {
            scrollTo: VueScrollTo
        },
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
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DISPLAY_SETTINGS'
            ]),
            toggleSettings(objectID) {
                this.openSettings!==objectID ? this.openSettings = objectID : this.openSettings = null
            },
            handleScroll (event) {
                // let element = this.$refs['div2'];
            },
            addNewConnectorView() {
                let displaySettings = R.clone(this.projectObjects.getPath(this.activeProcess+'.display_settings', {}))
                displaySettings['process_view']=2;
                this.UPDATE_DISPLAY_SETTINGS({
                    ObjectID: this.activeProcess,
                    displaySettings: displaySettings
                });
            },
            checkEmptyPageList(pageList) {
                if (pageList.length==0) {
                    let processView = this.projectObjects.getPath(this.activeProcess+'.display_settings.process_view', null)
                    if (processView===1) {
                        this.addNewConnectorView()
                    }
                }
            }
        },
        computed: {
            ...mapGetters('proj', ['projectObjects', 'pageLists', 'activeProcess', 'activePage']),

            projectObject() {
                return this.projectObjects[this.activePage]
            },
            displaySettings() {
                return this.projectObject['display_settings']
            },

            pageList: {
                get() {
                    return this.pageLists[this.activeProcess]
                },
                set(pageIDs) {
                    for (let i = 0; i < pageIDs.length ;i++) {
                        let pageID = pageIDs[i];
                        let page = R.clone(this.projectObjects[pageID]);
                        page.relative_position = i+1;
                        // console.log(pageID, pageIDs, page);
                        this.UPDATE_PROJECT_OBJECT({ObjectID: pageID, Object: page})
                    }
                }
            }

        },
        watch: {
            pageList(newValue, oldValue) {
                if (newValue.length > oldValue.length) {
                    this.openSettings = newValue[newValue.length-1]
                }
                this.checkEmptyPageList(newValue)
            }
        },
        mounted() {
            this.checkEmptyPageList(this.pageList)
        }
    };
</script>

<style src="./Connectorbar.scss" lang="scss"></style>
