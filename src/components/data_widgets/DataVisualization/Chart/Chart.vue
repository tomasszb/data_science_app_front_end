<template>
    <div class="c-100 r-100">
<!--        <pre><code>{{JSON.stringify(options, null, 4)}}</code></pre>-->
        <echart
            :autoresize="true"
            class="c-100 r-100"
            :option="options"
            :init-options="initOptions"
            :key="JSON.stringify(options).hashCode()"
        ></echart>
    </div>
</template>

<script>
    import Vue from 'vue';
    import InfoSectionTable from "@/components/data_widgets/DataColumnExplorer/InfoSectionTable/InfoSectionTable";
    import "echarts";
    import ECharts from 'vue-echarts'
    import { use } from 'echarts/core'
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
                    width: null,
                    height: null
                }
            }
        },
        computed: {
            options() {
                return {
                    ...{
                        'animation': false
                    },
                    ...this.chartData
                }
            }
        }
    };
</script>

<style src="./Chart.scss" lang="scss"></style>
