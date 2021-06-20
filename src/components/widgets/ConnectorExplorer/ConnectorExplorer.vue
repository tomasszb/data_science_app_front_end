<template>
    <div id="new-connector-explorer">
        <connector-form :dataObjectID="dataObjectID" :tag="tag" type="new"/>
<!--        <connector-form :dataObjectID="activeDataObjectID" :tag="tag" type="existing"/>-->
        <button @click="goto('po-1160')">click here</button>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState, mapActions} from "vuex";
    import ConnectorForm from "../ConnectorForm/ConnectorForm";
    import draggable from 'vuedraggable';
    const R = require('ramda');

    export default {
        name: 'ConnectorExplorer',
        components: {
            ConnectorForm, draggable
        },
        data() {
          return {
              tag: 'connector',
              connectorFilter: '',
              activeConnectorType: '',
              elementName: '',
              dataObjectID: ''
          }
        },
        props: {
            objectType: { type: String, default: null },
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DATA_OBJECT',
            ]),
            ...mapActions('proj/object_manager', [
                'newPage'
            ]),
            disableActive() {
                // this.activeConnectorType = ''
            },
            goto(refName) {
                let element = document.querySelector("#"+refName);
                let content = document.querySelector("#testing-connector-bar");
                content.scrollTop= element.offsetTop-content.offsetTop;
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'activePage', 'activeNode'
            ]),
            activeDataObjectID() {
                return this.projectObjects.getPath(this.activePage+'.data_object_tags.connector', null)
            }
        }
    };
</script>

<style src="./ConnectorExplorer.scss" lang="scss"></style>
