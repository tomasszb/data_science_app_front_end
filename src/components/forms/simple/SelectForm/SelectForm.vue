<template>
    <div class="pr-2 select-form">
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
                    :key="JSON.stringify(value).hashCode()"
                    :options="optionsSettings"
                    :clearable="false"
            >
                <template slot="option" slot-scope="option">
                    <div class="menu-item">
                        {{ option.label }}
                    </div>
                </template>
            </v-select>
        </b-form-group>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
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
            objectID: {type: [Number, String], default: null},
            name: {type: String, default: ''},
            showLabel: {type: Boolean, default: true},
            horizontal: {type: Boolean, default: false},
            parameterIndex: {type: [Number, String]},
            route: {type: Array, default: function() {return []}},
            defaultValue: {},
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
            optionsSettings() {
                let result = [{'value': null, 'label': '--auto--'}];
                for (let value of this.options) {
                    result.push({'value': value, 'label': value})
                }
                return result
            },
            value: {
                get() {
                    return this.parentParameters.getPath(
                        this.route.join('.')+'.'+this.parameterIndex,
                        {'value': null, 'label': '--auto--'}
                    )
                },
                set(newValue) {
                    this.$emit('value-changed', newValue['value']);
                }
            }
        }
    };
</script>

<style src="./SelectForm.scss" lang="scss"></style>
