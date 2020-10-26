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
            ...mapGetters('proj', ['activeElement', 'dataObjects', 'projectObjects']),
            activeElementSettings() {
                return this.projectObjects[this.activeElement]
            },
            displaySettings() {
                return this.activeElementSettings['parameters']['display_settings']
            },
            activeChartType() {
                return this.activeElementSettings['parameters']['display_settings']['active_chart_type']
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
                let activeElementSettings = Object.assign({}, this.activeElementSettings);
                this.displaySettings['active_chart_type'] = activeChartAlias;
                this.UPDATE_PROJECT_OBJECT({ObjectID: activeElementSettings.id, Object: activeElementSettings});
            }
        },
        created() {
            let activeElementSettings = Object.assign({}, this.activeElementSettings);

            if (typeof activeElementSettings['parameters']['display_settings']['active_chart_type']==='undefined') {
                this.displaySettings['active_chart_type'] = Object.keys(this.chartsSettings)[0];
                this.UPDATE_PROJECT_OBJECT({ObjectID: activeElementSettings.id, Object: activeElementSettings});
            }
        }
    }
</script>

<style src="ChartTypeSelector.scss" lang="scss"></style>