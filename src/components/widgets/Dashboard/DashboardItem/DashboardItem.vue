<template>
    <div class="grid-stack-item" v-bind="gridStackAttributes" @click="emitEvent('activate-node')">
        <div class="grid-stack-item-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: 'ColumnButton',
        props: {
            // dashboardItemSettings: { type: Object },
            index: {},
            grid: {},
            dataObjectID: {}
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects'
            ]),
            dataObjectParameters() {
                return this.dataObjects[this.dataObjectID]['parameters']
            },
            dashboardItemSettings() {
                return 'items' in this.dataObjectParameters ? this.dataObjectParameters['items'][this.index] : []
            },
            gridStackAttributes() {
                return {
                    id: this.dashboardItemSettings['id'],
                    "gs-id": this.dashboardItemSettings["id"],
                    "gs-x": this.dashboardItemSettings["layout"]["x"],
                    "gs-y": this.dashboardItemSettings["layout"]["y"],
                    "gs-w": this.dashboardItemSettings["layout"]["w"],
                    "gs-h": this.dashboardItemSettings["layout"]["h"],
                };
            }
        },
        methods: {
            ...mapActions('proj/object_manager', [
                'setActivePO', 'deletePO'
            ]),
            emitEvent(eventName) {
                this.$emit(eventName)
            },
        },
        mounted() {
            // console.log('gridStackAttributes', this.gridStackAttributes);
            // this.grid.makeWidget(this.gridStackAttributes["gs-id"]);
        }
    };
</script>

<style src="./DashboardItem.scss" lang="scss"></style>

