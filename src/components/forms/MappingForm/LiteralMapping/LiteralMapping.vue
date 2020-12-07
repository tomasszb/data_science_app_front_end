<template>
    <div class="literal-mapping">
        {{initialValue}}
        <b-form-group
                label-for="default-textarea"
                breakpoint="md"
        >
            <b-form-textarea
                    :rows="3"
                    v-model="value"
                    :max-rows="6"
                    :cols="4"
                    :formatter="formatter"
                    :lazy-formatter="true"
                    :state="validate()"
            />
        </b-form-group>
    </div>
</template>

<script>
    import 'vue-select/dist/vue-select.css';
    const R = require('ramda');
    import Vue from 'vue'

    export default {
        name: 'LiteralMapping',
        components: {
            editor: require('vue2-ace-editor'),
        },
        props: {
            initial: {type: String, default: ''},
        },
        data() {
            return {
                value: ""
            }
        },
        methods: {
            formatter(value) {
                let newValue = R.clone(value);
                newValue = newValue.replace(/ */gi, '');
                newValue = newValue.replace(/\:/gi, ' : ');
                return newValue
            },
            validate() {
                let matches = this.value.match(/\s*[^\s]+\s*:\s*[^\s]+\s*/gi);
                let lines = this.value.match(/.+\n*/gi);
                let matchCount = matches !== null ? matches.length : [];
                let linesCount = lines !== null ? lines.length : [];
                let validation = (matchCount=== linesCount) || this.value === "";
                return validation===false ? validation : null
            },
        },
        mounted() {
            Vue.set(this, 'value', this.initialValue);
        },
        computed: {
            initialValue() {
                return this.initial
            }
        },
        watch: {
            initialValue: function(initialValue) {
                console.log('changed');
                Vue.set(this, 'value', initialValue)
            }
        },
    };
</script>

<style src="./LiteralMapping.scss" lang="scss"></style>
