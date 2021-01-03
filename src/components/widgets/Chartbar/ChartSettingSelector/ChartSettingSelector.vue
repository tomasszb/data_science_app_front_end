<template>
    <div class="chart-data-picker-panel mb-4">
        <div
                v-for="selector in chartLayoutSelectors"
                class="chart-data-picker"
                @click="toggleActive(selector)"
                :class = "{active: !inactiveChartSettings.includes(selector)}"
        >
            {{selector}}
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    const R = require('ramda');
    import {mapGetters, mapMutations} from "vuex";
    export default {
        name: "ChartDataCard",
        props: {
            chartLayoutSelectors: { type: Array },
        },
        data() {
            return {}
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
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            toggleActive(alias) {
                let activeNodeSettings = R.clone(this.activeNodeSettings);
                let displaySettings = R.clone(this.displaySettings);
                let inactiveChartSettings = R.clone(this.inactiveChartSettings);

                if (!inactiveChartSettings.includes(alias)) {
                    inactiveChartSettings.push(alias);
                }
                else {
                    const index = inactiveChartSettings.indexOf(alias);
                    inactiveChartSettings.splice(index, 1);
                }
                activeNodeSettings['display_settings']['inactive_chart_settings'] = inactiveChartSettings;
                this.UPDATE_PROJECT_OBJECT({ObjectID: activeNodeSettings.id, Object: activeNodeSettings});

            },
        }
    }
</script>

<style src="./ChartSettingSelector.scss" lang="scss"></style>