<template>
    <div class="condition-form">
        <b-form-group
                :label="name"
                label-class="pb-1"
                :label-cols="horizontal ? 5 : 0"
                :horizontal="horizontal"
        >
            <div class="flex-horizontal-no-scroll">
                <select-form
                        :objectID="objectID"
                        class="c-30 flex-grow-1"
                        :route="extendedRoute"
                        :name="'condition'"
                        :options="['<=','<','>','=']"
                />
                <numeric-form
                        :objectID="objectID"
                        :precision="null"
                        class="c-70 flex-grow-1"
                        :route="extendedRoute"
                        :name="'value'"
                        :step="1"
                />
            </div>
        </b-form-group>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import NumericForm from "../../simple/NumericForm/NumericForm";
    import SelectForm from "../../simple/SelectForm/SelectForm";
    import {getObjectByRoute} from "../../../../core/projectManager";
    import 'vue-select/dist/vue-select.css';
    const R = require('ramda');

    export default {
        name: 'ConditionForm',
        components: {
            NumericForm, SelectForm
        },
        props: {
            objectID: {type: String, default: null},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false},
            route: {type: Array, default: function() {return []}},
            defaultValue: {},
            conditionTypes: {type: Array, default: function () { return [] }},
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects'
            ]),
            parameters() {
                return this.dataObjects[this.objectID]['parameters']
            },
            localParameters() {
                return this.parameters[this.name]
            },
            extendedRoute() {
                return this.route.concat(['condition'])
            }
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER'
            ]),
        },
        created() {
            if (typeof this.localParameters === 'undefined') {
                this.SET_DO_PARAMETER({
                        id: parseInt(this.objectID),
                        route: this.route.concat(this.parameterIndex),
                        value: {}
                    })
            }
        }

    };
</script>

<style src="./ConditionForm.scss" lang="scss"></style>
