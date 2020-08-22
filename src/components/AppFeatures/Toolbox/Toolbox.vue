<template>
    <b-nav>
        <b-nav-item class="d-md-down-none" v-for="tools in childrenTools">
            <a v-for="tool in tools"
               :key="tool.id"
               :id="'toolbox-'+tool.action"
               @click="$emit('toolClicked', tool.action)"
               class="px-2" href="#">
<!--                <b-tooltip :target="'toolbox-'+tool.action" :title="tool.tooltip" triggers="hover" noninteractive>-->
<!--                    {{tool.tooltip}}-->
<!--                </b-tooltip>-->
                <i :class="'la fa-lg '+tool.fontIconClass" />
            </a>
        </b-nav-item>
    </b-nav>
</template>

<script>
    import AppIcon from "../AppIcon/AppIcon";

    export default {
        name: 'Toolbox',
        components: {AppIcon},
        props: {
            childrenTools: { type: Array, default: null },
            header: { type: String, default: '' },
        },
        computed: {
            fullIconName() {
                return `fi ${this.iconName}`;
            },
            isActive() {
                return (this.activeItem
                    && this.activeItem.includes(this.index)
                    && this.headerLinkWasClicked);
            },
        },
    };
</script>

<style src="./Toolbox.scss" lang="scss" scoped />
