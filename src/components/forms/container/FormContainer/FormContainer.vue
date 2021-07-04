<template>
    <div>
        <numeric-form
                v-if="typeSettings.type === 'integer'"
                :objectID="objectID"
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
    import {mapGetters, mapMutations} from "vuex";
    import {getObjectByRoute} from "@/core/projectManager";

    export default {
        name: "FormContainer",
        components: {
            ColumnForm, ConstantForm, NumericForm, FormulaForm, ColorForm,
            ConditionForm, BooleanForm, DictionaryForm, StringForm, SelectForm,
            MergeColumnPairForm, ColumnListForm, ScriptForm
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
            ])
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects'
            ]),
        },
        created() {
            if (this.typeSettings.hasOwnProperty('default')) {
                let parentParameters = this.dataObjects[this.objectID]['parameters']
                if (typeof getObjectByRoute(this.route, parentParameters)[this.parameterIndex] === 'undefined') {
                    // this.SET_DO_PARAMETER({
                    //     id: parseInt(this.objectID),
                    //     route: this.route.concat(this.parameterIndex),
                    //     value: this.typeSettings['default']
                    // })
                }

            }
        }
    }
</script>

<style src="./FormContainer.scss" lang="scss"></style>
