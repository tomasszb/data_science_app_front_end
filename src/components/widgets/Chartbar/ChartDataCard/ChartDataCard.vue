<template>
    <div class="mb-2 chart-data-card p-2">
        <div v-for="settings in chartDataFields" v-if="!inactiveChartSettings.includes(settings.selector)">
            <div class="chart-column mb-1">
                <div class="chart-column-label mb-1">{{settings.name}} :</div>
                <form-container
                        :route="[]"
                        :parameterIndex="settings.name"
                        typeSettings="column_list"
                        :objectID="'19'"
                        :showLabel="false"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import draggable from 'vuedraggable';
    import {mapGetters} from "vuex";
    import FormContainer from "../../../forms/container/FormContainer/FormContainer";

    export default {
        name: "ChartDataCard",
        components: {
            draggable, FormContainer
        },
        props: {
            chartType: { type: String, default: '' },
            chartDataFields: { type: Array },
        },
        data() {
            return {
                columnList: []
            }
        },
        computed: {
            ...mapGetters('proj', ['activeNode', 'dataObjects', 'projectObjects']),
            activeNodeSettings() {
                return this.projectObjects[this.activeNode]
            },
            displaySettings() {
                return this.activeNodeSettings['display_settings']
            },
            inactiveChartSettings() {
                return (this.displaySettings['inactive_chart_settings'] = this.displaySettings['inactive_chart_settings'] || [])
            }
        },
        methods: {
            // toggleActive(settingIndex) {
            //     Vue.set(this.chartDataSettings[settingIndex], 'active', !this.chartDataSettings[settingIndex].active);
            // }
        }
    }
</script>

<style src="./ChartDataCard.scss" lang="scss"></style>