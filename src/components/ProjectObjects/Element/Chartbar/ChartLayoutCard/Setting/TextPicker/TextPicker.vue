<template>
    <div class="text-picker-form">
        <b-form-input class="text-picker" v-model="text" type="text" :placeholder="setting.title"></b-form-input>
    </div>
</template>

<script>
    export default {
        name: "ColorPicker",
        props: {
            setting: { type: Object, default: function() {return {}} }
        },
        data() {
            return {
                text: ""
            }
        }
    }
</script>

<style src="./TextPicker.scss" lang="scss"></style>