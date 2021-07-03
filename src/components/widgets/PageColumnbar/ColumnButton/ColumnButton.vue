<template>
    <div
        :class="{
            'column-selector': true,
            'bg-success': agrFunction!==null && parent!==null,
            'bg-primary': agrFunction===null && parent!==null
        }"
    >
        <div class="d-inline-flex c-100 align-items-center">
            <div class="column-selector-type">
                <span v-if="agrFunction!==null" class="m-0 font-weight-bolder">{{agrFunction.toUpperCase()}}</span>
                <span v-if="agrFunction===null" class="m-0">{{type}}</span>
            </div>
            <div class="c-100 d-inline-flex align-items-center">
                <div class="column-selector-text">
                    {{name}}
                </div>
                <i v-if="parent!==null" @click="emitEvent('remove')" class="la la-remove"/>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: 'ColumnButton',
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
        }
    };
</script>

<style src="./ColumnButton.scss" lang="scss"></style>

