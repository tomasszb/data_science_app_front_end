<template>
    <div class="data-object-settings flex-vertical-no-scroll p-3">
        <div class="flex-vertical">
            <div
                    v-for="p in requiredParameters"
                    :key="'form-'+p.name+'-'+dataObjectID"
            >
                <form-container
                        v-show="p.dtype.type !== 'list'"
                        :typeSettings="p.dtype"
                        :name="p.name"
                        :horizontal="horizontal"
                        :parameter-index="p.name"
                        :objectID="dataObjectID"
                        :showTitle="true"
                        class="mb-2"
                />
                <form-list-container
                        v-if="p.dtype.type === 'list'"
                        :objectID="dataObjectID"
                        :typeSettings="p.dtype.variable"
                        :parameter-index="p.name"
                        :name="p.dtype.variable.type"
                        :horizontal="horizontal"
                        class="mb-2"
                />
<!--                <form-dictionary-container-->
<!--                        v-if="p.dtype.type === 'dictionary'"-->
<!--                        :typeSettings="p.dtype"-->
<!--                        :name="p.name"-->
<!--                        :horizontal="horizontal"-->
<!--                        :parameter-index="p.name"-->
<!--                        :dataObjectID="dataObjectID"-->
<!--                        :showTitle="true"-->
<!--                        class="mb-2"-->
<!--                >-->
<!--                    <template v-slot:form-dictionary-selector>-->
<!--                        <slot name="form-dictionary-selector"></slot>-->
<!--                    </template>-->
<!--                </form-dictionary-container>-->

            </div>
        </div>

<!--        <div class="mt-4 merge-columns-add">-->
<!--            <div class="c-40 d-inline-block pr-2">-->
<!--                <b-button variant="gray" block>Reset</b-button>-->
<!--            </div>-->
<!--            <div class="c-60 d-inline-block pl-2">-->
<!--                <b-button variant="warning" block>Save</b-button>-->
<!--            </div>-->
<!--        </div>-->

    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from "vuex";
    import FormContainer from "../../forms/container/FormContainer/FormContainer";
    import FormListContainer from "../../forms/container/FormListContainer/FormListContainer";
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    const R = require('ramda');

    export default {
        name: 'DataObjectSettings',
        components: {
            vSelect, FormContainer, FormListContainer
        },
        props: {
            objectID: { type: String, default: '' },
            tag: { type: String, default: 'action' },
            horizontal: {type: Boolean, default: false},

        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects', 'dataObjectParameterMapping', 'projectObjects'
            ]),
            dataObjectID() {
                console.log(this.projectObjects[this.objectID]['data_object_tags'], this.tag, this.projectObjects[this.objectID]['data_object_tags'][this.tag].toString())
                return this.projectObjects[this.objectID]['data_object_tags'][this.tag].toString()
            },
            dataObjectSettings() {
                return this.dataObjects[this.dataObjectID]
            },
            dataObjectParameters() {
                return this.dataObjectSettings['parameters']
            },
            requiredParameters() {
                return this.dataObjectSettings['type']!==null ? this.dataObjectParameterMapping[this.dataObjectSettings['type']]: []
            },
        }
    };
</script>

<style src="./DataObjectSettings.scss" lang="scss"></style>
