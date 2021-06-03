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
                },
                horizontalBar: {
                    title: {
                        show: false
                    },
                    grid: {
                        show: false,
                        top: '10',
                        bottom: '20'
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            color: axisColor
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: axisColor
                            }
                        },
                        data: [1,2,3,4,5,6]
                    },
                    yAxis: {
                        axisLabel: {
                            color: axisColor
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: axisColor
                            }
                        }
                    },
                    series: [{
                        data: [50,60,70,80,90,100],
                        type: 'bar'
                    }],
                    color: [yellow]
                }
            }
        }
    };
</script>

<style src="./Chart.scss" lang="scss"></style>
