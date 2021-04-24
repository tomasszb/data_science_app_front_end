<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <b-navbar class="toolbox-dashboard d-print-none px-0 justify-content-end">

        <b-nav>
            <b-nav-item id="v-step-0" class="align-items-center d-flex" >
                <a class="d-md-down-none p-0  " href="#" @click="">
                    <i class='fa fa-plus ' />
                </a>
            </b-nav-item>
            <BooleanIconForm
                :objectID="dataObjectID"
                parameterIndex="edit"
                iconClassName="fa fa-edit"
                :horizontal="false"
                :route="[]"
                :showLabel="false"
            />
            <BooleanIconForm
                :objectID="dataObjectID"
                parameterIndex="vertical_align"
                iconClassName="fa fa-puzzle-piece"
                :horizontal="false"
                :route="[]"
                :showLabel="false"
            />
            <div class="ml-5 mr-2 align-items-center d-flex">
                w / h:
            </div>
            <b-nav-item class="d-md-down-none align-items-center d-flex ">
                <a href="#" class="p-0">
                    <form-container
                        :route="[]"
                        parameterIndex="width"
                        :horizontal="false"
                        :typeSettings="{type: 'integer', default: 800}"
                        :objectID="dataObjectID"
                        :showLabel="false"
                    />
                </a>
            </b-nav-item>
            <b-nav-item class="d-md-down-none align-items-center d-flex ">
                <a href="#" class="p-0">
                    <form-container
                        :route="[]"
                        parameterIndex="height"
                        :horizontal="false"
                        :typeSettings="{type: 'integer', default: 800}"
                        :objectID="dataObjectID"
                        :showLabel="false"
                    />
                </a>
            </b-nav-item>
        </b-nav>
    </b-navbar>

</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex';
import {getObjectSettings, getObjectSetting} from "../../../core/projectObjectParser";
import FormContainer from "@/components/forms/container/FormContainer/FormContainer";
import BooleanIconForm from "@/components/forms/simple/BooleanIconForm/BooleanIconForm";

    export default {
        name: 'ToolboxDashboard',
        components: {
            FormContainer, BooleanIconForm
        },
        data() {
            return {
                user: localStorage.getItem('user')
            }
        },
        computed: {
            ...mapGetters('proj', ['activePage', 'projectObjects', 'dataObjects']),
            dataObjectID() {
                let dataObjectTags =  getObjectSetting(this.projectObjects, this.activePage, 'data_object_tags',{});
                return dataObjectTags["dashboard"].toString()
            },
        },
        methods: {
        },

    };
</script>

<style src="./ToolboxDashboard.scss" lang="scss"></style>
