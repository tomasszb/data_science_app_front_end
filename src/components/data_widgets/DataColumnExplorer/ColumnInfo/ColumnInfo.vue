<template>
    <b-row class="col-explorer-col-info">
        <div class="c-40 pt-3">
            <info-section-table
                :sectionData="columnStats['eda']['general-page1']"
            />
        </div>
        <div class="c-60">
            <echart v-if="columnStats['type'] === 'Numeric'" :options="horizontalBar" :init-options="initOptions"></echart>
            <echart v-if="columnStats['type'] === 'Categorical'" :options="verticalBar" :init-options="initOptions"></echart>
        </div>
        <div class="c-100">
            <div
                v-for="(section, index) in sections"
                class="card panel mb-xs mt-4" :key="`accord-one-${index.toString()}`">
                <div
                    class="card-header panel-header bg-light" role="button"
                    @click="toggleAccordion(index)"
                >
                    <div class="mb-0">
                        <div class="accordion-toggle col-explorer-col-info-accordion-toggle" role="button">
                            <h5>Detail</h5>
                            <i :class="`fa fa-angle-down ${openedColumns.indexOf(index) >= 0 ? 'expanded' : ''}`" />
                        </div>
                    </div>
                </div>
                <b-collapse id="accordion-first" class="panel-body" :visible="openedColumns.indexOf(index) >= 0">
                    <div class="card-body">
                        <info-section-table
                            :sectionData="columnStats['eda'][section]"
                        />
                    </div>
                </b-collapse>
            </div>
        </div>
    </b-row>
</template>

<script>
    import Vue from 'vue';
    import InfoSectionTable from "@/components/data_widgets/DataColumnExplorer/InfoSectionTable/InfoSectionTable";
    import ECharts from 'vue-echarts/components/ECharts';
    import 'echarts/lib/chart/bar';
    import config from '../../../../config';
    const {info, primary, danger, warning, success, textColor, yellow, secondary} = config.app.colors;
    const {axisColor} = config.app.chartColors;

    function randomize() {
        return [0, 0, 0].map(() => {
            return Math.round(300 + Math.random() * 700) / 10
        })
    }

    export default {
        name: 'ColumnInfo',
        components: {
            InfoSectionTable, echart: ECharts
        },
        props: {
            columnStats: {type: Object, default: function() {return {}}}
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
                        data: this.columnStats['histogram']['bins']
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
                        data: this.columnStats['histogram']['counts'],
                        type: 'bar'
                    }],
                    color: [yellow]
                },
                verticalBar: {
                    title: {
                        show: false
                    },
                    grid: {
                        show: false,
                        top: '10',
                        left: '50%',
                        bottom: '20'
                    },
                    yAxis: {
                        type: 'category',
                        axisLabel: {
                            color: axisColor,
                            align: 'right'
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: axisColor
                            }
                        },
                        data: this.columnStats['histogram']['bins']
                    },
                    xAxis: {
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
                        splitNumber: 3
                    },
                    series: [{
                        data: this.columnStats['histogram']['counts'],
                        type: 'bar'
                    }],
                    color: [yellow]
                },
            }
        },
        computed: {
          sections() {
              if (this.columnStats['type']==="Numeric") {
                  return ["general-page2"]
              } else {
                  return []
              }
            }
        },
        methods: {
            toggleAccordion(index) {
                let arrayIndex = this.openedColumns.indexOf(index)
                if (arrayIndex>=0) {
                    this.openedColumns.splice(arrayIndex, 1)
                } else {
                    this.openedColumns.push(index)
                }
            }
        }
    };
</script>

<style src="./ColumnInfo.scss" lang="scss"></style>
