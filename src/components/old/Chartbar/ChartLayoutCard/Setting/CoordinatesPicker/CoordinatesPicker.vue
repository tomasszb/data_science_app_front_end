<template>
    <div class="coordinates-picker-form">

        <div class="coordinates-picker-form-1 pb-2">
            <div class="chart-setting-title">
                width:
            </div>
            <div class="coordinates-picker">
                <vue-numeric-input controls-type="updown" v-model="xvalue" :min="1" :max="1000" :step="1" size="75px"/>
            </div>
        </div>

        <div class="coordinates-picker-form-2">
            <div class="chart-setting-title">
                height:
            </div>
            <div class="coordinates-picker">
                <vue-numeric-input controls-type="updown" v-model="yvalue" :min="1" :max="1000" :step="1" size="75px"/>
            </div>
        </div>


    </div>
</template>

<script>
    import VueNumericInput from 'vue-numeric-input'

    export default {
        name: "ColorPicker",
        components: {
            VueNumericInput
        },
        data() {
            return {
                xvalue: 500,
                yvalue: 500,
            };
        },
        props: {
            setting: { type: Object, default: function() {return {}} }
        },
    }
</script>

<style src="CoordinatesPicker.scss" lang="scss"></style>