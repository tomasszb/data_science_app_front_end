<template>
    <div class="string-form pr-2">
        <b-form-group
                :label="name"
                :label-sr-only="!showLabel"
                label-class="pb-1"
                :label-cols="horizontal ? 5 : 0"
                :horizontal="horizontal"
        >
            <b-form-input size="sm" v-model="value"></b-form-input>
        </b-form-group>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');
    import Vue from 'vue';

    export default {
        name: 'StringForm',
        components: {
            vSelect
        },
        props: {
            objectID: {type: [Number, String], default: null},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false},
            showLabel: {type: Boolean, default: true},
            parameterIndex: {type: [Number, String]},
            route: {type: Array, default: function() {return []}},
            defaultValue: {},
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
                // // console.log('parentParameters', this.objectID, this.dataObjects[this.objectID]);
                // // console.log(this.dataObjects, this.objectID)
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
        }
    };
</script>

<style src="./StringForm.scss" lang="scss"></style>
