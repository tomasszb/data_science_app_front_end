<template>
    <div class="conn-page">
        <Toolbar>
            <Toolbox
                    header="all connectors"
                    :childrenTools="[
                     [
                         {
                         action: 'newAll',
                         id: 'conn-tool-new-all',
                         bigIcon: true,
                         svg: true,
                         tooltip: 'setup a new connector',
                         fontIconClass: 'la la-plus-square',
                         svgIconName: 'svg6 - browser-4',
                         name: 'new conn',
                        }
                     ],
                     [
                         {
                         action: 'exportAll',
                         id: 'conn-tool-export-all',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'export all connectors',
                         fontIconClass: 'la la-file-code-o',
                         svgIconName: 'svg3 - invoice',
                         name: 'export all',
                        }
                     ],
                     [
                         {
                         action: 'conectAll',
                         id: 'conn-tool-connect-all',
                         bigIcon: false,
                         svg: false,
                         tooltip: 'connect all connectors',
                         fontIconClass: 'la la-chain',
                         svgIconName: 'svg1 - server',
                         name: 'connect all',
                        },
                        {
                         action: 'loadAll',
                         id: 'conn-tool-load-all',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'load data for all connectors',
                         fontIconClass: 'la la-fast-forward',
                         svgIconName: 'svg1 - server-1',
                         name: 'load all',
                        }
                     ]
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="connector controls"
                    :childrenTools="[
                     {
                         action: 'connectConn',
                         id: 'conn-tool-connect',
                         bigIcon: true,
                         tooltip: 'connect',
                         iconClass: 'la la-chain',
                         svgIconName: 'svg1 - server-1'
                     },
                     {
                         action: 'runConn',
                         id: 'conn-tool-run-conn',
                         bigIcon: true,
                         tooltip: 'run all queries',
                         iconClass: 'la la-forward',
                     },
                     {
                         action: 'settingsConn',
                         id: 'conn-tool-settings-conn',
                         bigIcon: true,
                         tooltip: 'open settings',
                         iconClass: 'la la-cog',
                     },
                     {
                         action: 'exploreConn',
                         id: 'conn-tool-explore-conn',
                         bigIcon: true,
                         tooltip: 'explore',
                         iconClass: 'la la-sitemap',
                     },
                     {
                         action: 'duplicateConn',
                         id: 'conn-tool-duplicate-conn',
                         bigIcon: true,
                         tooltip: 'duplicate connector',
                         iconClass: 'la la-copy',
                     },
                     {
                         action: 'exportConn',
                         id: 'conn-tool-export-conn',
                         bigIcon: true,
                         tooltip: 'export',
                         iconClass: 'la la-file-code-o',
                     },
                     {
                         action: 'saveConn',
                         id: 'conn-tool-save-conn',
                         bigIcon: true,
                         tooltip: 'save connector',
                         iconClass: 'la la-save',
                     },
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="query"
                    :childrenTools="[
                     {
                         action: 'analyzeQuery',
                         id: 'conn-tool-analyze-query',
                         bigIcon: true,
                         tooltip: 'analyze query',
                         iconClass: 'la la-tachometer',
                     },
                     {
                         action: 'runQuery',
                         id: 'conn-tool-run-query',
                         bigIcon: true,
                         tooltip: 'run query',
                         iconClass: 'la la-play',
                     },
                     {
                         action: 'checkpointsQuery',
                         id: 'conn-tool-checkpoint-query',
                         bigIcon: true,
                         tooltip: 'checkpoints',
                         iconClass: 'la la-history',
                     },
                     {
                         action: 'paramsQuery',
                         id: 'conn-tool-params-query',
                         bigIcon: true,
                         tooltip: 'define query parameters',
                         iconClass: 'la la-th-list',
                     },
                     {
                         action: 'saveQuery',
                         id: 'conn-tool-save-query',
                         bigIcon: true,
                         tooltip: 'save query',
                         iconClass: 'la la-save',
                     },
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="editor"
                    :childrenTools="[
                     {
                         action: 'syntax',
                         id: 'conn-tool-syntax',
                         bigIcon: true,
                         tooltip: 'select sql syntax',
                         iconClass: 'la la-code',
                     },
                     {
                         action: 'commentsShowHide',
                         id: 'conn-tool-comments-show-hide',
                         bigIcon: true,
                         tooltip: 'show comments',
                         iconClass: 'la la-comments',
                     },
                     {
                         action: 'autocomplete',
                         id: 'conn-tool-autocomplete',
                         bigIcon: true,
                         tooltip: 'autocomplete',
                         iconClass: 'la la-language',
                     },
                ]"
            />
        </Toolbar>

        <div class="conn-content">
            <b-row class="y-100">
                <b-col md="12" xs="12">
                    <b-tabs class="mb-lg y-100" pills card vertical start>
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
    </div>
</template>

<script>
    import api_store from '../../store/api';
    import Toolbar from "../../components/Toolbar/Toolbar";
    import Toolbox from "../../components/Toolbox/Toolbox";
    import AppIcon from "../../components/AppIcon/AppIcon";

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

<style src="./DataConnectionProcess.scss" lang="scss"></style>

