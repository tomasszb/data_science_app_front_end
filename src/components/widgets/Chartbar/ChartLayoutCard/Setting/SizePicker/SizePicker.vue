<template>
    <div class="size-picker-form">
        <div class="chart-setting-title">
            {{setting.title}}:
        </div>
        <b-form-input class="size-picker" v-model="value" type="range"></b-form-input>
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
                value: 20,
            };
        },
        props: {
            setting: { type: Object, default: function() {return {}} }
        },
    }
</script>

<style src="./SizePicker.scss" lang="scss"></style>