<template>
    <Widget
            class="mb-2 chart-data-card"
            title="<h5>Chart<span class='fw-semi-bold'> Data</span></h5>"
            collapse customHeader>

        <div v-for="settings in chartDataFields" v-if="!inactiveChartSettings.includes(settings.selector)">
            <div class="mb-1">{{settings.name}}</div>
            <div class="chart-column-container p-3 pb-3 mb-2"></div>
        </div>

    </Widget>
</template>

<script>
    import Vue from 'vue'
    import {mapGetters} from "vuex";
    export default {
        name: "ChartDataCard",
        props: {
            chartType: { type: String, default: '' },
            chartDataFields: { type: Array },
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters('proj', ['activeElement', 'dataObjects', 'projectObjects']),
            activeElementSettings() {
                return this.projectObjects[this.activeElement]
            },
            displaySettings() {
                return this.activeElementSettings['parameters']['display_settings']
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