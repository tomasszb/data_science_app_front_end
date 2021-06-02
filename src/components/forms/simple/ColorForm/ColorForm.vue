<template>
    <b-form-group
            :label="name"
            :label-sr-only="!showLabel"
            label-class="pb-1"
            :label-cols="horizontal ? 5 : 0"
            :horizontal="horizontal"
    >
        <b-form-input class="color-form c-100 pr-2" v-model="value" type="color"></b-form-input>
    </b-form-group>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');
    import Vue from 'vue'

    export default {
        name: 'ColorForm',
        components: {
            vSelect
        },
        props: {
            objectID: {type: String, default: null},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false},
            showLabel: {type: Boolean, default: true},
            parameterIndex: {type: [Number, String]},
            route: {
                type: Array, default: function () {
                    return []
                }
            },
        },
        data() {
            return {}
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
        },
        mounted() {
            if (typeof this.value==='undefined') {
                Vue.set(this, 'value', this.defaultValue);
            }
        }
    }
</script>

<style src="./ColorForm.scss" lang="scss"></style>
