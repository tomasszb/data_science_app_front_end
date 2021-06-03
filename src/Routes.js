import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/layout/Layout';
import AnalyticsPage from '@/pages/Dashboard/Dashboard';
import ProjectManager from '@/pages/ProjectManager/ProjectManager';
import NewProject from '@/pages/NewProject/NewProject';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Process from '@/pages/Process/Process'

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
            path: '/new',
            name: 'NewProject',
            component: NewProject,
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
                let expiration = localStorage.getItem('expires');
                if(expiration <= Math.floor(Date.now()/1000)) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('expires');
                }
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
                    path: 'proc/:id',
                    name: 'Process',
                    component: Process
                },

            ],
        },
    ],
});
