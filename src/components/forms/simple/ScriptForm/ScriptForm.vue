<template>
    <div class="script-form pr-2 flex-vertical-no-scroll">
        <editor
            v-model="value"
            @init="editorInit"
            lang="sql"
            theme="chrome"
            width="100%"
            height="100%">
        </editor>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import {getObjectByRoute} from "../../../../core/projectManager";
const R = require('ramda');

export default {
    name: 'ScriptForm',
    components: {
        editor: require('vue2-ace-editor'),
    },
    props: {
        objectID: {type: String, default: null},
        name: {type: String, default: ''},
        showLabel: {type: Boolean, default: true},
        horizontal: {type: Boolean, default: false},
        parameterIndex: {type: [Number, String]},
        route: {type: Array, default: function() {return []}},

        options: {type: Array, default: function() {return []}},
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
            return this.dataObjects[this.objectID]['parameters']
        },
        value: {
            get() {
                return getObjectByRoute(this.route, this.parentParameters)[this.parameterIndex]
            },
            set(newValue) {
                this.SET_DO_PARAMETER({
                    id: parseInt(this.objectID),
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
        editorInit: function (editor) {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/sql')    //language
            require('brace/theme/chrome')

            editor.setOptions({
                printMargin: false,
                wrap: true,
                scrollPastEnd: 0.3,
                fontSize: "16px"
            });
        }

    }
};
</script>

<style src="./ScriptForm.scss" lang="scss"></style>
