<template>
    <div class="font-picker-form">
        <div class="chart-setting-title">
            {{setting.title}}:
        </div>
        <div class="font-picker">

        </div>
    </div>

</template>

<script>

    export default {
        name: "FontPicker",
        props: {
            setting: { type: Object, default: function() {return {}} }
        },
    }
</script>

<style src="./FontPicker.scss" lang="scss"></style>