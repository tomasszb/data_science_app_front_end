<template>
    <div class="formula-form pr-2">
        <b-form-group
                :label="name"
                label-class="pb-1"
                :label-cols="horizontal ? 5 : 0"
                :horizontal="horizontal"
        >
            <b-form-textarea
                    :rows="1"
                    v-model="value"
                    :max-rows="5"
                    :formatter="formatter"
                    :lazy-formatter="true"
                    :state="validate()"
            />
        </b-form-group>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');
    import Vue from 'vue'

    export default {
        name: 'FormulaForm',
        components: {
            vSelect
        },
        props: {
            objectID: {type: String, default: null},
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
                return value
            },
            validate() {
                return null
            },
        },
    };
</script>

<style src="./FormulaForm.scss" lang="scss"></style>
