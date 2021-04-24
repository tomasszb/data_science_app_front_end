<template>
    <b-form-group
        class="column-list-form"
        :label="name"
        :label-sr-only="!showLabel"
        :label-cols="horizontal ? 3 : 0"
        :horizontal="horizontal"
    >
        <div class="chart-column-container-outer p-3 pb-3 mb-3">
            <div class="chart-column-container ">
                <draggable
                        class="dragArea list-group"
                        v-model="columnList"
                        group="columns"
                        ghost-class="ghost"
                        animation="200"
                >
                    <ColumnButton
                        v-for="column in columnList"
                        :key="'po-column-form-'+column.name"
                        :name="column.name"
                        :type="column.type"
                    />
                </draggable>
            </div>
        </div>

    </b-form-group>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import draggable from "vuedraggable";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {getObjectByRoute} from "../../../../core/projectManager";
    import ColumnButton from "@/components/widgets/PageColumnbar/ColumnButton/ColumnButton";
    const R = require('ramda');

    export default {
        name: 'ColumnListForm',
        components: {
            vSelect, draggable, ColumnButton
        },
        props: {
            objectID: {type: String, default: null},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false},
            showLabel: {type: Boolean, default: true},
            parameterIndex: {type: [Number, String]},
            route: {type: Array, default: function() {return []}},
        },
        data() {
            return {
                columnList:[]
            }
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects'
            ]),
            parentParameters() {
                return this.dataObjects[this.objectID]['parameters']
            },
            // columnList: {
            //     get() {
            //         return getObjectByRoute(this.route, this.parentParameters)[this.parameterIndex]
            //     },
            //     set(newValue) {
            //         this.SET_DO_PARAMETER({
            //             id: parseInt(this.objectID),
            //             route: this.route.concat(this.parameterIndex),
            //             value: newValue
            //         })
            //     }
            // }
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER'
            ]),
        },
    };
</script>

<style src="./ColumnListForm.scss" lang="scss"></style>
