<template>
    <div>
        {{title}}
    </div>
</template>

<script>
    export default {
        name: "ColorPicker",
        props: {
            title: { type: String, default: '' }
        },
    }
</script>

<style src="./FontPicker.scss" lang="scss"></style>