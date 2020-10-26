<template>
    <div class="chart-setting">
        <ColorPicker v-if="setting.form==='color'" :setting="setting"/>
        <CoordinatesPicker v-if="setting.form==='coordinates'" :setting="setting"/>
        <BorderPicker v-if="setting.form==='border'" :setting="setting"/>
        <TextPicker v-if="setting.form==='text'" :setting="setting"/>
        <FontPicker v-if="setting.form==='font'" :setting="setting"/>
        <StylePicker v-if="setting.form==='style'" :setting="setting"/>
        <SizePicker v-if="setting.form==='size'" :setting="setting"/>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapGetters} from "vuex";
    import BorderPicker from './BorderPicker/BorderPicker'
    import ColorPicker from './ColorPicker/ColorPicker'
    import CoordinatesPicker from './CoordinatesPicker/CoordinatesPicker'
    import FontPicker from './FontPicker/FontPicker'
    import SizePicker from './SizePicker/SizePicker'
    import StylePicker from './StylePicker/StylePicker'
    import TextPicker from './TextPicker/TextPicker'

    export default {
        name: "ChartDataCard",
        props: {
            alias: { type: String, default: '' },
            setting: { type: Object, default: null }
        },
        components: {
            ColorPicker, CoordinatesPicker, BorderPicker, TextPicker, FontPicker, StylePicker, SizePicker
        }
    }
</script>

<style src="Setting.scss" lang="scss"></style>