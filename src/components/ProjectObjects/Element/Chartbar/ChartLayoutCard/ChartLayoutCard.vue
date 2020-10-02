<template>
    <Widget
            class="mb-2 chart-layout"
            title="<h5>Chart<span class='fw-semi-bold'> Layout</span></h5>"
            collapse customHeader>
        <div class="separator"></div>
        <div
                v-for="(settings, element) in chartsLayoutSettings"
                class="card panel mb-xs" :key="`accord-one-${element.toString()}`">
            <div
                    class="card-header panel-header p-2" role="button"
                    @click="toggleAccordion('openSetting', element)"
                    v-if="!inactiveChartSettings.includes(element)"
            >
                <div class="mb-0">
                    <a class="accordion-toggle" role="button">
                        <div>
                            <img :src="chartLayoutPartPictures[element]" class="chart-layout-picker mr-3"/>
                            {{element}}
                        </div>
                        <i :class="`fa fa-angle-down ${openSetting[element] ? 'expanded' : ''}`" />
                    </a>
                </div>
            </div>
            <b-collapse v-if="!inactiveChartSettings.includes(settings.alias)" id="accordion-second" class="panel-body" :visible="openSetting === element ">
                <div class="card-body">
                    <div v-for="setting in settings">
                        <Setting :setting="setting" :alias="setting.alias"/>
                    </div>
                </div>
            </b-collapse>
        </div>
    </Widget>
</template>

<script>
    import Vue from 'vue'
    import {mapGetters} from "vuex";
    import Setting from "./Setting/Setting"

    export default {
        name: "ChartDataCard",
        props: {
            chartType: { type: String, default: '' },
            chartsLayoutSettings: { type: Object },
            chartLayoutPartPictures: { type: Object },
            chartLayoutTypePictures: { type: Object }
        },
        components: {
            Setting
        },
        data() {
            return {
                openSetting: -1,
            }
        },
        computed: {
            ...mapGetters('proj', ['activeElement', 'dataObjects', 'projectObjects']),
            activeElementSettings() {
                return this.projectObjects[this.activeElement]
            },
            displaySettings() {
                return this.activeElementSettings['parameters']['display_settings']
            },
            inactiveChartSettings() {
                return (this.displaySettings['inactive_chart_settings'] = this.displaySettings['inactive_chart_settings'] || [])
            }
        },
        methods: {
            toggleAccordion(field, index) {
                if (this[field] !== index) {
                    Vue.set(this, field, index);
                } else {
                    Vue.set(this, field, -1);
                }
            },
        }
    }
</script>

<style src="./ChartLayoutCard.scss" lang="scss"></style>