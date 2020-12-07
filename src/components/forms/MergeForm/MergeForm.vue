<template>
    <div class="flex-vertical-no-scroll">
        <b-form-group
                label="Merge Type"
                label-for="join-select"
        >
            <v-select
                    id="join-select"
                    append-to-body
                    v-model="joinType"
                    :options="joinTypes"
                    :clearable="false"
            />
        </b-form-group>
        <br>
        <div class="setting-row merge-setting-header">
            <div class="flex-horizontal-no-scroll">
                <div class="flex-grow-1 c-45 px-1 align-items-center">
                    <h6>Left Column</h6>
                </div>
                <div class="flex-grow-1 c-45 px-1 align-items-center">
                    <h6>Right Column</h6>
                </div>
                <div class="c-10 px-1 align-items-center">
                    <i class="fa fa-plus pl-2 text-warning" @click="addJoin"/>
                </div>
            </div>
        </div>
        <div class="merge-setting-columns-container flex-vertical-no-scroll">
            <div class="flex-vertical">
                <div v-for="(join, i) in joinRows" :key="i">
                    <div class="flex-horizontal merge-setting-row align-items-center">
                        <div class="c-45 px-1 ">
                            <b-form-group>
                                <v-select
                                        v-model="join['leftColumn']"
                                        append-to-body
                                        :options="leftColumns"
                                        :clearable="false"
                                />
                            </b-form-group>
                        </div>
                        <div class="c-45 px-1 align-items-center">
                            <b-form-group>
                                <v-select
                                        v-model="join['rightColumn']"
                                        append-to-body
                                        :options="rightColumns"
                                        :clearable="false"
                                />
                            </b-form-group>
                        </div>
                        <div class="c-10 px-1">
                            <i class="la la-remove pl-2" @click="deleteJoin(i)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    const R = require('ramda');

    export default {
        name: 'PrepSettings',
        components: {
            vSelect
        },
        props: {
            dataObjectID: { type: String, default: null },
        },
        data() {
            return {
                joinType: 'Left Join',

                joinTypes: ['Left Join', 'Right Join', 'Outer Join', 'Inner Join', 'Union'],
                leftColumns: ['Column1', 'Column2', 'Column3', 'Column4'],
                rightColumns: ['Column1', 'Column2', 'Column3', 'Column4'],

                joinRows: [
                    { leftColumn: '', rightColumn: ''}
                ],

                placement: 'bottom'
            }
        },
        methods: {
            addJoin() {
                this.joinRows.push({ leftColumn: '', rightColumn: ''})
            },
            deleteJoin(index) {
                if (this.joinRows.length > 1) {
                    this.joinRows.splice(index, 1)
                }
            }
        },
    };
</script>

<style src="./MergeForm.scss" lang="scss"></style>
