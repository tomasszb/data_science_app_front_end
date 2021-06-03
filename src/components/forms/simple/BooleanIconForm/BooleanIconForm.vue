<template>
    <b-nav-item id="v-step-0" class="align-items-center d-flex" :class="[value ? '' : 'inactive']">
        <a class="d-md-down-none p-0" href="#" @click="value=!value">
            <i :class="iconClassName" />
        </a>
    </b-nav-item>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');
    import Vue from 'vue'

    export default {
        name: 'BooleanIconForm',
        components: {
            vSelect
        },
        props: {
            objectID: {type: String, default: null},
            iconClassName: {type: String, default: null},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false},
            showLabel: {type: Boolean, default: true},
            parameterIndex: {type: [Number, String]},
            route: {type: Array, default: function() {return []}},
            defaultValue: {}
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
                        id: this.objectID,
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
        },
        mounted() {

            Vue.set(this, 'value', typeof this.value!=='undefined' ? this.value : this.defaultValue);
        },
    };
</script>

<style src="./BooleanIconForm.scss" lang="scss"></style>
