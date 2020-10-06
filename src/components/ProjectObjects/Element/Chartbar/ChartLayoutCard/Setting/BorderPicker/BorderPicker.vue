<template>
    <div>
        {{setting.title}}
    </div>
</template>

<script>
    export default {
        name: "ColorPicker",
        props: {
            setting: { type: Object, default: function() {return {}} }
        },
    }
</script>

<style src="./BorderPicker.scss" lang="scss"></style>