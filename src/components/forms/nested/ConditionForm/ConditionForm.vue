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
                        :dataObjectID="dataObjectID"
                        class="c-30 flex-grow-1"
                        :route="extendedRoute"
                        :name="'condition'"
                        :options="['<=','<','>','=']"
                />
                <numeric-form
                        :dataObjectID="dataObjectID"
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
            dataObjectID: {type: String, default: null},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false},
            route: {type: Array, default: function() {return []}},
            conditionTypes: {type: Array, default: function () { return [] }},
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects'
            ]),
            parameters() {
                return this.dataObjects[this.dataObjectID]['parameters']
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
                'UPDATE_DATA_OBJECT_PARAMETER'
            ]),
        },
        created() {
            if (typeof this.localParameters === 'undefined') {
                this.UPDATE_DATA_OBJECT_PARAMETER({
                    objectID: parseInt(this.dataObjectID),
                    route: this.route,
                    parameterName: this.parameterIndex,
                    parameterValue: {}
                })
            }
        }

    };
</script>

<style src="./ConditionForm.scss" lang="scss"></style>
