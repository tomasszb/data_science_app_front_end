<template>
    <b-nav-item class="d-md-down-none">
        <a
           :id="'toolbox-' + id"
           @click="$emit('toolClicked', id)"
           :class="'px-2 '+statusClass" href="#">
            <b-tooltip :target="'toolbox-' + id" :title="name" triggers="hover" noninteractive>
                {{tooltip}}
            </b-tooltip>
            <i :class="'la fa-lg pb-1 ' + baseIcon" />
        </a>
    </b-nav-item>
</template>

<script>
    import AppIcon from "../AppIcon/AppIcon";

    export default {
        name: 'Toolbox',
        components: {AppIcon},
        props: {
            header: { type: String, default: '' },
            name: { type: String, default: '' },
            status: { type: String, default: 'active' },
            id: { type: String, default: '' },
            tooltip: { type: String, default: '' },
            baseIcon: { type: String, default: '' },
            statusIcon: { type: Object, default() {return {}} },
        },
        computed: {
            isActive() {
                return (this.activeItem
                    && this.activeItem.includes(this.index)
                    && this.headerLinkWasClicked);
            },
            statusClass() {
                return 'toolbox-status-' + this.status
            }
        },
    };
</script>

<style src="./Toolbox.scss" lang="scss" scoped />
