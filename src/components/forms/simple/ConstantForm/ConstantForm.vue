<template>
    <div class="string-form pr-2">
        {{value}}
        {{this.route.concat(this.parameterIndex)}}
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');
    import Vue from 'vue';

    export default {
        name: 'StringForm',
        components: {
            vSelect
        },
        props: {
            objectID: {type: String, default: null},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false},
            showLabel: {type: Boolean, default: true},
            parameterIndex: {type: [Number, String]},
            route: {type: Array, default: function() {return []}},
            defaultValue: {},
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
                // // console.log('parentParameters', this.objectID, this.dataObjects[this.objectID]);
                // // console.log(this.dataObjects, this.objectID)
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
            ])
        },
        mounted() {
            if (typeof this.value==='undefined') {
                console.log('constant', this.defaultValue)
                Vue.set(this, 'value', this.defaultValue);
            }
        }

    };
</script>

<style src="./ConstantForm.scss" lang="scss"></style>
