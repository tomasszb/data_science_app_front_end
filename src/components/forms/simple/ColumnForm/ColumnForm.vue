<template>
    <div class="column-form pr-2">
        <b-form-group
                :label="name"
                :label-sr-only="!showLabel"
                label-class="pb-1"
                :label-cols="horizontal ? 5 : 0"
                :horizontal="horizontal"
        >
            <v-select
                    :multiple="multiple"
                    append-to-body
                    class="c-100"
                    v-model="value"
                    :options="options"
                    :clearable="false"
            />
        </b-form-group>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import {getObjectByRoute} from "../../../../core/projectManager";
    import 'vue-select/dist/vue-select.css';
    const R = require('ramda');

    export default {
        name: 'StringForm',
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

            multiple: {type: Boolean, default: false},

        },
        data() {
            return {
                options: ['column1', 'column2', 'column3', 'column4', 'column5', 'column6']
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
                    this.UPDATE_DATA_OBJECT_PARAMETER({
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
                'UPDATE_DATA_OBJECT_PARAMETER'
            ]),
        },
    };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style src="./ColumnForm.scss" lang="scss"></style>
