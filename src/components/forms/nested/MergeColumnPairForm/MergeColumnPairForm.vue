<template>
    <div class="condition-form">
        <div class="flex-horizontal-no-scroll align-items-center">
            <column-form
                    :objectID="objectID"
                    class="c-50"
                    :showLabel="showLabel"
                    parameterIndex="left"
                    :route="route.concat([parameterIndex])"
                    name="left columns"
                    :label-cols="horizontal ? 5 : 0"
                    :horizontal="horizontal"
            />
            <column-form
                    :objectID="objectID"
                    class="c-50"
                    :showLabel="showLabel"
                    parameterIndex="right"
                    :route="route.concat([parameterIndex])"
                    name="right columns"
            />
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import NumericForm from "../../simple/NumericForm/NumericForm";
    import ColumnForm from "../../simple/ColumnForm/ColumnForm";
    import {getObjectByRoute} from "../../../../core/projectManager";
    import 'vue-select/dist/vue-select.css';
    const R = require('ramda');

    export default {
        name: 'MergeColumnPair',
        components: {
            NumericForm, ColumnForm
        },
        props: {
            objectID: {type: [Number, String], default: null},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false},
            parameterIndex: {type: [Number, String]},
            showLabel: {type: Boolean, default: true},
            route: {type: Array, default: function() {return []}},
            defaultValue: {},
            conditionTypes: {type: Array, default: function () { return [] }},
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects'
            ]),
            parentParameters() {
                return this.dataObjects[this.objectID]['parameters']
            },
            localParameters() {
                return getObjectByRoute(this.route, this.parentParameters)[this.parameterIndex]
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
        created() {
            if (typeof this.localParameters === 'undefined' || this.localParameters === null) {
                // console.log('merge column created', parseInt(this.objectID), this.route.concat(this.parameterIndex));
                this.SET_DO_PARAMETER({
                        id: parseInt(this.objectID),
                        route: this.route.concat(this.parameterIndex),
                        value: {}
                    })
            }
        }

    };
</script>

<style src="./MergeColumnPairForm.scss" lang="scss"></style>
