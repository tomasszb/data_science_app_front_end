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

<style src="./ColorPicker.scss" lang="scss"></style>