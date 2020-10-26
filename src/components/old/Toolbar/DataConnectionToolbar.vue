<template>
    <div id="po-conn-toolbar">
        <Header>
            <div class="toolbox-dividor"/>
            <b-nav>
                <Toolbox
                        @toolClicked="onToolClick"
                        name="new conn"
                        status="active"
                        id="conn-tool-new"
                        tooltip="setup a new connector"
                        baseIcon="la la-plus-square"
                />
                <Toolbox
                        @toolClicked="runConnector"
                        name="run"
                        status="active"
                        id="conn-tool-run"
                        tooltip="run active connector"
                        baseIcon="la la-play"
                        :statusIcon="{'running': 'la la-pause'}"
                />
                <Toolbox
                        @toolClicked="onToolClick"
                        name="run all"
                        status="active"
                        id="conn-tool-run-all"
                        tooltip="run all connectors"
                        baseIcon="la la-forward"
                        :statusIcon="{'running': 'la la-pause'}"
                />
            </b-nav>
            <div class="toolbox-dividor"/>
            <b-nav>
                <Toolbox
                        @toolClicked="onToolClick"
                        name="show query"
                        status="selected"
                        id="conn-tool-show-query"
                        tooltip="show query"
                        baseIcon="la-file-code-o"
                />
                <Toolbox
                        @toolClicked="onToolClick"
                        name="show columns"
                        status="inactive"
                        id="conn-tool-show-columns"
                        tooltip="show column definitions"
                        baseIcon="la la-list-ol"
                />
                <Toolbox
                        @toolClicked="onToolClick"
                        name="show data"
                        status="inactive"
                        id="conn-tool-show-data"
                        tooltip="show data"
                        baseIcon="la la-table"
                />
            </b-nav>
        </Header>
    </div>
</template>

<script>
    import Header from "../../widgets/Header/Header"
    import Toolbox from "../../ui/Toolbox/Toolbox"
    import { createFlowRequest } from '@/core/projectManager';
    import {mapGetters, mapState} from "vuex";
    export default {
        name: "DataConnectionToolbar",
        components: {Header, Toolbox},
        computed: {
            ...mapState('proj', [
                'projectData',
                'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements'
            ]),
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ])
        },
        data() {
            return {
                status: {
                    'conn-tool-new': 'active',
                    'conn-tool-run': 'active',
                    'conn-tool-run-all': 'active',
                    'conn-tool-show-columns': 'active',
                    'conn-tool-show-query': 'active',
                    'conn-tool-show-data': 'active'
                }
            }
        },
        methods: {
            runConnector() {
                let request = createFlowRequest({}, [this.activeElement]);
                this.$newRequest(request['request']['src_request_id'], request['request']['elements'].length);
                this.$webSocketSend(request);
            },
            onToolClick(toolID) {
                let request = null;
                if (toolID === 'conn-tool-run') {
                    request = createFlowRequest({}, [this.activeElement]);
                }
                if (request != null) {
                    this.$newRequest(request['request']['src_request_id'], request['request']['elements'].length);
                    this.$webSocketSend(request);
                }
            }
        }
    }
</script>

<style scoped>

</style>
