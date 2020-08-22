<template>
    <div>
        <div
                v-if="pageID!=editedPage"
                class="po-page-text"
                @click="activatePage(pageID)"
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
                this.setActivePO(null, pageID, null, null);
            },
            deletePage(pageID) {
                this.deletePO(pageID);
            }
        }
    };
</script>


