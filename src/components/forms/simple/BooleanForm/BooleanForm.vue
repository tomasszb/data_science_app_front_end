<template>
    <b-form-group class="boolean-form abc-checkbox pr-2 mt-2">
        <input
                type="checkbox"
                id="checkbox-default"
                v-model="value"
        />
        <label for="checkbox-default">{{name}}</label>
    </b-form-group>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');

    export default {
        name: 'NumericForm',
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

<style src="./BooleanForm.scss" lang="scss"></style>
