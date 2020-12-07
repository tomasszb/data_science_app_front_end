<template>
    <div>
        <numeric-form
                v-if="typeSettings.type === 'integer'"
                :dataObjectID="dataObjectID"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :showLabel="showLabel"
                :precision="null"
                :step="1"
        />
        <numeric-form
                v-if="typeSettings.type === 'float'"
                :dataObjectID="dataObjectID"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :showLabel="showLabel"
                :precision="2"
                :step="0.01"
        />
        <string-form
                v-if="typeSettings.type === 'string'"
                :dataObjectID="dataObjectID"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :showLabel="showLabel"
        />
        <boolean-form
                v-if="typeSettings.type === 'boolean'"
                :dataObjectID="dataObjectID"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :showLabel="showLabel"
        />
        <column-form
                v-if="typeSettings.type === 'column'"
                :dataObjectID="dataObjectID"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :showLabel="showLabel"
        />
        <merge-column-pair-form
                v-if="typeSettings.type === 'column_pair'"
                :dataObjectID="dataObjectID"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :showLabel="showLabel"
        />
        <formula-form
                v-if="typeSettings.type === 'formula'"
                :dataObjectID="dataObjectID"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :showLabel="showLabel"
        />
        <dictionary-form
                v-if="typeSettings.type === 'dictionary'"
                :dataObjectID="dataObjectID"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :showLabel="showLabel"
        />
        <condition-form
                v-if="typeSettings.type === 'condition'"
                :dataObjectID="dataObjectID"
                :parameterIndex="parameterIndex"
                :name="name"
                :horizontal="horizontal"
                :route="route"
                :showLabel="showLabel"
                :conditionTypes="['<','<=','=','>','>=']"
        />
    </div>
</template>

<script>
    import MergeForm from "../../../forms/MergeForm/MergeForm";
    import MappingForm from "../../../forms/MappingForm/MappingForm";
    import NumericForm from "../../../forms/simple/NumericForm/NumericForm";
    import BooleanForm from "../../../forms/simple/BooleanForm/BooleanForm";
    import ConditionForm from "../../../forms/nested/ConditionForm/ConditionForm";
    import DictionaryForm from "../../../forms/simple/DictionaryForm/DictionaryForm";
    import StringForm from "../../../forms/simple/StringForm/StringForm";
    import ColumnForm from "../../../forms/simple/ColumnForm/ColumnForm";
    import FormulaForm from "../../../forms/simple/FormulaForm/FormulaForm";
    import MergeColumnPairForm from "../../nested/MergeColumnPairForm/MergeColumnPairForm";

    export default {
        name: "FormContainer",
        components: {
            ColumnForm, MergeForm, MappingForm, NumericForm, FormulaForm,
            ConditionForm, BooleanForm, DictionaryForm, StringForm,
            MergeColumnPairForm
        },
        props: {
            route: {type: Array, default: function() {return []}},
            parameterIndex: {type: [Number, String]},
            horizontal: {type: Boolean, default: false},
            typeSettings: {type: Object, default: function() {return {}} },
            dataObjectID: { type: String, default: null },
            name: {type: String, default: ''},
            showLabel: {type: Boolean, default: true},
            list: {type: Boolean, default: false}
        },
    }
</script>

<style src="./FormContainer.scss" lang="scss"></style>
