<template>
    <Widget
            class="mb-2"
            title="<h5>Chart<span class='fw-semi-bold'> Data</span></h5>"
            collapse customHeader>

        <div class="chart-data-picker-panel mb-4">
            <div
                    v-for="(settings, i) in chartsDataSettings"
                    class="chart-data-picker"
                    @click="toggleActive(i)"
                    :class = "{ 'hidden': settings.hidden, 'active': settings.active, 'required': settings.required}"
            >
                {{settings.name}}
            </div>
        </div>

        <div v-for="settings in chartsDataSettings">
            <div v-show="settings.active ||  settings.required">
                <div class="mb-1">{{settings.name}}</div>
                <div class="chart-column-container p-3 pb-3 mb-2"></div>
            </div>
        </div>

    </Widget>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: "ChartDataCard",
        props: {
          chartType: { type: String, default: '' }
        },
        data() {
            return {
                chartsDataSettings: [
                    {'name': 'main axis', 'active': true, 'hidden': false, 'required': true},
                    {'name': 'value axis', 'active': true, 'hidden': false, 'required': true},
                    {'name': 'x grid', 'active': true, 'hidden': false, 'required': false},
                    {'name': 'y grid', 'active': true, 'hidden': false, 'required': false},
                    {'name': 'x axis', 'active': false, 'hidden': false, 'required': false},
                    {'name': 'y axis', 'active': false, 'hidden': false, 'required': false},
                    {'name': 'marker color', 'active': false, 'hidden': true, 'required': false},
                    {'name': 'marker size', 'active': false, 'hidden': true, 'required': false}
                ]
            }
        },
        methods: {
            toggleActive(settingIndex) {
                Vue.set(this.chartsDataSettings[settingIndex], 'active', !this.chartsDataSettings[settingIndex].active);
            }
        },
        props: {}
    }
</script>

<style src="./ChartDataCard.scss" lang="scss"></style>