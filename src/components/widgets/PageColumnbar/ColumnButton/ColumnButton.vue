<template>
    <div
        :class="{
            'column-selector': true,
            'bg-success': agrFunction!==null && parent!==null,
            'bg-primary': agrFunction===null && parent!==null
        }"
    >
                <div class="d-inline-flex c-100 align-items-center ">
                    <div class="column-selector-type">
                        <span v-if="agrFunction!==null" class="m-0 font-weight-bolder">{{agrFunction.toUpperCase()}}</span>
                        <span v-if="agrFunction===null" class="m-0">{{type}}</span>
                    </div>
                    <div class="c-100 d-inline-flex align-items-center">
                        <div class="column-selector-text" @click="closeDropdown()">
                            {{name}}
                        </div>
                        <b-dropdown
                            no-caret
                            block
                            ref="dropdown"
                            class="position-absolute"
                        >

                            <b-dropdown-form class="">
                                <b-form-group label="Email" label-for="dropdown-form-email" @submit.stop.prevent>
                                    <b-form-input
                                        size="sm"
                                        placeholder="email@example.com"
                                    ></b-form-input>
                                </b-form-group>

                                <b-form-group label="Password" label-for="dropdown-form-password">
                                    <b-form-input
                                        type="password"
                                        size="sm"
                                        placeholder="Password"
                                    ></b-form-input>
                                </b-form-group>

                                <b-form-checkbox class="mb-3">Remember me</b-form-checkbox>
                                <b-button variant="primary" size="sm" @click="">Sign In</b-button>
                            </b-dropdown-form>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button>New around here? Sign up</b-dropdown-item-button>
                            <b-dropdown-item-button>Forgot Password?</b-dropdown-item-button>
                        </b-dropdown>
                        <i v-if="parent!==null" @click="emitEvent('remove')" class="la la-remove"/>
                    </div>

                </div>


    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    export default {
        name: 'ColumnButton',
        components: {
            vSelect
        },
        data() {
          return {
              value: '',
              options: [{'label': 1}, {'label':2}]
          }
        },
        props: {
            name: { type: String, default: null },
            parent: { type: String, default: null },
            agrFunction: {type: String, default: null},
            type: { type: String, default: null },
        },
        directives: {
            focus: {
                inserted (el) {
                    el.focus()
                }
            }
        },
        computed: {
            ...mapGetters('proj', [
                'projectObjects'
            ]),
            status() {
                return 'no-data'
            }
        },
        methods: {
            ...mapActions('proj/object_manager', [
                'setActivePO', 'deletePO'
            ]),
            emitEvent(eventName) {
                this.$emit(eventName)
            },
            closeDropdown() {
                console.log('hello', this.$refs.dropdown)
                this.$refs.dropdown.show()
            }
        }
    };
</script>

<style src="./ColumnButton.scss" lang="scss"></style>

