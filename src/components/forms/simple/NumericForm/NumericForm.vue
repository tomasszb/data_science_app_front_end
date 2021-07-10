<template>
    <div class="numeric-form  pr-2">
        <b-form-group
                :label="name"
                :label-sr-only="!showLabel"
                label-class="pb-1"
                :label-cols="horizontal ? 5 : 0"
                :horizontal="horizontal">
            <vue-numeric-input
                    controls-type="updown"
                    v-model="value"
                    placeholder="--auto--"
                    :precision="precision"
                    :min="min"
                    :max="max"
                    :step="step"
                    align="left"
                    class="c-100"
            />
        </b-form-group>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');
    import Vue from 'vue'

    export default {
        name: 'NumericForm',
        components: {
            vSelect
        },
        props: {
            objectID: {type: [Number, String], default: null},
            name: {type: String, default: ''},
            showLabel: {type: Boolean, default: true},
            horizontal: {type: Boolean, default: false},
            parameterIndex: {type: [Number, String]},
            route: {type: Array, default: function() {return []}},
            defaultValue: {},

            min: {type: Number, default: -Infinity},
            max: {type: Number, default: Infinity},
            step: {type: Number, default: 0.01},
            precision: {type: Number, default: 2}
        },
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects'
            ]),
            parentParameters() {
                return this.dataObjects[this.objectID]['parameters']
            },
            value: {
                get() {
                    return this.parentParameters.getPath(this.route.join('.')+'.'+this.parameterIndex, null)
                },
                set(newValue) {
                    this.$emit('value-changed', newValue);
                }
            }
        }
    };
</script>

<style src="./NumericForm.scss" lang="scss"></style>
