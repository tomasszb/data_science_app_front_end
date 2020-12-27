<template>
    <div class="flex-vertical-no-scroll">
        <b-form-group
                label="Mapping Type"
                label-for="mapping-select"
        >
            <v-select
                    id="mapping-select"
                    append-to-body
                    v-model="mappingType"
                    :options="mappingTypes"
                    :clearable="false"
            />
        </b-form-group>
        <br>
        <div class="flex-vertical">
            <div class="setting-row mapping-setting-header">
                <div class="flex-horizontal-no-scroll">
                    <div class="flex-grow-1 c-80 px-1 align-items-center">
                        <h6>Define Mapping</h6>
                    </div>
                    <div class="c-10 px-1 align-items-center">
                        <a @click="clearAll()">
                            clear
                        </a>
                    </div>
                </div>
            </div>
        <div class="mapping-setting-columns-container flex-vertical-no-scroll">
                <div v-for="(mapping, i) in mappingRows" :key="i">
                    <div class="flex-horizontal align-items-center">
                        <div class="c-100 px-1 ">
                            <literal-mapping v-if="mappingType==='Literal'" :initial="mapping.value"/>
                            <formula-mapping v-if="mappingType==='Formula'"/>
                            <range-mapping v-if="mappingType==='Range'"/>
                            <bins-mapping v-if="mappingType==='Bins'" />
                            <regex-mapping v-if="mappingType==='Regular Expresion'"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    const R = require('ramda');
    import BinsMapping from "./BinsMapping/BinsMapping";
    import FormulaMapping from "./FormulaMapping/FormulaMapping";
    import LiteralMapping from "./LiteralMapping/LiteralMapping";
    import RangeMapping from "./RangeMapping/RangeMapping";
    import RegexMapping from "./RegexMapping/RegexMapping";
    import Vue from 'vue'

    export default {
        name: 'PrepSettings',
        components: {
            vSelect,
            BinsMapping, FormulaMapping, LiteralMapping, RangeMapping, RegexMapping,
            editor: require('vue2-ace-editor'),
        },
        props: {
            objectID: { type: String, default: null },
        },
        data() {
            return {
                mappingType: 'Literal',

                mappingTypes: ['Literal', 'Formula', 'Range', 'Bins', 'Regular Expresion'],

                mappingRows: [
                    {'value': 'hello: se'}
                ],

                placement: 'bottom'
            }
        },

        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETERS'
            ]),
            editorInit() {
                require('brace/ext/language_tools'); //language extension prerequsite...
                require('brace/mode/python');    //language
                require('brace/theme/chrome');
                // require('brace/snippets/javascript'); //snippet
            },
            clearAll() {
                console.log(this.mappingRows);
                // this.mappingRows.splice(1, this.mappingRows.length);
                Vue.set(this.mappingRows, 0, {'value': ''});
                console.log(this.mappingRows);
            },
            getParameters() {
                if (Object.keys(this.columnExplorerDisplaySettings).length !== 0) {
                    this.columnFilter = this.columnExplorerDisplaySettings['column_filter'];
                    this.sortColumn = this.columnExplorerDisplaySettings['sort_column'];
                    this.sortType = this.columnExplorerDisplaySettings['sort_type'];
                    this.typeFilter = this.columnExplorerDisplaySettings['type_filter'];
                } else {
                    this.columnFilter = this.defaultColumnFilter;
                    this.sortColumn = this.defaultSortColumn;
                    this.sortType = this.defaultSortType;
                    this.typeFilter = this.defaultTypeFilter;
                }
                this.updateDisplaySettings()
            },

        },
    };
</script>

<style src="./MappingForm.scss" lang="scss"></style>
