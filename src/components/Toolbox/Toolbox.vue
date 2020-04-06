<template>
    <div class="toolbox">
        <div v-for="tools in childrenTools" :class="{'toolbox-icon-group':true, 'clear-both':tools.length>1}">
            <a v-for="tool in tools"
               href="#"
               :class="{'px-1':true, 'clear-both':!tool.bigIcon}"
               :key="'toolbox-'+tool.action">
                <b-tooltip :target="'toolbox-'+tool.action" :title="tool.tooltip" triggers="hover" noninteractive>
                    {{tool.tooltip}}
                </b-tooltip>
                <AppIcon
                        :name="tool.name"
                        :bigIcon="tool.bigIcon"
                        :svg="tool.svg"
                        :svgName="tool.svgIconName"
                        :fontClass="tool.fontIconClass"
                        :id="'toolbox-'+tool.action"/>
            </a>
        </div>
        <p>{{ header }}</p>
    </div>
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
