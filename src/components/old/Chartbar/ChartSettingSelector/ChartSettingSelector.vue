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
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            toggleActive(alias) {
                let activeElementSettings = R.clone(this.activeElementSettings);
                let displaySettings = R.clone(this.displaySettings);
                let inactiveChartSettings = R.clone(this.inactiveChartSettings);

                if (!inactiveChartSettings.includes(alias)) {
                    inactiveChartSettings.push(alias);
                }
                else {
                    const index = inactiveChartSettings.indexOf(alias);
                    inactiveChartSettings.splice(index, 1);
                }
                activeElementSettings['parameters']['display_settings']['inactive_chart_settings'] = inactiveChartSettings;
                this.UPDATE_PROJECT_OBJECT({ObjectID: activeElementSettings.id, Object: activeElementSettings});

            },
        }
    }
</script>

<style src="ChartSettingSelector.scss" lang="scss"></style>