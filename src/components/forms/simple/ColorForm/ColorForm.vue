<template>
    <b-form-group
            :label="name"
            :label-sr-only="!showLabel"
            label-class="pb-1"
            :label-cols="horizontal ? 5 : 0"
            :horizontal="horizontal"
    >
        <div :style="{'background-color': color}" class="mr-2 border">
            <b-dropdown
                no-caret
                variant="link"
                toggle-class="text-decoration-none p-0"
                block
                ref="dropdown"

            >
                <template slot="button-content" >
                    <div class="color-form d-flex align-items-center text-light" >
                        <span v-if="color==null" >
                            --auto--
                        </span>
                    </div>
                </template>
                <b-dropdown-form class="custom-ui-class p-0">
                    <v-swatches
                        inline
                        popover-x="left"
                        :swatch-style="swatchStyle"
                        :wrapper-style="wrapperStyle"
                        v-model="color"
                    />
                </b-dropdown-form>
            </b-dropdown>
        </div>


    </b-form-group>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
import VSwatches from 'vue-swatches'
    const R = require('ramda');
    import Vue from 'vue'

    export default {
        name: 'ColorForm',
        components: {
            vSelect, VSwatches
        },
        props: {
            objectID: {type: [Number, String], default: null},
            name: {type: String, default: ''},
            defaultValue: {},
            horizontal: {type: Boolean, default: false},
            showLabel: {type: Boolean, default: true},
            parameterIndex: {type: [Number, String]},
            route: {
                type: Array, default: function () {
                    return []
                }
            },
        },
        data() {
            return {
                color: null,
                // swatches: [
                //     { color: '#F493A7', showBorder: true, swatchStyle: {float: left} },
                //     { color: '#F891A6', disabled: true, swatchStyle: {float: left} }
                // ],
                swatches: [
                    { color: '#111'}, { color:'#F891A6'}
                ],
                swatchStyle: {
                    'float': 'left',
                    'width':'25px',
                    'height':'20px',
                    'margin': '1px',
                    'border-radius': '2px'
                },
                wrapperStyle: {
                    'margin-left': '5px',
                    'margin-top': '5px'
                }
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
                    return this.parentParameters.getPath(this.route.join('.')+'.'+this.parameterIndex, null)
                },
                set(newValue) {
                    this.$emit('value-changed', newValue);
                }
            }
        },
        methods: {
            openDropdown() {
                this.$refs.dropdown.show()
            },
            closeDropdown() {
                this.$refs.dropdown.hide()
            }
        }
    }
</script>

<style src="./ColorForm.scss" lang="scss"></style>
<style scoped>
.custom-ui-class {
    width: 200px;
    padding: 0;
    margin: 0;
    height: 100%;
}
.vue-swatches__swatch {
    float: left!important;
}
.b-dropdown-form {
    padding: 0!important;
}
</style>