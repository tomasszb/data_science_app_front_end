<template>
    <div>
        <div v-for="(p, i) in localParameters" class="flex-horizontal-no-scroll pb-2">
            <div class="c-90">
                <form-container
                        :typeSettings="typeSettings"
                        :name="name"
                        :horizontal="horizontal"
                        :parameterIndex="i"
                        :route="route.concat([parameterIndex])"
                        :objectID="objectID"
                        :showLabel="i===0"
                />
            </div>
            <div class="c-10 px-1">
                <i v-if="i===0" class="fa fa-plus pl-2 text-warning col-form-label" @click="addListElement"/>
                <i class="la la-remove pl-2 align-items-center" @click="deleteListElement(i)"/>
            </div>
        </div>
    </div>
</template>

<script>
    import FormContainer from "../FormContainer/FormContainer";
    import {mapGetters, mapMutations} from "vuex";
    import {getObjectByRoute} from "../../../../core/projectManager";
    const R = require('ramda');

    export default {
        name: "FormListContainer",
        components: {
            FormContainer
        },
        props: {
            typeSettings: {type: Object, default: function() {return {}} },
            objectID: { type: String, default: null },
            route: {type: Array, default: function() {return []}},
            parameterIndex: {type: [Number, String]},
            name: {type: String, default: ''},
            horizontal: {type: Boolean, default: false}
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects'
            ]),
            parentParameters() {
                return this.dataObjects[this.objectID]['parameters']
            },
            localParameters() {
                return getObjectByRoute(this.route, this.parentParameters)[this.parameterIndex]
            }
        },
        methods: {
            ...mapMutations('proj', [
                'SET_DO_PARAMETER'
            ]),
            addListElement() {
                let localParameters = R.clone(this.localParameters);
                localParameters.push(null);
                this.SET_DO_PARAMETER({
                    id: parseInt(this.objectID),
                    route: this.route.concat(this.parameterIndex),
                    value: localParameters
                })
            },
            deleteListElement(i) {
                let localParameters = R.clone(this.localParameters);
                if (localParameters.length>1) {
                    localParameters.splice(i, 1);
                    this.SET_DO_PARAMETER({
                        id: parseInt(this.objectID),
                        route: this.route.concat(this.parameterIndex),
                        value: localParameters
                    })
                }
            }
        },
        created() {
            if (typeof this.localParameters === 'undefined' || this.localParameters === null) {
                this.SET_DO_PARAMETER({
                    id: parseInt(this.objectID),
                    route: this.route.join('.'),
                    value: []
                });
            }
            if (this.localParameters.length === 0) {
                // console.log('here');
                this.addListElement()
            }
        }
    }
</script>

<style src="./FormListContainer.scss" lang="scss"></style>
