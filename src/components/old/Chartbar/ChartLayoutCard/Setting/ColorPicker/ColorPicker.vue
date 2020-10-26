<template>
    <div class="color-picker-form">
        <div class="chart-setting-title">
            {{setting.title}}:
        </div>
        <b-form-input class="color-picker" v-model="color" type="color"></b-form-input>
    </div>
</template>

<script>
    export default {
        name: "ColorPicker",
        props: {
            setting: { type: Object, default: function() {return {}} }
        },
        data() {
            return {
                color: null,
            }
        }
    }
</script>

<style src="ColorPicker.scss" lang="scss"></style>