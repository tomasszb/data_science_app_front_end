<template>
    <div class="chart-type-selector mb-3 py-3" >
        <ChartType
                v-for="(chart, alias) in chartsSettings"
                :src="chart.chartPicture"
                :name="chart.name"
                :key="alias"
                :active="alias===activeChartType"
                @click.native="setActiveChartType(alias)"
        />
    </div>
</template>

<script>
    import ChartType from "./ChartType/ChartType";
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: "ChartTypeSelector",
        props: {
            chartsSettings: { type: Object },
        },
        components: {
            ChartType
        },
        computed: {
            ...mapGetters('proj', ['dataObjects', 'projectObjects', 'activeNode']),
            activeNodeSettings() {
                return this.projectObjects[this.activeNode]
            },
            displaySettings() {
                return this.activeNodeSettings['display_settings']
            },
            activeChartType() {
                return this.activeNodeSettings.getPath('display_settings.active_chart_type', null)
            }
        },
        data() {
            return {
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            setActiveChartType(activeChartAlias) {
                let activeNodeSettings = Object.assign({}, this.activeNodeSettings);
                this.displaySettings['active_chart_type'] = activeChartAlias;
                this.UPDATE_PROJECT_OBJECT({ObjectID: activeNodeSettings.id, Object: activeNodeSettings});
            }
        },
        created() {
            let activeNodeSettings = Object.assign({}, this.activeNodeSettings);

            if (typeof activeNodeSettings['display_settings']['active_chart_type']==='undefined') {
                this.displaySettings['active_chart_type'] = Object.keys(this.chartsSettings)[0];
                this.UPDATE_PROJECT_OBJECT({ObjectID: activeNodeSettings.id, Object: activeNodeSettings});
            }
        }
    }
</script>

<style src="./ChartTypeSelector.scss" lang="scss"></style>