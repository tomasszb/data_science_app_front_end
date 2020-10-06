<template>
    <div class="mb-2 p-2 chart-layout">
        <div
                v-for="(settings, element) in chartsLayoutSettings"
                class="card panel mb-2" :key="`accord-one-${element.toString()}`">
            <div
                    class="card-header panel-header px-0" role="button"
                    @click="toggleAccordion(element)"
                    v-if="!inactiveChartSettings.includes(element)"
            >
                <div class="mb-0">
                    <a class="accordion-toggle" role="button">
                        <div>
                            <img :src="chartLayoutPartPictures[element]" class="chart-layout-picker mr-3"/>
                            {{element}}
                        </div>
                        <i :class="`fa fa-angle-down ${openSettings.includes(element) ? 'expanded' : ''}`" />
                    </a>
                </div>
            </div>
            <b-collapse v-if="!inactiveChartSettings.includes(element)" id="accordion-second" class="panel-body my-2" :visible="openSettings.includes(element)">
                <div class="card-body py-2">
                    <div v-for="setting in settings">
                        <Setting :setting="setting" :alias="setting.alias"/>
                    </div>
                </div>
            </b-collapse>
        </div>
    </div>
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
                openSettings: [],
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
            toggleAccordion(element) {
                console.log(element);
                if (this.openSettings.includes(element)) {
                    let index = this.openSettings.indexOf(element);
                    this.openSettings.splice(index, 1);
                } else {
                    this.openSettings.push(element);
                }
            },
        }
    }
</script>

<style src="./ChartLayoutCard.scss" lang="scss"></style>