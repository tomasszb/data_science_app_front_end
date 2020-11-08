<template>
    <div class="prep-settings flex-vertical-no-scroll">
        <b-form-group
                label="Join Type"
                label-for="join-select"
        >
            <v-select
                    id="join-select"
                    v-model="joinType"
                    :options="['Left Join', 'Right Join', 'Outer Join', 'Inner Join']"
                    :clearable="false"
            />
        </b-form-group>
        <br>
        <div class="setting-row mb-2">
            <div class="flex-horizontal-no-scroll">
                <div class="flex-grow-1 mr-3">
                    <h6>Left Columns</h6>
                </div>
                <div class="flex-grow-1 ml-3">
                    <h6>Right Columns</h6>
                </div>
            </div>
        </div>
        <div class="flex-vertical">
            <div class="setting-row" v-for="i in 20" :key="i">
                <div class="flex-horizontal">
                    <div class="flex-grow-1 mr-2">
                        <b-form-group >
                            <v-select
                                    v-model="leftColumn"
                                    :options="['Column1', 'Column2', 'Column3', 'Column4']"
                                    :clearable="false"
                            />
                        </b-form-group>
                    </div>
                    <div class="flex-grow-1 ml-2">
                        <b-form-group>
                            <v-select
                                    v-model="rightColumn"
                                    :options="['Column1', 'Column2', 'Column3', 'Column4']"
                                    :clearable="false"
                            />
                        </b-form-group>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    const R = require('ramda');

    export default {
        name: 'PrepSettings',
        components: {
            vSelect
        },
        props: {
            objectID: { type: String, default: null },
        },
        data() {
            return {
                joinType: "Left Join",
                leftColumn: "",
                rightColumn: ""
            }
        }
    };
</script>

<style src="./PrepSettings.scss" lang="scss"></style>
