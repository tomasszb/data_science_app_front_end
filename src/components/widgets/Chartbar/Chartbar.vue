<template>
    <div class="chartbar p-2 c-100 flex-vertical-no-scroll">


        <!--        <h4 class="mb-4"><span class='fw-semi-bold'>Chart</span> Settings</h4>-->
        <ChartDataCard
                v-show="openSettings===0"
                :chartDataFields="chartDataFields"
                :DataObjectId="activeNodeSettings['data_object_tags']"/>
        <div v-show="openSettings===1" class="p-2 chartbar-parameters mt-3">
            <div
                v-for="(prop, i) in filteredChartProperties"
                :key="'chart-form-container-'+activeNode+i"
            >
                <div class="chartbar-parameters-form-container c-100 d-inline-flex pb-3 pt-2">
                    <div class=" c-40 mr-3 d-flex align-items-center align-content-center">
                        <div class="chartbar-parameters-form align-items-center align-content-center">
                            <FormContainer
                                :route="['template'].concat(prop.path).concat(prop.name.split('.').slice(0, -1))"
                                :parameterIndex="prop.name.split('.').slice(-1)[0]"
                                :typeSettings="prop.type"
                                :objectID="activeNodeSettings.data_object_tags.chart_template"
                                :showLabel="false"
                            />
                        </div>
                    </div>
                    <div class="c-60 text-gray align-items-center align-content-center d-inline-flex pt-1">
                        <h6>
                            {{prop.name.split('.').slice(-1)[0]}}
                        </h6>
<!--                        {{prop.name.split('.').slice(0,-1).join(' > ')}}-->
                    </div>
                </div>

            </div>
        </div>


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
            ChartDataCard, ChartSettingSelector, ChartLayoutCard, FormContainer, Multiselect,
            draggable
        },
        prop: {

        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT'
            ])
        },
        data() {
            return {
                chartsSettings: chartsSettings,
                chartsDataFields: chartsDataFields,
                chartLayoutPartPictures: chartLayoutPartPictures,
                chartLayoutTypePictures: chartLayoutTypePictures,
                chartCards: ['chart-data-card', 'chart-layout-card'],
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
                return this.projectObjects.getKeyOrDefault(this.activeNode, {})
            },
            activeChartType() {
                // console.log(this.activeNodeSettings,this.activeNode,this.projectObjects);
                return this.activeNodeSettings.getPath('display_settings.active_chart_type', null)
            },
            activeProcessSettings() {
                return this.projectObjects.getKeyOrDefault(this.activeProcess, {})
            },
            displayProcessSettings() {
                return this.activeProcessSettings['display_settings']
            },
            openSettings() {
                return this.displayProcessSettings.getKeyOrDefault('active_chart_setting_selector', 0)
            }

        }
    };
</script>

<style src="./Chartbar.scss" lang="scss"></style>
