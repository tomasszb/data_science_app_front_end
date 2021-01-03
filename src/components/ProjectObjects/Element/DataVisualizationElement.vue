<template>
    <div>
        <Chartbar/>
        <Widget
                title=""
                class="chart-area"
                refresh settings customHeader fullscreen
                :showLoader="false"
        >
            <echart :options="bar" :init-options="initOptions"></echart>
        </Widget>
    </div>
</template>



<script>
    import { mapState, mapGetters, mapActions} from "vuex";
    import Chartbar from "../../widgets/Chartbar/Chartbar"
    import { initProjectBranches, initProcessBranches, createFlowRequest, getUpstreamElements } from '@/core/projectManager';
    import ECharts from 'vue-echarts/components/ECharts';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/chart/scatter';
    import 'echarts/lib/chart/gauge';
    import 'echarts/lib/component/polar';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/legend';

    import config from '../../../config';
    const {info, primary, danger, warning, success, textColor} = config.app.colors;
    const {axisColor} = config.app.chartColors;

    function randomize() {
        return [0, 0, 0].map(() => {
            return Math.round(300 + Math.random() * 700) / 10
        })
    }

    export default {
        name: 'Element',
        components: {Chartbar, echart: ECharts},
        data() {
            return {
                request: null,
                initOptions: {
                    renderer: 'canvas'
                }
            }
        },
        methods: {
            ...mapActions('proj/object_manager',['setActivePO']),

            runFlow() {
                let request = createFlowRequest(
                    this.elementLists,
                    this.projectObjects,
                    this.dataObjects,
                    {}
                );
                this.request = request;
            }
        },
        computed: {
            ...mapState('proj', [
                'projectData',
                'dataFrames',
                'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements'
            ]),
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            bar() {
                return {
                    tooltip: {},
                    dataset: {
                        source: [
                            ['Product', '2015', '2016', '2017'],
                            ['Matcha Latte', ...randomize()],
                            ['Milk Tea', ...randomize()],
                            ['Cheese Cocoa', ...randomize()],
                            ['Walnut Brownie', ...randomize()]
                        ]
                    },
                    xAxis: {
                        type: 'category',
                        legend: {
                            textStyle: {
                                color: textColor
                            }
                        },
                        axisLabel: {
                            color: axisColor
                        },
                        axisLine: {
                            lineStyle: {
                                color: axisColor
                            }
                        }
                    },
                    yAxis: {
                        axisLabel: {
                            color: axisColor
                        },
                        axisLine: {
                            lineStyle: {
                                color: axisColor
                            }
                        }
                    },
                    series: [{type: 'bar'}, {type: 'bar'}, {type: 'bar'}],
                    color: [primary, success, danger]
                }
            },
            dataFrame() {
                console.log(this.dataFrames);
                return this.dataFrames['11-run'];
            },
            columns() {
                return ['Year', 'Player', 'Pos', 'Age', 'Tm']
            },
            options() {
                return {
                    filterByColumn: true,
                    perPage: 10,
                    pagination: { chunk: 10, dropdown: false },
                    filterable: ['Year', 'Player', 'Pos', 'Age', 'Tm'],
                }
            },
        }
    };
</script>


