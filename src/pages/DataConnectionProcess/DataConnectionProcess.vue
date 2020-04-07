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
                         action: 'saveAll',
                         id: 'conn-tool-export-all',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'export all connectors',
                         fontIconClass: 'la la-file-code-o',
                         svgIconName: 'svg3 - invoice',
                         name: 'save all',
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
                     [
                         {
                         action: 'settingsConn',
                         id: 'conn-tool-settings-conn',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'open settings',
                         fontIconClass: 'la la-cog',
                         svgIconName: 'svg5 - settings',
                         name: 'settings'
                         },
                     ],
                     [
                         {
                         action: 'exploreConn',
                         id: 'conn-tool-explore-conn',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'explore',
                         fontIconClass: 'la la-sitemap',
                         svgIconName: 'svg7 - 009-loupe',
                         name: 'explore'
                        },
                     ],
                     [
                         {
                         action: 'connectConn',
                         id: 'conn-tool-connect',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'connect',
                         fontIconClass: 'la la-chain',
                         svgIconName: 'svg1 - server-1',
                         name: 'connect'
                         },
                         {
                         action: 'loadConn',
                         id: 'conn-tool-run-conn',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'run all queries',
                         fontIconClass: 'la la-play',
                         svgIconName: 'svg1 - server-1',
                         name: 'load'
                         },
                     ],
                     [
                         {
                         action: 'duplicateConn',
                         id: 'conn-tool-duplicate-conn',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'duplicate connector',
                         fontIconClass: 'la la-copy',
                         svgIconName: 'svg7 - 011-file-management',
                         name: 'duplicate'
                         },
                         {
                         action: 'deleteConn',
                         id: 'conn-tool-delete-conn',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'delete connector',
                         fontIconClass: 'la la-close',
                         svgIconName: 'svg7 - 011-file-management',
                         name: 'delete'
                         },
                     ]
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="query"
                    :childrenTools="[
                     [
                         {
                         action: 'analyzeQuery',
                         id: 'conn-tool-analyze-query',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'analyze query',
                         fontIconClass: 'la la-tachometer',
                         svgIconName: 'svg3 - microscope',
                         name: 'analyze'
                         },
                     ],
                     [
                         {
                         action: 'paramsQuery',
                         id: 'conn-tool-params-query',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'define query parameters',
                         fontIconClass: 'la la-th-list',
                         svgIconName: 'svg7 - exchange',
                         name: 'parameters'
                         },
                     ],
                     [
                         {
                         action: 'checkpointsQuery',
                         id: 'conn-tool-checkpoints-query',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'show checkpoints',
                         fontIconClass: 'la la-th-list',
                         svgIconName: 'svg4 - push-pin',
                         name: 'checkpoints'
                         },
                     ],

                     [
                         {
                         action: 'saveChekpointQuery',
                         id: 'conn-tool-save-checkpoint-query',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'save checkpoint',
                         fontIconClass: 'la la-save',
                         svgIconName: 'svg1 - server-1',
                         name: 'save checkpoint'
                         },
                         {
                         action: 'runQuery',
                         id: 'conn-tool-run-query',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'run query',
                         fontIconClass: 'la la-play',
                         svgIconName: 'svg1 - server-1',
                         name: 'run'
                         },
                     ],



                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="editor"
                    :childrenTools="[
                     [
                         {
                         action: 'syntax',
                         id: 'conn-tool-syntax',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'select sql syntax',
                         fontIconClass: 'la la-code',
                         svgIconName: 'svg6 - coding',
                         name: 'syntax'
                        },
                     ],
                     [
                         {
                         action: 'commentsShowHide',
                         id: 'conn-tool-comments-show-hide',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'show comments',
                         fontIconClass: 'la la-comments',
                         svgIconName: 'svg6 - coding',
                         name: 'comments'
                        },
                        {
                         action: 'autocomplete',
                         id: 'conn-tool-autocomplete',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'autocomplete',
                         fontIconClass: 'la la-language',
                         svgIconName: 'svg6 - coding',
                         name: 'autocomplete'
                        },
                     ]
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

