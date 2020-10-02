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

<style src="./CoordinatesPicker.scss" lang="scss"></style>