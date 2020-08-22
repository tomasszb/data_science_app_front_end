<template>
    <Header>
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
                header="data node controls"
                :childrenTools="[
                     [
                         {
                         action: 'saveNode',
                         id: 'prep-tool-export-node',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'save node',
                         fontIconClass: 'la la-file-code-o',
                         svgIconName: 'svg7 - 017-data-storage',
                         name: 'save',
                        }
                     ],
                     [
                         {
                         action: 'runNode',
                         id: 'prep-tool-run-node',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'run node',
                         fontIconClass: 'la la-play',
                         svgIconName: 'svg1 - server-1',
                         name: 'run',
                        },
                         {
                         action: 'unloadNode',
                         id: 'prep-tool-unload-node',
                         bigIcon: false,
                         svg: false,
                         tooltip: 'unload data',
                         fontIconClass: 'la la-minus-square',
                         svgIconName: 'svg1 - server',
                         name: 'unload',
                        },
                     ],
                     [
                         {
                         action: 'duplicateNode',
                         id: 'prep-tool-duplicate-node',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'duplicate connector',
                         fontIconClass: 'la la-copy',
                         svgIconName: 'svg7 - 011-file-management',
                         name: 'duplicate'
                         },
                         {
                         action: 'deleteNode',
                         id: 'prep-tool-delete-node',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'delete connector',
                         fontIconClass: 'la la-close',
                         svgIconName: 'svg7 - 011-file-management',
                         name: 'delete'
                         }
                     ]
                ]"
        />
        <div class="toolbox-dividor"/>
        <Toolbox
                header="action controls"
                :childrenTools="[
                     [
                         {
                         action: 'settingsAction',
                         id: 'prep-tool-settings-action',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'open action settings',
                         fontIconClass: 'la la-cog',
                         svgIconName: 'svg5 - settings',
                         name: 'settings'
                         },
                     ],
                     [
                         {
                         action: 'runNode',
                         id: 'prep-tool-run-node',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'run node',
                         fontIconClass: 'la la-play',
                         svgIconName: 'svg1 - server-1',
                         name: 'run',
                        },
                         {
                         action: 'unloadNode',
                         id: 'prep-tool-unload-node',
                         bigIcon: false,
                         svg: false,
                         tooltip: 'unload data',
                         fontIconClass: 'la la-minus-square',
                         svgIconName: 'svg1 - server',
                         name: 'unload',
                        },
                     ],
                     [
                         {
                         action: 'duplicateNode',
                         id: 'prep-tool-duplicate-node',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'duplicate connector',
                         fontIconClass: 'la la-copy',
                         svgIconName: 'svg7 - 011-file-management',
                         name: 'duplicate'
                         },
                         {
                         action: 'deleteNode',
                         id: 'prep-tool-delete-node',
                         svg: false,
                         bigIcon: false,
                         tooltip: 'delete connector',
                         fontIconClass: 'la la-close',
                         svgIconName: 'svg7 - 011-file-management',
                         name: 'delete'
                         }
                     ]
                ]"
        />
    </Header>
</template>

<script>
    import Header from "../../AppFeatures/Header/Header"
    import Toolbox from "../../AppFeatures/Toolbox/Toolbox"
    export default {
        name: "DataPreparationToolbar",
        components: {Header, Toolbox}
    }
</script>

<style scoped>

</style>