<template>
    <div :class="{'active': active, 'chart-type-option': true}">
        <img :src="src" :alt="name" class="m-2">
    </div>
</template>

<script>

    export default {
        name: "ChartType",
        props: {
            src: { type: String, default: '' },
            name: { type: String, default: '' },
            active: { type: Boolean, default: false },
        },
    }
</script>

<style src="./ChartType.scss" lang="scss"></style>