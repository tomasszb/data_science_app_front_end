<template>
    <div class="chart-type-selector border-bottom border-light pt-3" >
<!--        {{chartTemplateSettings}}-->
        {{chartConstantProperties}}
        <h5 class="px-4 mb-3">
            <strong>
                Chart type
            </strong>
        </h5>
        <div class="px-4 py-2 border-top border-light border-bottom border-light">
            <ChartType
                v-for="(chart, alias) in chartsSettings"
                :src="chart.chartPicture"
                :name="chart.name"
                :key="alias"
                :active="alias===activeChartType"
                @click.native="activeChartType=alias"
            />
        </div>
        <b-button-group class="c-100 pt-3">
            <b-button
                variant="default"
                @click="changeOpenSettings(0)"
                size="sm"
                class="c-50 border-0"
                :class="{ active: displayProcessSettings.getKeyOrDefault('active_chart_setting_selector', 0) === 0 }"
            >Layout & Data</b-button>
            <b-button
                variant="default"
                @click="changeOpenSettings(1)"
                size="sm"
                class="c-50 border-0"
                :class="{ active: displayProcessSettings.getKeyOrDefault('active_chart_setting_selector', 0) === 1 }"
            >Design</b-button>
        </b-button-group>
    </div>
</template>

<script>
    import ChartType from "./ChartType/ChartType";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {getObjectSetting} from "@/core/projectObjectParser";
    import Vue from "vue";
    const R = require('ramda');

    function parseConstantSettings(settings, prepend, result=null) {
        if (result===null) {
            result = []
        }
        for (let settingName of Object.keys(settings)) {
            let setting = R.clone(settings[settingName])

            if (settingName.includes('constants.')) {
                if (prepend!=="") {
                    settingName = prepend+'.'+settingName
                }

                let split = settingName.split('.')
                let name = split[split.length-1]
                let path = split.splice(0, split.length-1)
                let obj = {path: path, name: name, value: setting['value']}
                result.push(obj)
            }
        }
        return result
    }

    export default {
        name: "ChartTypeSelector",
        props: {
            chartsSettings: { type: Object },
        },
        components: {
            ChartType
        },
        computed: {
            ...mapGetters('proj', ['dataObjects', 'projectObjects', 'activeNode', 'activeProcess', 'dataObjectParameterMapping']),
            activeNodeSettings() {
                return this.projectObjects[this.activeNode]
            },
            chartTemplateSettings() {
                let dashboardID = this.activeNodeSettings.getPath("data_object_tags.chart_template")
                return this.dataObjects.getPath(dashboardID)
            },
            displaySettings() {
                return this.activeNodeSettings['display_settings']
            },
            activeProcessSettings() {
                return this.projectObjects[this.activeProcess]
            },
            displayProcessSettings() {
                return this.activeProcessSettings['display_settings']
            },
            activeChartType: {
                get() {
                    return this.chartTemplateSettings.getPath('parameters.chart_type', null)
                },
                set(activeChartAlias) {
                    this.setDataObjectParameter({
                        id: this.chartTemplateSettings.id,
                        route: 'chart_type',
                        value: activeChartAlias
                    });
                }
            },
            chartConstantProperties() {
                let result = []
                let settings = {}
                let path = ''

                path = "300000.__init__.0.dtype.chart_types."+this.activeChartType
                settings = R.clone(this.dataObjectParameterMapping.getPath("300000.__init__.0.dtype", {}))
                delete settings['chart_types']
                delete settings['series']
                result = result.concat(parseConstantSettings(settings))

                path = "300000.__init__.0.dtype.chart_types."+this.activeChartType
                settings = R.clone(this.dataObjectParameterMapping.getPath(path, {}))
                result = result.concat(parseConstantSettings(settings, 'chart_types.'+this.activeChartType))

                let seriesLength = this.seriesLength
                path = "300000.__init__.0.dtype.series.variable."+this.activeChartType
                settings = R.clone(this.dataObjectParameterMapping.getPath(path, {}))
                for (let i = 0; i <= seriesLength; i++) {
                    result = result.concat(parseConstantSettings(settings, 'series.'+i))
                }
                return result
            },
        },
        data() {
            return {
                seriesLength: 3
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_PROJECT_OBJECT', 'UPDATE_DISPLAY_SETTINGS'
            ]),
            ...mapActions('proj/object_manager', [
                'setDataObjectParameter', 'dropDataObjectParameter'
            ]),
            changeOpenSettings(value) {
                let displayProcessSettings = R.clone(this.displayProcessSettings);
                displayProcessSettings['active_chart_setting_selector'] = value;
                this.UPDATE_DISPLAY_SETTINGS({
                    ObjectID: this.activeProcess,
                    displaySettings: displayProcessSettings
                })
            }
        },

        watch: {
            activeChartType() {
                let constants = R.clone(this.chartConstantProperties)
                console.log(constants)
                for(let setting of constants) {
                    if ((isNaN(setting.value) && typeof setting.value=='number') || setting.value===null) {
                        this.dropDataObjectParameter(
                            {
                                id: this.activeNodeSettings.data_object_tags.chart_template,
                                route: ['template'].concat(setting.path.concat(setting.name))
                            }
                        )
                    } else {
                        this.setDataObjectParameter({
                            id: this.activeNodeSettings.data_object_tags.chart_template,
                            route: ['template'].concat(setting.path.concat(setting.name)),
                            value: setting.value
                        })
                    }
                }
            }
        },

        mounted() {
            let activeNodeSettings = Object.assign({}, this.activeNodeSettings);

            if (typeof activeNodeSettings['display_settings']['active_chart_type']==='undefined') {
                this.displaySettings['active_chart_type'] = Object.keys(this.chartsSettings)[0];
                this.UPDATE_PROJECT_OBJECT({ObjectID: activeNodeSettings.id, Object: activeNodeSettings});
            }
        }
    }
</script>

<style src="./ChartTypeSelector.scss" lang="scss"></style>