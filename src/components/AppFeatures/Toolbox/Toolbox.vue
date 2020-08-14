<template>
    <div class="toolbox">
        <div v-for="tools in childrenTools" :class="{'toolbox-icon-group':true, 'clear-both':tools.length>1}">
            <a v-for="tool in tools"
               :class="{'px-1':true, 'clear-both':!tool.bigIcon}"
               :key="tool.id">
                <div v-if="tool.action == 'directive'" v-b-modal = "tool.directive">
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
                </div>
                <div @click="$emit('toolClicked', tool.action)" v-else>
                    <b-tooltip  :target="'toolbox-'+tool.action" :title="tool.tooltip" triggers="hover" noninteractive>
                        {{tool.tooltip}}
                    </b-tooltip>
                    <AppIcon
                            :name="tool.name"
                            :bigIcon="tool.bigIcon"
                            :svg="tool.svg"
                            :svgName="tool.svgIconName"
                            :fontClass="tool.fontIconClass"
                            :id="'toolbox-'+tool.action"/>
                </div>
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
