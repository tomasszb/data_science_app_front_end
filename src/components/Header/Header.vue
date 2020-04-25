<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <b-navbar class="app-header d-print-none" :class="[navbarTypeClass, 'header-' + navbarColorScheme]">
        <b-nav>
            <b-nav-item id="v-step-0">
                <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod">
                    <i class='la la-bars fa-lg' />
                </a>
                <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
                    <i class="la la-bars fa-lg" />
                </a>
            </b-nav-item>
            <b-nav-item class="d-md-down-none">
                <a href="#" class="px-2">
                    <i class="la la-mail-reply fa-lg"/>
                </a>
            </b-nav-item>
            <b-nav-item class="d-md-down-none">
                <a href="#" class="px-2">
                    <i class="la la-mail-forward fa-lg" />
                </a>
            </b-nav-item>
        </b-nav>
        <a  class="navbarBrand d-md-none">
            <i class="la la-circle text-primary mr-n-sm" />
            <i class="la la-circle text-danger" />
            &nbsp;
            sing
            &nbsp;
            <i class="la la-circle text-danger mr-n-sm" />
            <i class="la la-circle text-primary" />
        </a>
        <b-nav class="ml-auto">
            <b-nav-item-dropdown id="v-step-2" class="settingsDropdown d-sm-down-none" no-caret right>
                <template slot="button-content">
                    <span class="la la-user la-lg" />
                    <span class="small">{{ user }}</span>
                    <span class="glyphicon glyphicon-chevron-down px-2" />
                </template>
                <b-dropdown-item><i class="la la-user" /> My Account</b-dropdown-item>
                <b-dropdown-item-button @click="logoutUser">
                    <i class="la la-sign-out" /> Log Out
                </b-dropdown-item-button>
            </b-nav-item-dropdown>
        </b-nav>
    </b-navbar>

</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import avatarImage from '@/assets/people/a5.jpg';

    export default {
        name: 'Header',
        data() {
            return {
                avatarImage,
                user: localStorage.getItem('user')
            }
        },
        computed: {
            ...mapState('layout', [
                'sidebarClose',
                'sidebarStatic',
                'navbarType',
                'navbarColorScheme'
            ]),
            navbarTypeClass: function () {
                return "navbar-" + this.navbarType + "-type"
            }
        },
        methods: {
            ...mapActions('layout', [
                'toggleSidebar',
                'switchSidebar',
                'changeSidebarActive',
            ]),
            ...mapActions('auth', ['logoutUser']),
            ...mapActions('api', ['loadObjects', 'loadObjectDefinitions']),
            switchSidebarMethod() {
                if (!this.sidebarClose) {
                    this.switchSidebar(true);
                    this.changeSidebarActive(null);
                } else {
                    this.switchSidebar(false);
                    const paths = this.$route.fullPath.split('/');
                    paths.pop();
                    this.changeSidebarActive(paths.join('/'));
                }
            },
            toggleSidebarMethod() {
                if (this.sidebarStatic) {
                    this.toggleSidebar();
                    this.changeSidebarActive(null);
                } else {
                    this.toggleSidebar();
                    const paths = this.$route.fullPath.split('/');
                    paths.pop();
                    this.changeSidebarActive(paths.join('/'));
                }
            },
        },
        created() {
            this.loadObjects();
            this.loadObjectDefinitions();
            //window.console.log(this.$store.state.api.dataObjectDefinitions);
        }
    };
</script>

<style src="./Header.scss" lang="scss"></style>
