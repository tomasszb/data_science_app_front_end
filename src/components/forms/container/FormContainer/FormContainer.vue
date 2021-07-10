<template>
    <div>
        <numeric-form
                v-if="typeSettings.type === 'integer'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
                :precision="null"
                :step="10"
        />
        <numeric-form
                v-if="typeSettings.type === 'float'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
                :precision="2"
                :step="0.01"
        />
        <color-form
                v-if="typeSettings.type === 'color'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
        />
        <select-form
                v-if="typeSettings.type === 'string' && typeSettings.options !== null"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :options="typeSettings.options"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
        />
        <string-form
                v-if="typeSettings.type === 'string' && typeSettings.options === null"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
        />
        <boolean-form
                v-if="typeSettings.type === 'boolean'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
        />
        <column-form
                v-if="typeSettings.type === 'column'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
        />
        <column-list-form
                v-if="typeSettings.type === 'column_list'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :settings="passSettings"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
        />
        <merge-column-pair-form
                v-if="typeSettings.type === 'column_pair'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
        />
        <formula-form
                v-if="typeSettings.type === 'formula'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
        />
        <dictionary-form
                v-if="typeSettings.type === 'dictionary'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
        />
        <condition-form
                v-if="typeSettings.type === 'condition'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
                :conditionTypes="['<','<=','=','>','>=']"
        />
        <script-form
                v-if="typeSettings.type === 'query'"
                :objectID="objectID"
                @value-changed="setValue"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :defaultValue="typeSettings.default"
                :showLabel="showLabel"
        />
        <constant-form
            v-if="typeSettings.type === 'constant'"
            :objectID="objectID"
            @value-changed="setValue"
            :parameterIndex="parameterIndex"
            :name="name"
            :horizontal="horizontal"
            :route="route"
            :defaultValue="typeSettings.value"
            :showLabel="showLabel"
        />
    </div>
</template>

<script>
    import NumericForm from "../../../forms/simple/NumericForm/NumericForm";
    import BooleanForm from "../../../forms/simple/BooleanForm/BooleanForm";
    import ConstantForm from "../../simple/ConstantForm/ConstantForm";
    import ConditionForm from "../../../forms/nested/ConditionForm/ConditionForm";
    import DictionaryForm from "../../../forms/simple/DictionaryForm/DictionaryForm";
    import StringForm from "../../../forms/simple/StringForm/StringForm";
    import ColumnForm from "../../../forms/simple/ColumnForm/ColumnForm";
    import ColorForm from "../../../forms/simple/ColorForm/ColorForm";
    import FormulaForm from "../../../forms/simple/FormulaForm/FormulaForm";
    import MergeColumnPairForm from "../../nested/MergeColumnPairForm/MergeColumnPairForm";
    import SelectForm from "../../simple/SelectForm/SelectForm";
    import ScriptForm from "../../simple/ScriptForm/ScriptForm";
    import ColumnListForm from "../../simple/ColumnListForm/ColumnListForm";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {getObjectByRoute} from "@/core/projectManager";
    import Vue from "vue";

    export default {
        name: "FormContainer",
        components: {
            ColumnForm, ConstantForm, NumericForm, FormulaForm, ColorForm,
            ConditionForm, BooleanForm, DictionaryForm, StringForm, SelectForm,
            MergeColumnPairForm, ColumnListForm, ScriptForm
        },
        data() {
            return {
                liveValue: null,
                frozenValue: null,
                pauseUpdates: false
            }
        },
        props: {
            route: {type: Array, default: function() {return []}},
            defaultValue: {},
            parameterIndex: {type: [Number, String]},
            horizontal: {type: Boolean, default: false},
            typeSettings: {type: Object, default: function() {return {}} },
            passSettings: {type: Object, default: function() {return {}} },
            objectID: { type: [Number, String], default: null },
            name: {type: String, default: ''},
            showLabel: {type: Boolean, default: true},
            list: {type: Boolean, default: false}
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER'
            ]),
            ...mapActions('proj/object_manager', [
                'setDataObjectParameter', 'dropDataObjectParameter'
            ]),
            setValue(newValue) {
                Vue.set(this, 'liveValue', newValue)
            },
            setPauseTimer() {
                this.pauseUpdates = true;
                setTimeout(() => {
                    this.pauseUpdates = false
                }, 500)
            },
            updateValue(newValue, oldValue) {
                if (newValue!==oldValue) {
                    if ((isNaN(newValue) && typeof newValue=='number') || newValue===null) {
                        // console.log('newValue', newValue)
                        this.dropDataObjectParameter(
                            {
                                id: this.objectID,
                                route: this.route.concat(this.parameterIndex)
                            }
                        )
                    } else {
                        this.setDataObjectParameter({
                            id: this.objectID,
                            route: this.route.concat(this.parameterIndex),
                            value: newValue
                        })
                    }
                }
            }
        },
        watch: {
            liveValue(newValue, oldValue) {
                if(this.pauseUpdates===false) {
                    this.updateValue(this.liveValue, this.frozenValue);
                    this.frozenValue = this.liveValue;
                    this.setPauseTimer()
                }
            },
            pauseUpdates(value) {
                if(value===false) {
                    this.updateValue(this.liveValue, this.frozenValue);
                    this.frozenValue = this.liveValue;
                }
            }
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects'
            ]),

        }
    }
</script>

<style src="./FormContainer.scss" lang="scss"></style>
