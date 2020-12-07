<template>
    <div class="literal-mapping">
        <b-form-group
                horizontal
                label="Normal field"
                label-for="normal-field"
                label-class="text-md-right"
                :label-cols="4"
                breakpoint="md"
        >
            <b-form-input type="text" id="normal-field" placeholder="May have placeholder" />
        </b-form-group>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    const R = require('ramda');

    export default {
        name: 'PrepSettings',
        components: {
            vSelect,
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
                    {}
                ],

                placement: 'bottom',
                editorContent: '',
                options: {
                    showGutter: false,
                    wrap: true,
                    indentedSoftWrap: false,
                    highlightActiveLine: false
                }
            }
        },
        methods: {
            addJoin() {
                this.mappingRows.push({ leftColumn: '', rightColumn: ''})
            },
            deleteJoin(index) {
                if (this.mappingRows.length > 1) {
                    this.mappingRows.splice(index, 1)
                }
            },
            onChange(value) {
                console.log(value);
            },
            editorInit: function () {
                require('brace/ext/language_tools'); //language extension prerequsite...
                require('brace/mode/python');    //language
                require('brace/theme/chrome');
                // require('brace/snippets/javascript'); //snippet
            }
        },
    };
</script>

<style src="./RegexMapping.scss" lang="scss"></style>
