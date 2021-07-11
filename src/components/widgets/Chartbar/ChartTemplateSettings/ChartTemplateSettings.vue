<template>
    <div class="chart-template-settings">
<!--        <pre><code>{{JSON.stringify(chartCommonProperties, null, 4)}}</code></pre>-->
<!--        <pre><code>{{JSON.stringify(chartTypeProperties, null, 4)}}</code></pre>-->
<!--        <pre><code>{{JSON.stringify(chartConstantProperties, null, 4)}}</code></pre>-->
        <h5 class="pb-3">
            General Settings
        </h5>
        <ChartTemplateFormGroup
            :properties="chartCommonProperties"
        />
        <ChartTemplateFormGroup
            :properties="chartTypeProperties"
        />
        <h5 class="pt-5 pb-3">
            Series Settings
        </h5>
        <ChartTemplateFormGroup
            v-for="(prop, i) in chartSeriesProperties['series']"
            :properties="{'series' : prop}"
        />
    </div>

</template>

<script>
    import Vue from 'vue'
    const R = require('ramda');
    import draggable from 'vuedraggable';
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import FormContainer from "../../../forms/container/FormContainer/FormContainer";
    import ChartTemplateFormGroup from "@/components/widgets/Chartbar/ChartTemplateSettings/ChartTemplateFormGroup/ChartTemplateFormGroup";

    function parseSettings(settings, prepend='', result=null) {
        if (result===null) {
            result = {}
        }
        for (let settingName of Object.keys(settings)) {
            let setting = R.clone(settings[settingName])
            if (!settingName.includes('constants.')) {
                if (prepend!=="") {
                    settingName = prepend+'.'+settingName
                }
                let split = settingName.split('.')
                let name = split[split.length-1]
                let path = split.splice(0, split.length-1)

                let obj = {path: path, name: name, type: setting}

                if (path.length===0) {
                    path=path.concat(['uncategorized', 'uncategorized'])
                }
                else if (path.length===1) {
                    path=path.concat(['uncategorized'])
                }
                let existing = result.getPath(path, null)
                if (existing===null) {
                    result = result.setPath(path, [obj])
                } else {
                    existing.push(obj)
                    result = result.setPath(path, existing)
                }
            }
        }
        return result
    }

    export default {
        name: "ChartTemplateSettings",
        components: {
            draggable, FormContainer, ChartTemplateFormGroup
        },
        props: {
            chartType: { type: String, default: '' },
            dataobjectID: { type: [Number, String], default: '' },
            chartDataFields: { type: Array },
        },
        data() {
            return {
                columnList: [],
                openedGroups: [],
                seriesLength:2
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects', 'dataObjects', 'ProjectTree',
                'processList', 'pageLists', 'nodeLists',
                'activeProcess', 'activePage', 'activeNode',
                'dataObjectParameterMapping'
            ]),
            activeNodeSettings() {
                return this.projectObjects.getKeyOrDefault(this.activeNode, {})
            },
            activeChartType() {
                let dashboardID = this.activeNodeSettings.getPath("data_object_tags.chart_template")
                return this.dataObjects.getPath(dashboardID+'.parameters.chart_type',null)
            },
            chartCommonProperties() {
                let result = {};
                let path = "300000.__init__.0.dtype"
                let settings = R.clone(this.dataObjectParameterMapping.getPath(path, {}))
                delete settings['chart_types']
                delete settings['series']
                return parseSettings(settings)
            },
            chartTypeProperties() {
                let path = "300000.__init__.0.dtype.chart_types."+this.activeChartType
                let settings = R.clone(this.dataObjectParameterMapping.getPath(path, {}))
                return parseSettings(settings, 'chart_types.'+this.activeChartType)
            },
            chartSeriesProperties() {
                let seriesLength = this.seriesLength
                let path = "300000.__init__.0.dtype.series.variable."+this.activeChartType
                let settings = R.clone(this.dataObjectParameterMapping.getPath(path, {}))
                let result = {}
                for (let i = 0; i <= seriesLength; i++) {
                    result = parseSettings(settings, 'series.'+i, result)
                }
                return result
            },
            propertyTypeTree() {
                let tree = {}
                for(let propertyName of Object.keys(this.chartProperties)) {
                    let names = propertyName.split('.')
                    if (names.length === 2) {
                        names.splice(1, 0, names[names.length-1])
                    }
                // console.log(names)
                    this.setDeep(tree, names, 0)
                }
                return tree
            }
        },

        methods: {
            ...mapActions('proj/object_manager', [
                'setDataObjectParameter', 'dropDataObjectParameter'
            ]),
        },
    }
</script>

<style src="./ChartTemplateSettings.scss" lang="scss"></style>
