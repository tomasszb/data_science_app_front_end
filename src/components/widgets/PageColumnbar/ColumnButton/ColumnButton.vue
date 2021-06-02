<template>
    <div class="column-selector">
        <div class="d-inline-flex c-100 align-items-center">
            <div class="column-selector-type">
                <span class="m-0">{{type}}</span>
            </div>
            <div class="c-100">
                <div class="column-selector-text">
                    <strong v-if="agrFunction!==null" class="column-selector-text">
                        {{agrFunction}}(
                    </strong>
                    {{name}}
                    <strong v-if="agrFunction!==null" class="column-selector-text">
                        )
                    </strong>
                </div>
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
        }
    };
</script>

<style src="./ColumnButton.scss" lang="scss"></style>

