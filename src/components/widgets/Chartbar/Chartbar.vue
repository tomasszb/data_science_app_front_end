<template>
    <div class="chartbar p-2 c-100 flex-vertical-no-scroll">


        <!--        <h4 class="mb-4"><span class='fw-semi-bold'>Chart</span> Settings</h4>-->
        <ChartDataCard
                v-if="openSettings===0"
                :chartDataFields="chartDataFields"
                :DataObjectId="activeNodeSettings['data_object_tags']"/>
        <div v-if="openSettings===1" class="p-2 chartbar-parameters mt-3">
            <chart-template-settings/>
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
    import ChartTemplateSettings from "@/components/widgets/Chartbar/ChartTemplateSettings/ChartTemplateSettings";
    import {chartsDataFields, chartsSettings, chartLayoutPartPictures, chartLayoutTypePictures, chartsLayoutSettings} from "./chartsSettings_new"

    export default {
        name: 'Chartbar',
        components: {
            ChartDataCard, ChartSettingSelector, ChartLayoutCard, FormContainer, Multiselect, ChartTemplateSettings,
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
