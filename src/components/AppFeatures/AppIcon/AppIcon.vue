<template>
    <div class="icon-container-wrapper">
        <div :class="{ 'small-icon': !bigIcon, 'big-icon': bigIcon}">
            <img v-if="svg" :src="path" />
            <i v-else :class="fontClass"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppIcon',
        props: {
            name: { type: String, default: '' },
            svg: { type: Boolean, default: false },
            svgName: { type: String, default: '' },
            fontClass: { type: String, default: '' },
            bigIcon: { type: Boolean, default: false },
        },
        computed: {
            path() {
                return require(`@/assets/icons/svg/${this.svgName}.svg`)
            }
        }
    };
</script>

<style src="./AppIcon.scss" lang="scss" scoped />
