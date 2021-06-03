<template>
    <div>
        {{columnName}}
        <i
                v-if="columnSortAscending===null"
                class="fa fa-sort pl-2  mb-sm fa-sm"
                @click="changeSort($event)"/>
        <i
                v-if="columnSortAscending===true"
                class="fa fa-sort-up pl-2  mb-sm fa-sm"
                @click="changeSort($event)"/>
        <i
                v-if="columnSortAscending===false"
                class="fa fa-sort-down pl-2  mb-sm fa-sm"
                @click="changeSort($event)"/>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    const R = require('ramda');

    export default {
        name: 'ColumnControl',
        components: {
            vSelect
        },
        props: {
            sortID: {type: String, default: null},
            columnName: {type: String, default: null},
            sortRoute: {type: String, default: 'columns'},
        },
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects'
            ]),
            sortSettings() {
                return this.dataObjects[this.sortID]
            },
            sortParameters() {
                return this.sortSettings['parameters']
            },
            sortValueRoute() {
                let route =  this.sortRoute!== "" ? [this.sortRoute, this.columnName]: [this.columnName];
                return route.join('.')
            },
            columnSortAscending() {
                return this.sortParameters.getPath(this.sortValueRoute+'.ascending', null);
            }
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER', 'UPDATE_DATA_OBJECT'
            ]),
            changeSort(event) {
                if (!event.shiftKey) {
                    this.cleanSortOptions()
                }
                let sortObject = this.dataObjects[this.sortID];
                let sortParameters = sortObject.parameters.getPath(this.sortRoute, sortObject.parameters);

                if (this.columnSortAscending===null) {
                    let value = {'ascending': true, 'order': Object.keys(sortParameters).length};
                    this.SET_DO_PARAMETER({id: this.sortID, route: this.sortValueRoute, value: value});
                }
                else if (this.columnSortAscending) {
                    let value = {'ascending': false, 'order': Object.keys(sortParameters).length};
                    this.SET_DO_PARAMETER({id: this.sortID, route: this.sortValueRoute, value: value});
                }
                else if (!this.columnSortAscending) {
                    let newObject = R.clone(sortObject);
                    let newSortParameters = newObject.parameters.getPath(this.sortRoute, newObject.parameters);
                    delete newSortParameters[this.columnName];
                    newObject['parameters'].setPath(this.sortRoute, newSortParameters);
                    this.UPDATE_DATA_OBJECT({ObjectID: this.sortID, Object: newObject});
                }
                this.$emit('request-table');
            },
            cleanSortOptions() {
                let newObject = R.clone(this.dataObjects[this.sortID]);
                let newSortParameters = newObject.parameters.getPath(this.sortRoute, newObject.parameters);
                for (let column of Object.keys(newSortParameters)) {
                    if (this.columnName!==column) {
                        delete newSortParameters[column];
                    }
                }
                newObject['parameters'].setPath(this.sortRoute, newSortParameters);
                this.UPDATE_DATA_OBJECT({ObjectID: this.sortID, Object: newObject});
            }
        },
    };
</script>

<style src="./ColumnControl.scss" lang="scss"></style>
