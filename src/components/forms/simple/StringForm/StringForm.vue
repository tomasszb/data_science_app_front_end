<template>
    <div class="string-form pr-2">
        <b-form-group
                :label="name"
                :label-sr-only="!showLabel"
                label-class="pb-1"
                :label-cols="horizontal ? 5 : 0"
                :horizontal="horizontal"
        >
            <b-form-input v-model="value"></b-form-input>
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
                    return getObjectByRoute(this.route, this.parentParameters)[this.parameterIndex]
                },
                set(newValue) {
                    this.SET_DO_PARAMETER({
                        id: this.objectID,
                        route: this.route.concat(this.parameterIndex),
                        value: newValue
                    })
                }
            }
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER'
            ]),
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
            if (typeof this.value==='undefined') {
                Vue.set(this, 'value', this.defaultValue);
            }
        }

    };
</script>

<style src="./StringForm.scss" lang="scss"></style>
