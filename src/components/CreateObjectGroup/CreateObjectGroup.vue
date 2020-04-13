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
                <b-tab v-for="(fields, objGroup) in objDefs"
                       :title="objGroup"
                       :key="objGroup"
                       :active="objGroup == selGroup">
                    <CreateObjectForm
                            class="new-object-form"
                            :fields="fields"
                            :objGroup="objGroup"
                            :fieldChoices="fieldChoices"
                    />
                </b-tab>
            </b-tabs>
            <CreateObjectForm
                    v-else
                    class="existing-object-form"
                    :fields="objDefs[filterGroup]"
                    :objGroup="filterGroup"
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
            objDefs: { type: Object, default: {}},
            filterGroup: { type: String, default: '' },
            showGroups: { type: Boolean, default: true}
        },
        computed: {
            fieldChoices() {
                let choices = {};
                let objDefs = this.objDefs;
                Object.keys(objDefs).forEach(function (obj_type) {
                    choices[obj_type] = {};
                    objDefs[obj_type].forEach(function (field) {
                        choices[obj_type][field.column] = [];
                        field.choices.forEach(function (choice) {
                            choices[obj_type][field.column] = choices[obj_type][field.column].concat(choice.name)
                        });
                    });
                });
                return choices
            },
        }
    }
</script>

<style src="./CreateObjectGroup.scss" lang="scss" scoped />