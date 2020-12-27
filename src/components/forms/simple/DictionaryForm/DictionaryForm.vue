<template>
    <div class="dictionary-form pr-2">
        <b-form-group
                :label="name"
                label-class="pb-1"
                :label-cols="horizontal ? 5 : 0"
                :horizontal="horizontal"
        >
            <b-form-textarea
                    :rows="3"
                    v-model="value"
                    :max-rows="6"
                    :formatter="formatter"
                    :lazy-formatter="true"
                    :state="validate()"
            />
        </b-form-group>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');

    export default {
        name: 'DictionaryForm',
        components: {
            vSelect
        },
        props: {
            dataObjectID: {type: String, default: null},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false},
            showLabel: {type: Boolean, default: true},
            parameterIndex: {type: [Number, String]},
            route: {type: Array, default: function() {return []}},
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
                return this.dataObjects[this.dataObjectID]['parameters']
            },
            value: {
                get() {
                    return getObjectByRoute(this.route, this.parentParameters)[this.parameterIndex]
                },
                set(newValue) {
                    this.SET_DO_PARAMETER({
                        objectID: parseInt(this.dataObjectID),
                        route: this.route,
                        parameterName: this.parameterIndex,
                        parameterValue: newValue
                    })
                }
            }
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER'
            ]),
            formatter(value) {
                let newValue = R.clone(value);
                newValue = newValue.replace(/ */gi, '');
                newValue = newValue.replace(/\:/gi, ' : ');
                return newValue
            },
            validate() {
                console.log(this.value)
                let matches = this.value.match(/\s*[^\s]+\s*:\s*[^\s]+\s*/gi);
                let lines = this.value.match(/.+\n*/gi);
                let matchCount = matches !== null ? matches.length : [];
                let linesCount = lines !== null ? lines.length : [];
                let validation = (matchCount=== linesCount) || this.value === "";
                return validation===false ? validation : null
            },
        },
    };
</script>

<style src="./DictionaryForm.scss" lang="scss"></style>
