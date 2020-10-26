<template>
    <div class="node-bar x-100">
        <div class="d-flex justify-content-start">
            <draggable v-model="nodeList" class="d-flex justify-content-start">
                <NodeButton
                        v-for="nodeID in nodeList"
                        class="px-2 py-1 po-node-pill list-element"
                        :class="{'active-node':activeNode==nodeID}"
                        :key="'po-'+nodeID"
                        :nodeID="nodeID"
                        :nodeNameInitial="projectObjects[nodeID].name"
                        :active="activeNode===nodeID"
                />
            </draggable>
            <i class="fa fa-plus px-4 py-3  mb-sm fa-lg list-element node-add" />
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import NodeButton from "./NodeButton/NodeButton"
    import draggable from 'vuedraggable';

    export default {
        name: 'Nodebar',
        components: {
            NodeButton, draggable
        },
        prop: {

        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            ...mapState('proj', [
                'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements'
            ]),

            nodeList: {
                get() {
                    return this.nodeLists[this.activePage]
                },
                set(nodeIDs) {
                    for (let i = 0; i < nodeIDs.length ;i++) {
                        let nodeID = nodeIDs[i];
                        let node = JSON.parse(JSON.stringify(this.projectObjects[nodeID]));
                        node.relative_position = i;
                        this.UPDATE_PROJECT_OBJECT({ObjectId: nodeID, Object:node})
                    }
                }
            }
        }
    };
</script>

<style src="Nodebar.scss" lang="scss"></style>
