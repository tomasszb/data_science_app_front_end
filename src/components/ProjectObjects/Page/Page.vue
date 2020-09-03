<template>
    <div @click="activatePage(pageID)">
        <b-row>
            <b-col>
                <div
                        v-if="pageID!=editedPage"
                        class="po-page-text"
                        @dblclick="editPage(pageID)">
                    {{projectObjects[pageID].name}}
                </div>
                <input
                        v-if="pageID==editedPage"
                        class="po-page-text"
                        v-focus
                        type="text"
                        v-model="projectObjects[pageID].name"
                        @blur="unblurPage()"
                        @keyup.enter="unblurPage()">
                <i @click="deletePage(pageID)" class="la la-times pill-delete-x fa-xs" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <i class="pill-buttons la-md la la-play float-right ml-1" />
                <i class="pill-buttons la-md la la-file float-right ml-1" />
                <i class="pill-buttons la-md la la-cogs float-right ml-1" />
            </b-col>
        </b-row>

    </div>

</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: 'Page',
        props: {
            pageID: { type: String, default: null },
            active: { type: Boolean, default: false}
        },
        data() {
            return {
                editedPage: null
            }
        },
        directives: {
            focus: {
                inserted (el) {
                    el.focus()
                }
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
            editPage(pageID) {
                this.editedPage = pageID
            },
            unblurPage() {
                this.editedPage = null
            },
            activatePage(pageID) {
                this.setActivePO({selectedProcess:null, selectedPage:pageID, selectedNode:null, selectedElement:null})
            },
            deletePage(pageID) {
                this.deletePO(pageID);
            }
        }
    };
</script>


