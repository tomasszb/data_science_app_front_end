<template>
    <b-form>
        <fieldset v-for="field in fields">
            <b-form-group
                    v-if="field.column!=='id'"
                    horizontal
                    :label="field.column"
                    :label-cols="3"
                    label-breakpoint="md"
                    :label-for="'form-control-'+objGroup.toLowerCase()+field.column">
                <input
                        v-if="field.choices.length==0"
                        v-validate="'required'"
                        :name="field.column"
                        :class="{ 'form-control': true, 'is-invalid': errors.has(field.column)}"
                        :type="field.column!=='password' ? 'text' : 'password'"
                        :id="'form-control-'+objGroup.toLowerCase()+field.column"
                        v-model="newDataObject[field.column]"/>

                <v-select
                        v-if="field.choices.length>0"
                        :id="'form-control-'+objGroup.toLowerCase()+field.column"
                        :options="fieldChoices[objGroup][field.column]"
                        v-model="newDataObject[field.column]"/>
                <span class="text-danger" v-if="errors.has(field.column)">
                    {{ errors.first(field.column) }}
                </span>
            </b-form-group>
        </fieldset>
        <div class="form-action">
            <b-button type="button" variant="success" class="btn-rounded float-right" @click="submitDataObject()">
                Validate & Submit
            </b-button>
            <b-button type="button" variant="default" class="btn-rounded" @click="closeModal()">
                Cancel
            </b-button>
        </div>
    </b-form>
</template>

<script>
    import vSelect from 'vue-select';

    export default {
        name: "NewObjectGroup",
        components: { vSelect },
        props: {
            objGroup: { type: String, default: '' },
            fields: { type: Array, default: null},
            currentDataObject: {type: Object, default: function () { return {} }},
            fieldChoices: { type: Object, default: function () { return {} } },
        },
        data() {
            return {
                newDataObject: {}
            }
        },
        methods: {
            closeModal() {
                this.$emit('close-modal');
            },
            submitDataObject() {
                this.$emit('submit-data-object', this.newDataObject);
                this.closeModal();
            }
        },
        created() {
            this.newDataObject = JSON.parse(JSON.stringify(this.currentDataObject))
        }
    }
</script>

<style src="CreateObjectForm.scss" lang="scss" scoped />