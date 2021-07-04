<template>
    <div class="chart-template-settings">
        <div
            v-for="(group, groupName, i) in propertyTypeTree"
            :key="'chart-form-container-'+activeNode+i.toString()"
            class="card panel mb-xs "
        >
            <div
                class="card-header panel-header pt-2 pb-1" role="button"
                @click="toggleAccordion(groupName)"
            >
                <div class="mb-0">
                    <div class="accordion-toggle col-explorer-accordion-toggle " role="button">
                        <div class="justify-content-start d-flex">
                            <h4>{{groupName}}</h4>
                        </div>
                        <i :class="`fa fa-angle-down ${openedGroups.indexOf(groupName) >= 0 ? 'expanded' : ''}`" />
                    </div>
                </div>
            </div>
            <b-collapse id="accordion-first" class="panel-body" :visible="openedGroups.indexOf(groupName) >= 0">

                <div class="card-body pt-3 pb-4">
                    <div
                        :key="'chart-form-container-'+activeNode+i.toString()+j.toString()"
                        v-for="(subgroup, subgroupName, j) in group"
                        class=""
                    >
                        <div
                            v-if="Object.keys(subgroup).length>1"
                            class="font-weight-bold mb-2 mt-5 "
                        >
                            <h5>{{subgroupName}}</h5>
                            <hr class="my-1">
                        </div>

                        <div
                            v-for="(type, typeName, k) in subgroup"
                            :set = "meta = getProp(groupName, subgroupName, typeName, subgroup)"
                            :key="'chart-form-container-'+activeNode+i.toString()+j.toString()+k.toString()"
                            class="chartbar-parameters-form-container flex-horizontal-no-scroll pb-2 pt-2 ">

                            <div class="pr-3 d-flex align-content-center">
                                <div class="chartbar-parameters-form align-items-center">
                                    <FormContainer
                                        :route="['template'].concat(meta.path).concat(meta.name.split('.').slice(0, -1))"
                                        :parameterIndex="meta.name.split('.').slice(-1)[0]"
                                        :typeSettings="meta.type"
                                        :objectID="activeNodeSettings.data_object_tags.chart_template"
                                        :showLabel="false"
                                    />
                                </div>
                            </div>
                            <div class="text-gray align-items-center  d-inline-flex pt-1 ">
                                <h6>
                                    {{meta.name.split('.').slice(-1)[0]}}
                                </h6>
<!--                                {{prop.name.split('.').slice(0,-1).join(' > ')}}-{{prop.name.split('.').slice(-1)[0]}}-->
                            </div>
                        </div>
                    </div>
                </div>
            </b-collapse>
        </div>

    </div>

</template>

<script>
    import Vue from 'vue'
    const R = require('ramda');
    import draggable from 'vuedraggable';
    import {mapGetters, mapMutations} from "vuex";
    import FormContainer from "../../../forms/container/FormContainer/FormContainer";

    function getNestedValues(obj, result, rootPath) {
        let path = R.clone(rootPath);
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === "object" && obj[key] !== null) {
                if(obj[key].hasOwnProperty('type')) {
                    result[key] = {'name': key, 'type': obj[key], 'path': path};
                } else {
                    getNestedValues(obj[key], result, path.concat([key]));
                }
            }
        })
    }

    export default {
        name: "ChartTemplateSettings",
        components: {
            draggable, FormContainer
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
            chartProperties() {
                let result = {};
                getNestedValues(this.dataObjectParameterMapping["300000"]['__init__'][0]["dtype"], result, []);
                // console.log(result);
                return result;
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
            toggleAccordion(index) {
                let arrayIndex = this.openedGroups.indexOf(index)
                if (arrayIndex>=0) {
                    this.openedGroups.splice(arrayIndex, 1)
                } else {
                    this.openedGroups.push(index)
                }
            },
            getProp(groupName, subgroupName, type, subgroup) {
                let key = null
                let ghostSubgroup = Object.keys(subgroup).length<2
                if (ghostSubgroup) {
                    key =  groupName + '.' + type
                } else {
                    key =  groupName + '.' + subgroupName + '.' + type
                }
                if(this.chartProperties.hasOwnProperty(key)) {
                    return this.chartProperties[key]
                }
                else {
                    console.log(groupName, subgroupName, type, ghostSubgroup, subgroup)
                    return {}
                }
            }
        },
    }
</script>

<style src="./ChartTemplateSettings.scss" lang="scss"></style>
