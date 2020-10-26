<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="app-footer flex-grow-1">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'ToolFooter'
    };
</script>

<style src="./ToolFooter.scss" lang="scss"></style>
