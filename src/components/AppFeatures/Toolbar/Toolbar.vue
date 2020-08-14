<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <b-navbar class="app-toolbar d-print-none">
            <slot></slot>
        </b-navbar>
    </div>

</template>

<script>

    export default {
        name: 'Toolbar',
    };
</script>

<style src="./Toolbar.scss" lang="scss"></style>
