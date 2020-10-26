<template>
    <div @click="activateNode(nodeID)">
        <b-row class="p-0 m-0">
            <b-col class="p-0 m-0">
                <div
                        v-if="nodeID!=editedNode"
                        class="po-node-text"
                        @dblclick="editNode(nodeID)">
                    {{nodeName}}
                </div>
                <span
                        v-if="nodeID==editedNode"
                        v-focus
                        @keydown="checkInputText"
                        @blur="unblurNode"
                        class="input po-node-text"
                        role="textbox"
                        contenteditable>{{nodeName}}</span>
                <i @click="deleteNode(nodeID)" class="ml-2 la la-times pill-delete-x fa-xs pill-buttons"  />
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: 'NodeButton',
        props: {
            nodeID: { type: String, default: null },
            nodeNameInitial: { type: String, default: null },
            active: { type: Boolean, default: false},
        },
        data() {
            return {
                editedNode: null,
                nodeName: this.nodeNameInitial,
                maxInputTextLen: 40,
            }
        },
        directives: {
            focus: {
                inserted (el) {
                    el.focus()
                }
            }
        },
        watch: {
            nodeName: {
                handler(newValue, previousValue) {
                    let node = JSON.parse(JSON.stringify(this.projectObjects[this.nodeID]));
                    node.name = newValue;
                    this.UPDATE_PROJECT_OBJECT({ObjectId: this.nodeID, Object:node})
                },
                deep: true
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects'
            ]),
        },
        methods: {
            ...mapActions('proj/object_manager', [
                'setActivePO', 'deletePO'
            ]),
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            checkInputText(e) {
                if(e.key=='Escape') {
                    this.unblurNode();
                }
                else if(e.key=='Enter') {
                    this.unblurNode();
                    this.nodeName = e.target.innerText;
                }
                else if(e.target.innerText.length>=this.maxInputTextLen && e.key!=='Backspace' && e.key!=='Delete') {
                    e.preventDefault();
                }
            },
            onInput(e) {
                this.unblurNode();
                this.nodeName = e.target.innerText;
            },
            editNode(nodeID) {
                this.editedNode = nodeID
            },
            unblurNode() {
                this.editedNode = null
            },
            activateNode(nodeID) {
                this.setActivePO({selectedProcess: null, selectedPage: null, selectedNode: nodeID, selectedElement: null})
            },
            deleteNode(nodeID) {
                this.deletePO(nodeID);
            }
        }
    };
</script>


