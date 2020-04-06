<template>
    <div>

        <Toolbar>
            <Toolbox
                    header="input data"
                    :childrenTools="[
                     {
                         action: 'refreshInputs',
                         id: 'prep-tool-refresh-all',
                         bigIcon: true,
                         tooltip: 'refresh inputs',
                         iconClass: 'la la-refresh',
                     },
                     {
                         action: 'sampleInputs',
                         id: 'prep-tool-sample-inputs',
                         bigIcon: true,
                         tooltip: 'use only a sample of input data',
                         iconClass: 'fi flaticon-3d-data-analytics-bars-graphic',
                     },
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="all nodes"
                    :childrenTools="[
                     {
                         action: 'runAll',
                         id: 'prep-tool-run-all',
                         bigIcon: true,
                         tooltip: 'connect all connectors',
                         iconClass: 'la la-chain',
                     },
                     {
                         action: 'unloadAll',
                         id: 'prep-tool-unload-all',
                         bigIcon: true,
                         tooltip: 'load data for all connectors',
                         iconClass: 'la la-fast-forward',
                     },
                     {
                         action: 'newAll',
                         id: 'prep-tool-new-all',
                         bigIcon: true,
                         tooltip: 'setup a new connector',
                         iconClass: 'la la-plus-square',
                     },
                     {
                         action: 'exportAll',
                         id: 'prep-tool-export-all',
                         bigIcon: true,
                         tooltip: 'export all connectors',
                         iconClass: 'la la-file-code-o',
                     },
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="node controls"
                    :childrenTools="[
                     {
                         action: 'runNode',
                         id: 'prep-tool-run-node',
                         bigIcon: true,
                         tooltip: 'run node',
                         iconClass: 'la la-forward',
                     },
                     {
                         action: 'unloadNode',
                         id: 'prep-tool-unload-node',
                         bigIcon: true,
                         tooltip: 'unload node',
                         iconClass: 'la la-cog',
                     },
                     {
                         action: 'duplicateNode',
                         id: 'prep-tool-duplicate-node',
                         bigIcon: true,
                         tooltip: 'duplicate node',
                         iconClass: 'la la-sitemap',
                     },
                     {
                         action: 'exportNode',
                         id: 'prep-tool-export-node',
                         bigIcon: true,
                         tooltip: 'export node',
                         iconClass: 'la la-file-code-o',
                     },
                     {
                         action: 'saveNode',
                         id: 'prep-tool-save-node',
                         bigIcon: true,
                         tooltip: 'save connector',
                         iconClass: 'la la-save',
                     },
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="action controls"
                    :childrenTools="[
                     {
                         action: 'runAction',
                         id: 'prep-tool-run-action',
                         bigIcon: true,
                         tooltip: 'run node',
                         iconClass: 'la la-play',
                     },
                     {
                         action: 'unloadAction',
                         id: 'prep-tool-unload-action',
                         bigIcon: true,
                         tooltip: 'unload node',
                         iconClass: 'la la-cog',
                     },
                     {
                         action: 'settingsAction',
                         id: 'prep-tool-settings-action',
                         bigIcon: true,
                         tooltip: 'open settings',
                         iconClass: 'la la-cog',
                     },
                     {
                         action: 'duplicateAction',
                         id: 'prep-tool-duplicate-action',
                         bigIcon: true,
                         tooltip: 'duplicate node',
                         iconClass: 'la la-sitemap',
                     },
                     {
                         action: 'exportAction',
                         id: 'prep-tool-export-action',
                         bigIcon: true,
                         tooltip: 'export node',
                         iconClass: 'la la-file-code-o',
                     },
                     {
                         action: 'saveAction',
                         id: 'prep-tool-save-action',
                         bigIcon: true,
                         tooltip: 'save connector',
                         iconClass: 'la la-save',
                     },
                ]"
            />
        </Toolbar>

        <b-row >
            <b-col md="12" xs="12">
                <b-tabs class="mb-lg" pills card vertical start>
                    <b-tab  v-for="(page, i) in pageNodes"
                            :key="'po-'+page.id"
                            :title="page.name"
                            :active="activePage == i"
                            @click="activePage = i"
                    >
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>


    </div>
</template>

<script>
    import api_store from '../../store/api';
    import Toolbar from "../../components/Toolbar/Toolbar";
    import AppIcon from "../../components/AppIcon/AppIcon";
    import Toolbox from "../../components/Toolbox/Toolbox";

    export default {
        name: 'DataConnectionProcess',
        components: {Toolbar, Toolbox, AppIcon},
        data() {
            return {
                activePage : 0,
            }
        },
        computed: {
            processID() {
                return '1'
            },
            processPages () {
                let pages = [];
                if (this.processID in api_store.state.projectPages){
                    pages = api_store.state.projectPages[this.processID]
                }
                return pages
            },
            pageNodes () {
                let nodes = [];
                window.console.log(this.processPages);
                this.processPages.forEach(function (page) {
                    nodes = nodes.concat(api_store.state.projectNodes[page.id])
                });
                return nodes
            },
        }
    };
</script>
