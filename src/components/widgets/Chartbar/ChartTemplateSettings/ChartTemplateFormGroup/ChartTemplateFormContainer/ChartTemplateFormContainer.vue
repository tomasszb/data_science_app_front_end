<template>
    <div>
        <div
            :key="'chart-form-container-'+activeNode+j.toString()"
            v-for="(subgroup, subgroupName, j) in group"
            class=""
        >
            <div
                v-if="subgroupName!=='uncategorized'"
                class="font-weight-bold mb-2 mt-5 "
            >
                <h5>{{subgroupName}}</h5>
                <hr class="my-1">
            </div>
            <div
                v-for="(meta, k) in subgroup"
                :key="'chart-form-container-'+activeNode+k.toString()"
                class="chartbar-parameters-form-container d-flex pb-2 pt-2 ">

                <div class="pr-3 d-flex align-content-center">
                    <div class="chartbar-parameters-form align-items-center">
                        <FormContainer
                            :route="['template'].concat(meta.path)"
                            :parameterIndex="meta.name"
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
</template>

<script>
    import Vue from 'vue'
    const R = require('ramda');
    import draggable from 'vuedraggable';
    import {mapGetters, mapMutations} from "vuex";
    import FormContainer from "../../../../../forms/container/FormContainer/FormContainer";

    export default {
        name: "ChartTemplateFormCOntainer",
        components: {
            draggable, FormContainer
        },
        props: {
            group: {},
            groupName: {},
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
            }
        },
        methods: {
        },
    }
</script>

<style src="./ChartTemplateFormContainer.scss" lang="scss"></style>
