<template>
    <div class="mb-2 chart-data-card p-2">
        <div v-for="settings in chartDataFields" v-if="!inactiveChartSettings.includes(settings.selector)">
            <div class="chart-column mb-1">
                <div class="chart-column-label mb-1">{{settings.name}} :</div>
                <div class="chart-column-container p-3 pb-3 mb-2"></div>
            </div>
        </div>
    </div>
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

<style src="ChartDataCard.scss" lang="scss"></style>