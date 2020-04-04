<template>
    <div>
        <Toolbar>
            <Toolbox
                    header="all connectors"
                    :childrenTools="[
                     {
                         action: 'conectAll',
                         bigIcon: true,
                         tooltip: 'connect all connectors',
                         iconClass: 'fa fa-chain',
                     },
                     {
                         action: 'loadAll',
                         bigIcon: true,
                         tooltip: 'load data for all connectors',
                         iconClass: 'fa fa-fast-forward',
                     },
                     {
                         action: 'new',
                         bigIcon: true,
                         tooltip: 'setup a new connector',
                         iconClass: 'fa fa-plus-square',
                     },
                     {
                         action: 'export',
                         bigIcon: true,
                         tooltip: 'export all connectors',
                         iconClass: 'fa fa-file-code-o',
                     },
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="connector controls"
                    :childrenTools="[
                     {
                         action: 'connect',
                         bigIcon: true,
                         tooltip: 'connect',
                         iconClass: 'fa fa-chain',
                     },
                     {
                         action: 'runAll',
                         bigIcon: true,
                         tooltip: 'run all queries',
                         iconClass: 'fa fa-forward',
                     },
                     {
                         action: 'settings',
                         bigIcon: true,
                         tooltip: 'open settings',
                         iconClass: 'fa fa-cog',
                     },
                     {
                         action: 'explore',
                         bigIcon: true,
                         tooltip: 'explore',
                         iconClass: 'fa fa-sitemap',
                     },
                     {
                         action: 'duplicate',
                         bigIcon: true,
                         tooltip: 'duplicate connector',
                         iconClass: 'fa fa-copy',
                     },
                     {
                         action: 'export',
                         bigIcon: true,
                         tooltip: 'export',
                         iconClass: 'fa fa-file-code-o',
                     },
                     {
                         action: 'save',
                         bigIcon: true,
                         tooltip: 'save connector',
                         iconClass: 'fa fa-save',
                     },
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="query"
                    :childrenTools="[
                     {
                         action: 'analyze',
                         bigIcon: true,
                         tooltip: 'analyze query',
                         iconClass: 'fa fa-tachometer',
                     },
                     {
                         action: 'runQuery',
                         bigIcon: true,
                         tooltip: 'run query',
                         iconClass: 'fa fa-play',
                     },
                     {
                         action: 'showCheckpoints',
                         bigIcon: true,
                         tooltip: 'checkpoints',
                         iconClass: 'fa fa-history',
                     },
                     {
                         action: 'parameters',
                         bigIcon: true,
                         tooltip: 'define query parameters',
                         iconClass: 'fa fa-th-list',
                     },
                     {
                         action: 'save',
                         bigIcon: true,
                         tooltip: 'save query',
                         iconClass: 'fa fa-save',
                     },
                ]"
            />
            <div class="toolbox-dividor"/>
            <Toolbox
                    header="query"
                    :childrenTools="[
                     {
                         action: 'syntax',
                         bigIcon: true,
                         tooltip: 'select sql syntax',
                         iconClass: 'fa fa-code',
                     },
                     {
                         action: 'showHide',
                         bigIcon: true,
                         tooltip: 'show comments',
                         iconClass: 'fa fa-comments',
                     },
                     {
                         action: 'autocomplete',
                         bigIcon: true,
                         tooltip: 'autocomplete',
                         iconClass: 'fa fa-language',
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
    import Toolbox from "../../components/Toolbox/Toolbox";

    export default {
        name: 'DataConnectionProcess',
        components: {Toolbar, Toolbox},
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
