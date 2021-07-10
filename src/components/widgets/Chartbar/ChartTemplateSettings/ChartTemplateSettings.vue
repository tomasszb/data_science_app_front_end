<template>
    <div class="chart-template-settings">
<!--        <pre><code>{{JSON.stringify(chartCommonProperties, null, 4)}}</code></pre>-->
<!--        <pre><code>{{JSON.stringify(chartTypeProperties, null, 4)}}</code></pre>-->
<!--        <pre><code>{{JSON.stringify(chartSeriesProperties, null, 4)}}</code></pre>-->
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
            :properties="chartSeriesProperties"
        />
    </div>

</template>

<script>
    import Vue from 'vue'
    const R = require('ramda');
    import draggable from 'vuedraggable';
    import {mapGetters, mapMutations} from "vuex";
    import FormContainer from "../../../forms/container/FormContainer/FormContainer";
    import ChartTemplateFormGroup from "@/components/widgets/Chartbar/ChartTemplateSettings/ChartTemplateFormGroup/ChartTemplateFormGroup";

    function parseSettings(settings) {
        let result = {}
        for (let setting of Object.keys(settings)) {
            let split = setting.split('.')
            let name = split[split.length-1]
            let path = split.splice(0, split.length-1)

            let obj = {path: path, name: name, type: settings[setting]}

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
                openedGroups: []
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
            chartCommonProperties() {
                let result = {};
                let path = "300000.__init__.0.dtype"
                let settings = R.clone(this.dataObjectParameterMapping.getPath(path, {}))
                delete settings['chart_types']
                delete settings['series']
                return parseSettings(settings)
            },
            chartTypeProperties() {
                let path = "300000.__init__.0.dtype.chart_types.line"
                let settings = R.clone(this.dataObjectParameterMapping.getPath(path, {}))
                return parseSettings(settings)
            },
            chartSeriesProperties() {
                let path = "300000.__init__.0.dtype.series.variable.line"
                let settings = R.clone(this.dataObjectParameterMapping.getPath(path, {}))
                return parseSettings(settings)
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
        },
    }
</script>

<style src="./ChartTemplateSettings.scss" lang="scss"></style>
