<template>
    <div class="chart-type-selector border-bottom border-light pt-3" >
        <h5 class="px-4 mb-3">
            <strong>
                Chart type
            </strong>
        </h5>
        <div class="px-4 mb-3">
            <ChartType
                v-for="(chart, alias) in chartsSettings"
                :src="chart.chartPicture"
                :name="chart.name"
                :key="alias"
                :active="alias===activeChartType"
                @click.native="setActiveChartType(alias)"
            />
        </div>
        <b-button-group class="c-100 border-top border-light">
            <b-button
                variant="default"
                @click="changeOpenSettings(0)"
                size="sm"
                class="c-50 border-0"
                :class="{ active: displayProcessSettings.getKeyOrDefault('active_chart_setting_selector', 0) === 0 }"
            >Layout & Data</b-button>
            <b-button
                variant="default"
                @click="changeOpenSettings(1)"
                size="sm"
                class="c-50 border-0"
                :class="{ active: displayProcessSettings.getKeyOrDefault('active_chart_setting_selector', 0) === 1 }"
            >Design</b-button>
        </b-button-group>
    </div>
</template>

<script>
    import ChartType from "./ChartType/ChartType";
    import {mapGetters, mapMutations} from "vuex";
    import {getObjectSetting} from "@/core/projectObjectParser";
    import Vue from "vue";
    const R = require('ramda');

    export default {
        name: "ChartTypeSelector",
        props: {
            chartsSettings: { type: Object },
        },
        components: {
            ChartType
        },
        computed: {
            ...mapGetters('proj', ['dataObjects', 'projectObjects', 'activeNode', 'activeProcess']),
            activeNodeSettings() {
                return this.projectObjects[this.activeNode]
            },
            displaySettings() {
                return this.activeNodeSettings['display_settings']
            },
            activeProcessSettings() {
                return this.projectObjects[this.activeProcess]
            },
            displayProcessSettings() {
                return this.activeProcessSettings['display_settings']
            },
            activeChartType() {
                return this.activeNodeSettings.getPath('display_settings.active_chart_type', null)
            },
        },
        data() {
            return {
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DISPLAY_SETTINGS'
            ]),
            setActiveChartType(activeChartAlias) {
                let activeNodeSettings = R.clone(this.activeNodeSettings);
                activeNodeSettings.displaySettings['active_chart_type'] = activeChartAlias;
                this.UPDATE_PROJECT_OBJECT({ObjectID: activeNodeSettings.id, Object: activeNodeSettings});
            },
            changeOpenSettings(value) {
                let displayProcessSettings = R.clone(this.displayProcessSettings);
                displayProcessSettings['active_chart_setting_selector'] = value;
                this.UPDATE_DISPLAY_SETTINGS({
                    ObjectID: this.activeProcess,
                    displaySettings: displayProcessSettings
                })
            }
        },

        mounted() {
            let activeNodeSettings = Object.assign({}, this.activeNodeSettings);

            if (typeof activeNodeSettings['display_settings']['active_chart_type']==='undefined') {
                this.displaySettings['active_chart_type'] = Object.keys(this.chartsSettings)[0];
                this.UPDATE_PROJECT_OBJECT({ObjectID: activeNodeSettings.id, Object: activeNodeSettings});
            }
        }
    }
</script>

<style src="./ChartTypeSelector.scss" lang="scss"></style>