<template>
    <div>
        <ColorPicker v-if="setting.form==='color'" :title="setting.title"/>
        <CoordinatesPicker v-if="setting.form==='coordinates'" :title="setting.title"/>
        <BorderPicker v-if="setting.form==='border'" :title="setting.title"/>
        <TextPicker v-if="setting.form==='text'" :title="setting.title"/>
        <FontPicker v-if="setting.form==='font'" :title="setting.title"/>
        <StylePicker v-if="setting.form==='style'" :title="setting.title"/>
        <SizePicker v-if="setting.form==='size'" :title="setting.title"/>
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
