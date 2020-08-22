import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/AppFeatures/Layout/Layout';
import AnalyticsPage from '@/pages/Dashboard/Dashboard';
import ProjectManager from '@/pages/ProjectManager/ProjectManager';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import DataConnectionProcess from '@/pages/DataConnectionProcess/DataConnectionProcess';
import DataPreparationProcess from '@/pages/DataPreparationProcess/DataPreparationProcess';
import Process from '@/components/ProjectObjects/Process/Process'

import { isAuthenticated } from './mixins/auth';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', redirect: '/app/main'},
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
        },
        {
            path: '/projects',
            name: 'ProjectManager',
            component: ProjectManager,
            beforeEnter: (to, from, next) => {
                let token = localStorage.getItem('token');
                isAuthenticated(token) ? next() : next({path: '/login'});
            },
        },
        {
            path: '/app',
            name: 'Layout',
            component: Layout,
            beforeEnter: (to, from, next) => {
                let token = localStorage.getItem('token');
                isAuthenticated(token) ? next() : next({path: '/login'});
            },
            children: [
                // main pages
                {
                    path: 'main',
                    name: 'AnalyticsPage',
                    component: AnalyticsPage,
                },
                {
                    path: 'conn/:id',
                    name: 'DataConnectionProcess',
                    component: DataConnectionProcess
                },
                {
                    path: 'prep/:id',
                    name: 'DataPreparationProcess',
                    component: DataPreparationProcess
                },
                {
                    path: 'proc/:id',
                    name: 'Process',
                    component: Process
                },

            ],
        },
    ],
});
