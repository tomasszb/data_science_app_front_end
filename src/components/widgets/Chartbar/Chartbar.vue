<template>
    <div class="chartbar p-2">
        <b-button-group class="c-100">
            <b-button
                    variant="default" @click="changeOpenSettings(0)"
                    size="sm"
                    class="c-50 border-0"
                    :class="{ active: openSettings === 0 }"
            >Layout & Data</b-button>
            <b-button
                    variant="default" @click="changeOpenSettings(1)"
                    size="sm"
                    class="c-50 border-0 "
                    :class="{ active: openSettings === 1 }"
            >Design</b-button>
        </b-button-group>

        <!--        <h4 class="mb-4"><span class='fw-semi-bold'>Chart</span> Settings</h4>-->
        <ChartTypeSelector v-show="openSettings===0" :chartsSettings="chartsSettings"/>
        <ChartDataCard
                v-show="openSettings===0"
                :chartDataFields="chartDataFields"
                :DataObjectId="activeNodeSettings['data_object_tags']"/>
<!--        <img :src="" />-->


        <multiselect
                v-show="openSettings===1"
                v-model="settingsFilterChartParts"
                :options="['title', 'y_axis', 'x_axis', 'label']"
                :searchable="false"
                :close-on-select="true"
                :show-labels="false"
                class="my-2"
                placeholder="Filter Chart Parts"
                :hideSelected="true"
                :multiple="true"
        />
        <multiselect
                v-show="openSettings===1"
                v-model="settingsFilterParameterType"
                :options="['name', 'font', 'color', 'show']"
                :searchable="false"
                :close-on-select="true"
                :show-labels="false"
                class="mb-4"
                placeholder="Filter Parameter Type"
                :hideSelected="true"
                :multiple="true"
        />
        <div v-show="openSettings===1" class="p-2 chartbar-parameters">
            <div
                    v-for="(prop, i) in filteredChartProperties"
                    :key="'chart-form-container-'+activeNode+i"
            >
                <div class="chartbar-parameters-form-container c-100 d-inline-flex pb-3 pt-3">
                    <div class=" c-40 mr-3 d-flex align-items-center align-content-center">
                        <div class="c-100 chartbar-parameters-form align-items-center align-content-center">
                            <FormContainer
                                    :route="['template'].concat(prop.name.split('.').slice(0, -1))"
                                    :parameterIndex="prop.name.split('.').slice(-1)[0]"
                                    :typeSettings="prop.type"
                                    :objectID="activeNodeSettings.data_object_tags.chart_template"
                                    :showLabel="false"
                            />
                        </div>
                    </div>
                    <div class="c-60">
                        <strong>{{prop.name.split('.').slice(-1)[0]}}</strong><br>
                        {{prop.name.split('.').slice(0,-1).join(' > ')}}
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
    import Multiselect from 'vue-multiselect'
    const R = require('ramda');
    import {mapGetters, mapMutations, mapState} from "vuex";
    import draggable from 'vuedraggable';
    import FormContainer from "../../forms/container/FormContainer/FormContainer";
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
            ChartTypeSelector, ChartDataCard, ChartSettingSelector, ChartLayoutCard, FormContainer, Multiselect,
            draggable
        },
        prop: {

        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ]),
            changeOpenSettings(value) {
                Vue.set(this,'openSettings', value);
            },
        },
        data() {
            return {
                chartsSettings: chartsSettings,
                chartsDataFields: chartsDataFields,
                chartLayoutPartPictures: chartLayoutPartPictures,
                chartLayoutTypePictures: chartLayoutTypePictures,
                chartCards: ['chart-data-card', 'chart-layout-card'],
                openSettings: 0,
                settingsFilterChartParts: [],
                settingsFilterParameterType: []

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
                getNestedValues(this.dataObjectParameterMapping["300000"]['__init__'][0]["dtype"], result, []);
                // console.log(result);
                return result;
            },
            filteredChartProperties() {
                let result = [];
                for (let prop of this.chartProperties) {
                    let matchChartParts = false;
                    let matchChartParameters = false;

                    if (this.settingsFilterChartParts.length>0) {
                        for (let partFilter of this.settingsFilterChartParts) {
                            if (prop.name.includes(partFilter)) {
                                matchChartParts = true;
                            }
                        }
                    }
                    else {
                        matchChartParts=true;
                    }

                    if (this.settingsFilterParameterType.length>0) {
                        for (let parameterFitler of this.settingsFilterParameterType) {
                            if (prop.name.includes(parameterFitler)) {
                                matchChartParameters = true;
                            }
                        }
                    }
                    else {
                        matchChartParameters=true;
                    }

                    if (matchChartParameters && matchChartParts) {
                        result.push(prop)
                    }
                }
                return result
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
                    if (this.layoutDataFields.includes(field['name'])) {
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
                // console.log(this.activeNodeSettings,this.activeNode,this.projectObjects);
                return this.activeNodeSettings['display_settings']['active_chart_type']
            }

        }
    };
</script>

<style src="./Chartbar.scss" lang="scss"></style>
