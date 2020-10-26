<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="app-header flex-grow-1">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'ToolHeader'
    };
</script>

<style src="./ToolHeader.scss" lang="scss"></style>
