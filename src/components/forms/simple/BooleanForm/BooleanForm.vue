<template>
    <b-form-group class="boolean-form abc-checkbox pr-2">
        <input
                type="checkbox"
                :id="[...[objectID], ...route, ...[parameterIndex]].join('-')"
                v-model="value"
        />
        <label :for="[...[objectID], ...route, ...[parameterIndex]].join('-')">{{name}}</label>
    </b-form-group>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');
    import Vue from 'vue'

    export default {
        name: 'BooleanForm',
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
            defaultValue: {}
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
                    return getObjectByRoute(this.route, this.parentParameters)[this.parameterIndex]
                },
                set(newValue) {
                    this.setDataObjectParameter({
                        id: this.objectID,
                        route: this.route.concat(this.parameterIndex),
                        value: newValue
                    })
                }
            }
        },
        methods: {
            ...mapActions('proj/object_manager', [
                'setDataObjectParameter'
            ]),
        },
        mounted() {
            if (typeof this.value==='undefined') {
                Vue.set(this, 'value', this.defaultValue);
            }
        }
    };
</script>

<style src="./BooleanForm.scss" lang="scss"></style>
