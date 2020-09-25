<template>
    <div class="chart-type-selector mb-3 py-3" >
        <ChartType
                v-for="(chart, i) in charts"
                :src="chart.chartType"
                :name="chart.name"
                :key="i"
                :active="i===activeChartIndex"
                @click.native="setActive(i)"
        />
    </div>
</template>

<script>
    //import lineChart from '@/assets/charts/line_simple.png';
    import lineChart from '@/assets/charts/line_simple.png'
    import barChart from '@/assets/charts/bar_simple.png';
    import scatterChart from '@/assets/charts/scatter_simple2.png';
    import treeMapChart from '@/assets/charts/treemap_simple.png';
    import mapChart from '@/assets/charts/map_simple.png';
    import lineAreaChart from '@/assets/charts/line_area.png';
    import lineStackedAreaChart from '@/assets/charts/line_stacked_area.png';
    import barStackedChart from '@/assets/charts/bar_stacked.png';
    import pivotTable from '@/assets/charts/table_simple.png';

    import ChartType from "./ChartType/ChartType";

    export default {
        name: "ChartTypeSelector",
        components: {
            ChartType
        },
        data() {
            return {
                charts: [
                    {'name': 'lineChart', 'chartType': lineChart},
                    {'name': 'lineAreaChart', 'chartType': lineAreaChart},
                    {'name': 'lineStackedAreaChart', 'chartType': lineStackedAreaChart},
                    {'name': 'barChart', 'chartType': barChart},
                    {'name': 'barStackedChart', 'chartType': barStackedChart},
                    {'name': 'scatterChart', 'chartType': scatterChart},
                    {'name': 'treeMapChart', 'chartType': treeMapChart},
                    {'name': 'mapChart', 'chartType': mapChart},
                    {'name': 'pivotTable', 'chartType': pivotTable}
                ],
                activeChartIndex: 0,
            }
        },
        methods: {
            setActive(activeChartIndex) {
                this.activeChartIndex = activeChartIndex;
            }
        }
    }
</script>

<style src="./ChartTypeSelector.scss" lang="scss"></style>