<template>
    <div :class="{'new-object-modal': showGroups, 'existing-object-modal': !showGroups}">
        <b-modal
                :id="id"
                :title="title"
                size="lg"
                body-class="bg-white"
                hide-footer>
            <b-tabs
                    v-if="showGroups"
                    class="mb-lg"
                    pills
                    card
                    vertical
                    start>
                <b-tab v-for="objGroup in objDefs"
                       :title="objGroup.name"
                       :key="objGroup.name"
                       :active="objGroup.name == selGroup">
                    <CreateObjectForm
                            class="new-object-form"
                            :fields="objGroup.fields"
                            :objGroup="objGroup.name"
                            :fieldChoices="fieldChoices"
                    />
                </b-tab>
            </b-tabs>
            <CreateObjectForm
                    v-else
                    class="existing-object-form"
                    :fields="objDefs[filterGroup].fields"
                    :objGroup="objDefs[filterGroup].name"
                    :fieldChoices="fieldChoices"
            />
        </b-modal>
    </div>
</template>

<script>
    import CreateObjectForm from './CreateObjectForm/CreateObjectForm';

    export default {
        name: "CreateObjectGroup",
        components: { CreateObjectForm },
        props: {
            id: { type: String, default: '' },
            title: { type: String, default: '' },
            selGroup: { type: String, default: '' },
            objDefs: { type: Array, default: []},
            filterGroup: { type: Number, default: 0 },
            showGroups: { type: Boolean, default: true}
        },
        computed: {
            fieldChoices() {
                let choices = {};
                let objDefs = this.objDefs;
                objDefs.forEach(function (obj_type) {
                    choices[obj_type.name] = {};
                    obj_type.fields.forEach(function (field) {
                        choices[obj_type.name][field.column] = [];
                        field.choices.forEach(function (choice) {
                            choices[obj_type.name][field.column] = choices[obj_type.name][field.column].concat(choice.name)
                        });
                    });
                });
                return choices
            },
        }
    }
</script>

<style src="./CreateObjectGroup.scss" lang="scss" scoped />