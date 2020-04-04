<template>
    <div class="toolbox">
        <a v-for="tool in childrenTools"
           href="#"
           class="px-3"
           :key="'toolbox-'+tool.action">
            <b-tooltip :target="'toolbox-'+tool.action" :title="tool.tooltip" triggers="hover" noninteractive>
                {{tool.tooltip}}
            </b-tooltip>
            <i
               :class="tool.iconClass"
               :id="'toolbox-'+tool.action"
               :action="tool.action"
            />
        </a>
        <br>
        <p>{{ header }}</p>
    </div>
</template>

<script>
    //import { mapActions } from 'vuex';

    export default {
        name: 'Toolbox',
        props: {
            action: { type: String, default: '' },
            bigIcon: { type: Boolean},
            childrenTools: { type: Array, default: null },
            header: { type: String, default: '' },
            tooltip: { type: String },
            iconClass: { type: String, default: '' },
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
