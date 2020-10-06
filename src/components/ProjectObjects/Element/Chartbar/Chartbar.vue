<template>
    <div class="chart-bar">
<!--        <h4 class="mb-4"><span class='fw-semi-bold'>Chart</span> Settings</h4>-->
        <ChartTypeSelector :chartsSettings="chartsSettings"/>
        <ChartSettingSelector :chartLayoutSelectors="chartLayoutSelectors"/>
<!--        <img :src="" />-->
        <div class="chart-settings p-1">

            <div class="card panel mb-xs" v-for="(card, index) in chartCards">
                <div class="card-header panel-header py-2 px-3 mb-0" role="button" @click="toggleAccordion(index)">
                    <a class="accordion-toggle" role="button">
                        <h5 v-if="card === 'chart-data-card'">chart <strong>Data</strong></h5>
                        <h5 v-if="card === 'chart-layout-card'">chart <strong>Layout</strong></h5>
                        <i :class="`fa fa-angle-down ${(openSettings === card) ? 'expanded' : ''}`" />
                    </a>
                </div>
                <b-collapse id="accordion-second" class="panel-body" :visible="openSettings === card">
                    <div v-if="card === 'chart-data-card'" class="card-body py-1">
                        <ChartDataCard :chartDataFields="chartDataFields"/>
                    </div>
                    <div v-if="card === 'chart-layout-card'" class="card-body py-1">
                        <ChartLayoutCard
                                :chartsLayoutSettings="chartLayoutSettings"
                                :chartLayoutPartPictures="chartLayoutPartPictures"
                                :chartLayoutTypePictures="chartLayoutTypePictures"
                        />
                    </div>
                </b-collapse>
                <div v-if="index===0" class="separator"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapGetters, mapMutations, mapState} from "vuex";
    import draggable from 'vuedraggable';
    import ChartLayoutCard from "./ChartLayoutCard/ChartLayoutCard"
    import ChartTypeSelector from "./ChartTypeSelector/ChartTypeSelector";
    import ChartDataCard from "./ChartDataCard/ChartDataCard";
    import ChartSettingSelector from './ChartSettingSelector/ChartSettingSelector'
    import {chartsDataFields, chartsSettings, chartLayoutPartPictures, chartLayoutTypePictures, chartsLayoutSettings} from "./chartsSettings_new"

    export default {
        name: 'Chartbar',
        components: {
            ChartTypeSelector, ChartDataCard, ChartSettingSelector, ChartLayoutCard,
            draggable
        },
        prop: {

        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            toggleAccordion(index) {
                if (this.openSettings !== this.chartCards[index]) {
                    Vue.set(this,'openSettings', this.chartCards[index]);
                } else {
                    index = (index + 1) % 2;
                    Vue.set(this,'openSettings', this.chartCards[index]);
                }
            },
        },
        data() {
            return {
                chartsSettings: chartsSettings,
                chartsDataFields: chartsDataFields,
                chartLayoutPartPictures: chartLayoutPartPictures,
                chartLayoutTypePictures: chartLayoutTypePictures,
                chartCards: ['chart-data-card', 'chart-layout-card'],
                openSettings: 'chart-data-card'
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists', 'elementLists',
                'activeProcess', 'activePage', 'activeNode', 'activeElement'
            ]),
            ...mapState('proj', [
                'selectedProcess', 'selectedPages', 'selectedNodes', 'selectedElements'
            ]),
            chartSettings() {
                return this.activeChartType in this.chartsSettings ? this.chartsSettings[this.activeChartType] : {}
            },
            layoutElements() {
                return 'layout_elements' in this.chartSettings ? this.chartSettings['layout_elements'] : []
            },
            layoutDataFields() {
                return 'data_fields' in this.chartSettings ? this.chartSettings['data_fields'] : []
            },
            chartDataFields() {
                let result = [];
                for (let field of this.chartsDataFields) {
                    if (this.layoutDataFields.includes(field['alias'])) {
                        result.push(field)
                    }
                }
                return result
            },
            chartLayoutSettings() {
                // chartSettings[this.activeChartType]
                let result = {};

                for (let setting of chartsLayoutSettings) {
                    if (this.layoutElements.includes(setting.element)) {
                        (result[setting.element] = result[setting.element] || []).push(setting);

                    }

                }
                return result
            },
            chartLayoutSelectors() {
                let result = [];

                for(const [index, settings] of Object.entries(this.chartLayoutSettings)) {
                    for (let setting of settings) {
                        if (!result.includes(setting.selector) && setting.selector !== null){
                            result.push(setting.selector)
                        }
                    }
                }
                for (let dataField of this.chartDataFields) {
                    if (!result.includes(dataField.selector) && dataField.selector !== null){
                        result.push(dataField.selector)
                    }
                }
                return result
            },
            pageList: {
                get() {
                    return this.pageLists[this.activeProcess]
                },
                set(pagesIDs) {
                    for (let i = 0; i < pagesIDs.length ;i++) {
                        let pagesID = pagesIDs[i];
                        let page = JSON.parse(JSON.stringify(this.projectObjects[pagesID]));
                        page.relative_position = i;
                        this.UPDATE_PROJECT_OBJECT({ObjectId: pagesID, Object:page})
                    }
                }
            },
            activeElementSettings() {
                return this.projectObjects[this.activeElement]
            },
            activeChartType() {
                return this.activeElementSettings['parameters']['display_settings']['active_chart_type']
            }

        }
    };
</script>

<style src="./Chartbar.scss" lang="scss"></style>
