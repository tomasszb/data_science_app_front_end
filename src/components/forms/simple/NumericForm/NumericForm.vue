<template>
    <div class="numeric-form  pr-2">
        {{parameterIndex}}
        <b-form-group
                :label="name"
                :label-sr-only="!showLabel"
                label-class="pb-1"
                :label-cols="horizontal ? 5 : 0"
                :horizontal="horizontal">
            <vue-numeric-input
                    controls-type="updown"
                    v-model="value"
                    :precision="precision"
                    :min="min"
                    :max="max"
                    :step="step"
                    class="c-100"
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

    export default {
        name: 'NumericForm',
        components: {
            vSelect
        },
        props: {
            dataObjectID: {type: String, default: null},
            name: {type: String, default: ''},
            showLabel: {type: Boolean, default: true},
            horizontal: {type: Boolean, default: false},
            parameterIndex: {type: [Number, String]},
            route: {type: Array, default: function() {return []}},

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
                return this.dataObjects[this.dataObjectID]['parameters']
            },
            value: {
                get() {
                    return getObjectByRoute(this.route, this.parentParameters)[this.parameterIndex]
                },
                set(newValue) {
                    this.UPDATE_DATA_OBJECT_PARAMETER({
                        objectID: parseInt(this.dataObjectID),
                        route: this.route,
                        parameterName: this.parameterIndex,
                        parameterValue: newValue
                    })
                }
            }
        },
        methods: {
            ...mapMutations('proj', [
                'UPDATE_DATA_OBJECT_PARAMETER'
            ]),

        }
    };
</script>

<style src="./NumericForm.scss" lang="scss"></style>
