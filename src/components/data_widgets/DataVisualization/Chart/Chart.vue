<template>
    <div>
        <echart :options="chartData" :init-options="initOptions"></echart>

    </div>
</template>

<script>
    import Vue from 'vue';
    import InfoSectionTable from "@/components/data_widgets/DataColumnExplorer/InfoSectionTable/InfoSectionTable";
    import ECharts from 'vue-echarts/components/ECharts';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import config from '../../../../config';
    const {info, primary, danger, warning, success, textColor, yellow, secondary} = config.app.colors;
    const {axisColor} = config.app.chartColors;

    function randomize() {
        return [0, 0, 0].map(() => {
            return Math.round(300 + Math.random() * 700) / 10
        })
    }

    export default {
        name: 'Chart',
        components: {
            InfoSectionTable, echart: ECharts
        },
        props: {
            chartData: {type: Object}
        },
        data() {
            return {
                openedColumns: [],
                initOptions: {
                    renderer: 'canvas',
                    width: '400',
                    height: '180'
                }
            }
        }
    };
</script>

<style src="./Chart.scss" lang="scss"></style>
