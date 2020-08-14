<template>
    <div id="po-conn-toolbar">
        <Toolbar>
            <Toolbox
                    header="all connectors"
                    :childrenTools="[
                     [
                         {
                         action: 'directive',
                         id: 'conn-tool-new-all',
                         bigIcon: true,
                         svg: true,
                         directive: 'new-connector',
                         tooltip: 'setup a new connector',
                         fontIconClass: 'la la-plus-square',
                         svgIconName: 'svg6 - browser-4',
                         name: 'new conn',
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
                    @toolClicked="onToolClick"
                    header="connector controls"
                    :childrenTools="[
                     [
                         {
                         action: 'directive',
                         id: 'conn-tool-settings-conn',
                         svg: true,
                         directive: 'settings-connector',
                         bigIcon: true,
                         tooltip: 'open settings',
                         fontIconClass: 'la la-cog',
                         svgIconName: 'svg5 - settings',
                         name: 'settings'
                         },
                     ],
                     [
                         {
                         action: 'saveConn',
                         id: 'conn-tool-export-all',
                         svg: true,
                         bigIcon: true,
                         tooltip: 'export all connectors',
                         fontIconClass: 'la la-file-code-o',
                         svgIconName: 'svg7 - 017-data-storage',
                         name: 'save',
                        }
                     ],
                     [
                         {
                         action: 'directive',
                         id: 'conn-tool-explore-conn',
                         svg: true,
                         directive: 'connector-explorer',
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
    </div>
</template>

<script>
    export default {
        name: "DataConnectionToolbar"
    }
</script>

<style scoped>

</style>