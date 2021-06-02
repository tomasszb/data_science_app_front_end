<template>
    <div class="mb-2 chart-data-card p-3 flex-vertical">
        <div v-for="settings in chartDataFields" v-if="!inactiveChartSettings.includes(settings.selector)">
            <div class="chart-column mb-1">
                <form-container
                        :route="['fields']"
                        :parameterIndex="settings.alias"
                        :horizontal="false"
                        :typeSettings="{type: 'column_list'}"
                        :objectID="activeNodeSettings['data_object_tags']['visualization_pivot']"
                        :name="settings.name"
                        :showLabel="true"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import draggable from 'vuedraggable';
    import {mapGetters, mapMutations} from "vuex";
    import FormContainer from "../../../forms/container/FormContainer/FormContainer";

    export default {
        name: "ChartDataCard",
        components: {
            draggable, FormContainer
        },
        props: {
            chartType: { type: String, default: '' },
            dataObjectId: { type: String, default: '' },
            chartDataFields: { type: Array },
        },
        data() {
            return {
                columnList: []
            }
        },
        computed: {
            ...mapGetters('proj', ['activeNode', 'dataObjects', 'projectObjects']),
            activeNodeSettings() {
                return this.projectObjects[this.activeNode]
            },
            displaySettings() {
                return this.activeNodeSettings['display_settings']
            },
            inactiveChartSettings() {
                return (this.displaySettings['inactive_chart_settings'] = this.displaySettings['inactive_chart_settings'] || [])
            }
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER'
            ]),
        },
        watch: {
            chartDataFields() {
                // console.log('chartDataFields changed');
                let pivotID = this.activeNodeSettings['data_object_tags']['visualization_pivot'];
                let pivotSettings = this.dataObjects[pivotID]['parameters']['fields'];
                let filteredPivotSettings = {};

                for (let field of this.chartDataFields) {
                    filteredPivotSettings[field.alias] = [];

                    if (typeof pivotSettings[field.alias] !== 'undefined') {
                        filteredPivotSettings[field.alias] = pivotSettings[field.alias];
                    } else if(this.displaySettings['pivot_columns'][field.alias] !== 'undefined') {
                        filteredPivotSettings[field.alias] = this.displaySettings['pivot_columns'][field.alias];
                    }
                    this.SET_DO_PARAMETER({
                        id: pivotID,
                        route: ['fields'],
                        value: filteredPivotSettings
                    });
                }
            }
        }
    }
</script>

<style src="./ChartDataCard.scss" lang="scss"></style>
