<template>
    <div class="chart-template-settings">
<!--        <pre><code>{{JSON.stringify(properties, null, 4)}}</code></pre>-->
        <div
            v-for="(group, groupName, i) in properties"
            :key="'chart-form-container-'+activeNode+i.toString()"
            class="card panel mb-xs "
        >
            <div
                class="card-header panel-header pt-2 pb-1" role="button"
                @click="toggleAccordion(groupName)"
            >
                <div class="mb-0">
                    <div class="accordion-toggle col-explorer-accordion-toggle py-1" role="button">
                        <div class="justify-content-start d-flex p-0">
                            <h4 class="p-0 m-0">{{groupName}}</h4>
                        </div>
                        <i :class="`fa fa-angle-down ${openedGroups.indexOf(groupName) >= 0 ? 'expanded' : ''}`" />
                    </div>
                </div>
            </div>
            <b-collapse id="accordion-first" class="panel-body" :visible="openedGroups.indexOf(groupName) >= 0">

                <div class="card-body pt-3 pb-4">
                    <chart-template-form-container :group="group" :groupName="groupName"/>
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
    import FormContainer from "../../../../forms/container/FormContainer/FormContainer";
    import ChartTemplateFormContainer from "@/components/widgets/Chartbar/ChartTemplateSettings/ChartTemplateFormGroup/ChartTemplateFormContainer/ChartTemplateFormContainer";

    export default {
        name: "ChartTemplateFormCOntainer",
        components: {
            draggable, FormContainer, ChartTemplateFormContainer
        },
        props: {
            properties: {}
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
            toggleAccordion(index) {
                let arrayIndex = this.openedGroups.indexOf(index)
                if (arrayIndex>=0) {
                    this.openedGroups.splice(arrayIndex, 1)
                } else {
                    this.openedGroups.push(index)
                }
            },
        },
    }
</script>

<style src="./ChartTemplateFormGroup.scss" lang="scss"></style>
