<template>
    <div class="app-main-content flex-grow-1 flex-vertical-no-scroll">
        <Widget
                class="flex-vertical-no-scroll"
                body-class="flex-vertical-no-scroll"
                title=""
                refresh settings customHeader fullscreen
                :showLoader="false">
            <template v-slot:node-view-selector>
                <slot name="node-view-selector"></slot>
            </template>
            <slot></slot>
        </Widget>
    </div>
</template>

<script>
    export default {
        name: "MainContent"
    }
</script>

<style src="./MainContent.scss" lang="scss"></style>
