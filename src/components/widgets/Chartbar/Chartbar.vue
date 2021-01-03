<template>
    <div class="chart-bar">
<!--        <h4 class="mb-4"><span class='fw-semi-bold'>Chart</span> Settings</h4>-->
        <ChartTypeSelector :chartsSettings="chartsSettings"/>
        <ChartSettingSelector :chartLayoutSelectors="chartLayoutSelectors"/>
<!--        <img :src="" />-->
        <div class="p-4 chartbar-parameters">
            <div
                    v-for="(prop, i) in chartProperties"
                    :key="'chart-form-container-'+i"
            >
                {{prop.name}} {{prop.path.join('.')}}
            </div>
            <div
                    v-for="(prop, i) in chartProperties"
                    :key="'chart-form-container-'+i"
            >
                <div class="chartbar-parameters-form c-100 d-inline-flex align-content-center mb-3">
                    <div class="c-40 mr-1 align-items-center">
                        <FormContainer
                                :route="prop.path"
                                :parameterIndex="prop.name"
                                :typeSettings="prop.type"
                                :objectID="'17'"
                                :showLabel="false"
                        />
                    </div>
                    <div class="c-60">
                        <strong>{{prop.name}}</strong><br>
                        {{prop.path.join('> ')}}
                    </div>
                </div>

            </div>
        </div>


<!--        <div class="chart-settings p-1">-->

<!--            <div class="card panel mb-xs" v-for="(card, index) in chartCards">-->
<!--                <div class="card-header panel-header py-2 px-3 mb-0" role="button" @click="toggleAccordion(index)">-->
<!--                    <a class="accordion-toggle" role="button">-->
<!--                        <h5 v-if="card === 'chart-data-card'">chart <strong>Data</strong></h5>-->
<!--                        <h5 v-if="card === 'chart-layout-card'">chart <strong>Layout</strong></h5>-->
<!--                        <i :class="`fa fa-angle-down ${(openSettings === card) ? 'expanded' : ''}`" />-->
<!--                    </a>-->
<!--                </div>-->
<!--                <b-collapse id="accordion-second" class="panel-body" :visible="openSettings === card">-->
<!--                    <div v-if="card === 'chart-data-card'" class="card-body py-1">-->
<!--                        <ChartDataCard :chartDataFields="chartDataFields"/>-->
<!--                    </div>-->
<!--                    <div v-if="card === 'chart-layout-card'" class="card-body py-1">-->
<!--                        <ChartLayoutCard-->
<!--                                :chartsLayoutSettings="chartLayoutSettings"-->
<!--                                :chartLayoutPartPictures="chartLayoutPartPictures"-->
<!--                                :chartLayoutTypePictures="chartLayoutTypePictures"-->
<!--                        />-->
<!--                    </div>-->
<!--                </b-collapse>-->
<!--                <div v-if="index===0" class="separator"/>-->
<!--            </div>-->
<!--        </div>-->


    </div>
</template>

<script>
    import Vue from 'vue'
    const R = require('ramda');
    import {mapGetters, mapMutations, mapState} from "vuex";
    import draggable from 'vuedraggable';
    import FormContainer from "../../forms/layout/FormContainer/FormContainer";
    import ChartLayoutCard from "./ChartLayoutCard/ChartLayoutCard"
    import ChartTypeSelector from "./ChartTypeSelector/ChartTypeSelector";
    import ChartDataCard from "./ChartDataCard/ChartDataCard";
    import ChartSettingSelector from './ChartSettingSelector/ChartSettingSelector'
    import {chartsDataFields, chartsSettings, chartLayoutPartPictures, chartLayoutTypePictures, chartsLayoutSettings} from "./chartsSettings_new"

    function getNestedValues(obj, result, rootPath) {
        let path = R.clone(rootPath);
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === "object" && obj[key] !== null) {
                if(obj[key].hasOwnProperty('type')) {
                    result.push({'name': key, 'type': obj[key], 'path': path});
                } else {
                    getNestedValues(obj[key], result, path.concat([key]));
                }
            }
        })
    }

    export default {
        name: 'Chartbar',
        components: {
            ChartTypeSelector, ChartDataCard, ChartSettingSelector, ChartLayoutCard, FormContainer,
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
                'processList', 'pageLists', 'nodeLists',
                'activeProcess', 'activePage', 'activeNode',
                'dataObjectParameterMapping'
            ]),
            ...mapState('proj', [
                'selectedProcess', 'selectedPages', 'selectedNodes'
            ]),

            chartProperties() {
                let result = [];
                getNestedValues(this.dataObjectParameterMapping["310000"][0]["dtype"], result, []);
                return result;
            },






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
            activeNodeSettings() {
                return this.projectObjects[this.activeNode]
            },
            activeChartType() {
                console.log(this.activeNodeSettings,this.activeNode,this.projectObjects);
                return this.activeNodeSettings['display_settings']['active_chart_type']
            }

        }
    };
</script>

<style src="./Chartbar.scss" lang="scss"></style>
