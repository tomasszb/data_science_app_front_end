<template>
    <div class="formula-mapping">
        <editor
                v-model="editorContent"
                @init="editorInit"
                lang="python"
                theme="chrome"
                width="100%"
                height="100"
                :options="options"
        />
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import 'vue-select/dist/vue-select.css';
    const R = require('ramda');

    export default {
        name: 'PrepSettings',
        components: {
            editor: require('vue2-ace-editor'),
        },
        props: {
            objectID: { type: String, default: null },
        },
        data() {
            return {
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

<style src="./FormulaMapping.scss" lang="scss"></style>
