<template>
    <div>
        <b-button type="submit" @click="runFlow" size="sm" class="auth-btn mb-3" variant="info">run request</b-button>
        <br>
        {{request}}
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions} from "vuex";
    import { initProjectBranches, initProcessBranches, createFlowRequest, getUpstreamElements } from '@/core/projectManager';

    export default {
        name: 'Element',
        data() {
            return {
                request: null
            }
        },
        methods: {
            ...mapActions('proj/object_manager',['setActivePO']),

            runFlow() {
                let src_request_id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
                let projectID = this.projectData['project_id'];
                let ownerID = this.projectData['owner_id'];
                let upstreamElements = getUpstreamElements(this.projectObjects, this.elementLists, [], [this.activeElement]);
                let request = createFlowRequest(
                    this.elementLists,
                    upstreamElements,
                    this.projectObjects,
                    projectID,
                    ownerID,
                    this.dataObjects,
                    src_request_id,
                    {}
                );
                this.request = request;
                this.$newRequest(src_request_id, request['request']['elements'].length);
                this.$webSocketSend(request);
            }
        },
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
        }
    };
</script>


