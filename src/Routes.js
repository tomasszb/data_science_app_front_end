import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import AnalyticsPage from '@/pages/Dashboard/Dashboard';
import ProjectManager from '@/pages/ProjectManager/ProjectManager';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import DataConnectionProcess from '@/pages/DataConnectionProcess/DataConnectionProcess';
import DataPreparationProcess from '@/pages/DataPreparationProcess/DataPreparationProcess';

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
                    path: 'conn',
                    name: 'DataConnectionProcess',
                    component: DataConnectionProcess
                },
                {
                    path: 'prep',
                    name: 'DataPreparationProcess',
                    component: DataPreparationProcess
                },

            ],
        },
    ],
});
