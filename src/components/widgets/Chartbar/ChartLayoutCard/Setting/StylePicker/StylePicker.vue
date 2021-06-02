<template>
    <div>
        <div class="chart-setting-title">
            {{setting.title}}:
        </div>
        <b-dropdown :text="selectedOption" variant="default">
            <b-dropdown-item-button
                    v-for="option of options"
                    :key="option"
                    @click="changeSelectOption(option)"
            >
                {{option}}
            </b-dropdown-item-button>
        </b-dropdown>
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
                markerOptions: ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
                fontOptions: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                selectedOption: null
            }
        },
        computed: {
            options() {
                // console.log(this.setting, this.setting['form_detail']);
                if (this.setting['form_detail']==="marker") {
                    return this.markerOptions
                }
                if (this.setting['form_detail']==="font") {
                    return this.fontOptions
                }
            }
        },
        methods: {
            changeSelectOption(option) {
                this.selectedOption = option;
            }
        }
    }
</script>

<style src="./StylePicker.scss" lang="scss"></style>
