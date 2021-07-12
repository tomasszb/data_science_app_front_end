<template>
    <div class="nav-sidebar r--100">
        <vue-resizable
                :width="width"
                :min-width="minWidth"
                :max-width="maxWidth"
                :height="0"
                :active="['r']"
                :disableAttributes="['h']"
                class="nav-sidebar-wrapper flex-vertical-no-scroll"
                @resize:end="storeWidth"
                @mount="storeWidth"
        >

                <slot>
                </slot>
        </vue-resizable>
    </div>

</template>

<script>
    import VueResizable from 'vue-resizable'
    import {mapGetters, mapMutations} from "vuex";
    const R = require('ramda');
    import config from '../../../config';
    import {getObjectSettings, getObjectSetting} from "../../../core/projectObjectParser";

    export default {
        name: "NavSidebar",
        props: {
            defaultWidth: { type: Number},
            minWidth: { type: Number },
            maxWidth: { type: Number },
            settingPrefix: { type: String }
        },
        components: {
            VueResizable
        },
        data() {
            return {
                debug: config.debug
            }
        },
        computed: {
            ...mapGetters('proj', ['activeProcess', 'projectObjects']),
            displaySettings() {
                // console.log('displaySettings', getObjectSetting(this.projectObjects, this.activeProcess, 'display_settings', {}));
                return getObjectSetting(
                    this.projectObjects,
                    this.activeProcess,
                    'display_settings',
                    {}
                );
            },
            width() {
                if (this.displaySettings.hasOwnProperty(this.settingName)) {
                    return this.displaySettings[this.settingName]
                }
                else {
                    return this.defaultWidth
                }
            },
            settingName() {
                return this.settingPrefix + "-nav-sidebar-width"
            }
        },
        methods: {
            ...mapMutations('proj', ['UPDATE_DISPLAY_SETTINGS']),
            storeWidth(event) {
                let displaySettings = R.clone(this.displaySettings);
                displaySettings[this.settingName] = event.width;
                this.UPDATE_DISPLAY_SETTINGS({
                    ObjectID: this.projectObjects[this.activeProcess].id,
                    displaySettings: displaySettings
                });
            }
        },
        created() {
          // console.log('created')
        }
    }
</script>

<style src="./NavSidebar.scss" lang="scss" />
