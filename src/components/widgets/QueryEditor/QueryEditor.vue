<template>
    <div class="query-editor flex-vertical-no-scroll">
        <form-container
            v-for="p in requiredParameters"
            :key="'form-'+p.name+'-'+dataObjectID"
            v-if="p.dtype.type==='query'"
            :typeSettings="p.dtype"
            :name="p.name"
            :horizontal="false"
            :parameter-index="p.name"
            :objectID="dataObjectID"
            :showLabel="false"
            class="flex-vertical-no-scroll"
        />
    </div>
</template>

<script>
    import { mapGetters} from "vuex";
    const R = require('ramda');
    import FormContainer from "@/components/forms/container/FormContainer/FormContainer";

    export default {
        name: 'QueryEditor',
        components: {
            FormContainer
        },
        props: {
            objectID: { type: String, default: '' },
            providedDataObjectID: {type: String, default: '' },
            tag: { type: String, default: 'connector' },
        },
        computed: {
            ...mapGetters('proj', [
                'dataObjects', 'dataObjectParameterMapping', 'projectObjects'
            ]),
            dataObjectID() {
                if (this.providedDataObjectID!=='') {
                    return this.providedDataObjectID
                }
                else {
                    return this.projectObjects[this.objectID]['data_object_tags'][this.tag].toString()
                }
            },
            dataObjectSettings() {
                return this.dataObjects[this.dataObjectID]
            },
            dataObjectParameters() {
                return this.dataObjectSettings['parameters']
            },
            requiredParameters() {
                return this.dataObjectSettings['type']!==null ? this.dataObjectParameterMapping[this.dataObjectSettings['type']]["run_query"]: []
            },
        }
    };
</script>

<style src="./QueryEditor.scss" lang="scss"></style>