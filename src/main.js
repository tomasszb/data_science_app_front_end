// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';

import { ClientTable, ServerTable } from 'vue-tables-2';
import VueTextareaAutosize from 'vue-textarea-autosize';
import mavonEditor from 'mavon-editor';
import { VueMaskDirective } from 'v-mask';
import VeeValidate from 'vee-validate';
import VueFormWizard from 'vue-form-wizard';
import axios from 'axios';
import Toasted from 'vue-toasted';
import VueApexCharts from 'vue-apexcharts';
import CKEditor from '@ckeditor/ckeditor5-vue';
import bFormSlider from 'vue-bootstrap-slider';
import { component as VueCodeHighlight } from 'vue-code-highlight';
import store from './store';
import router from './Routes';
import App from './App';
import { AuthMixin } from './mixins/auth';
import config from './config';
import Widget from './components/layout/Widget/Widget';
import VueColumnsResizable from 'vue-columns-resizable';

import webSocketService from './core/webSocketService'

import VueNumericInput from 'vue-numeric-input';
import FontPicker from 'font-picker-vue';



axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common['Content-Type'] = "application/json";
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = "JWT " + token;
}

Vue.use(BootstrapVue, {
    BTooltip: {
        delay: {
            show: 200,
            hide: 100,
        },
    },
    BPopover: {
        delay: 1000,
    },
});
Vue.use(VueTouch);
Vue.use(Trend);
Vue.component('vue-code-highlight', VueCodeHighlight);
Vue.component('Widget', Widget);
Vue.use(bFormSlider);
Vue.use(ClientTable, { theme: 'bootstrap4' });
Vue.use(ServerTable, { theme: 'bootstrap4' });
Vue.use(VueTextareaAutosize);
Vue.use(CKEditor);
Vue.use(mavonEditor);
Vue.component('apexchart', VueApexCharts);
Vue.directive('mask', VueMaskDirective);
Vue.use(VeeValidate, { fieldsBagName: 'fieldsbag' });
Vue.use(VueFormWizard);
Vue.mixin(AuthMixin);
Vue.use(Toasted, {duration: 10000});
Vue.use(VueColumnsResizable);
Vue.use(VueNumericInput);
Vue.use(FontPicker);

Vue.use(webSocketService, store);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
