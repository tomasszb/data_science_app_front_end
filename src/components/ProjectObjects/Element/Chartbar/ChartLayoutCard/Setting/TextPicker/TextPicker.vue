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

<style src="./TextPicker.scss" lang="scss"></style>