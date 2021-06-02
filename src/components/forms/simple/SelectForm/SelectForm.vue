<template>
    <div class="select-form pr-2">
        <b-form-group
                :label="name"
                :label-sr-only="!showLabel"
                label-class="pt-1"
                :label-cols="horizontal ? 5 : 0"
                :horizontal="horizontal"
        >
            <v-select
                    :id="'condition-select'+objectID"
                    append-to-body
                    class="c-100"
                    v-model="value"
                    :options="options"
                    :clearable="false"
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
        name: 'SelectForm',
        components: {
            vSelect
        },
        props: {
            objectID: {type: String, default: null},
            name: {type: String, default: ''},
            showLabel: {type: Boolean, default: true},
            horizontal: {type: Boolean, default: false},
            parameterIndex: {type: [Number, String]},
            route: {type: Array, default: function() {return []}},

            options: {type: Array, default: function() {return []}},
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
        },
        mounted() {
            if (typeof this.value==='undefined') {
                Vue.set(this, 'value', this.defaultValue);
            }
        }
    };
</script>

<style src="./SelectForm.scss" lang="scss"></style>
