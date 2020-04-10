<template>
    <div>

        <Toolbar>
            <Toolbox
                    header="input data"

                    :childrenTools="[
                        [
                             {
                             action: 'sampleInputs',
                             id: 'prep-tool-sample-inputs',
                             bigIcon: true,
                             svg: true,
                             tooltip: 'define a sample of the input data',
                             fontIconClass: 'fi flaticon-3d-data-analytics-bars-graphic',
                             svgIconName: 'svg7 - pie-chart',
                             name: 'sample'
                            },
                        ],
                        [
                            {
                             action: 'sampleOnOff',
                             id: 'prep-tool-sample-switch-inputs',
                             bigIcon: false,
                             svg: false,
                             tooltip: 'sample the input data',
                             fontIconClass: 'fi flaticon-data-circular-chart',
                             svgIconName: 'mono - percentage-1',
                             name: 'use sample'
                            },
                            {
                             action: 'refreshInputs',
                             id: 'prep-tool-refresh-all',
                             bigIcon: false,
                             svg: false,
                             tooltip: 'rerun inputs',
                             fontIconClass: 'la la-refresh',
                             svgIconName: 'svg6 - browser-4',
                             name: 'rerun inputs'
                            }
                        ]

                    ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="all prep nodes"
                    :childrenTools="[
                     [
                         {
                         action: 'newAll',
                         id: 'prep-tool-new-all',
                         bigIcon: true,
                         svg: true,
                         tooltip: 'setup a new connector',
                         fontIconClass: 'la la-plus-square',
                         svgIconName: 'svg6 - browser-4',
                         name: 'new prep',
                        }
                     ],
                     [
                         {
                         action: 'runAll',
                         id: 'prep-tool-load-all',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'run all actions',
                         fontIconClass: 'la la-fast-forward',
                         svgIconName: 'svg1 - server-1',
                         name: 'run all',
                        },
                         {
                         action: 'unloadAll',
                         id: 'prep-tool-connect-all',
                         bigIcon: false,
                         svg: false,
                         tooltip: 'unload data from all actions',
                         fontIconClass: 'la la-minus-square',
                         svgIconName: 'svg1 - server',
                         name: 'unload all',
                        },

                     ]
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="prep node controls"
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
