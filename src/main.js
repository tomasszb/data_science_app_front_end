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
import VueFormulate from '@braid/vue-formulate'
const R = require('ramda');

Object.defineProperty(String.prototype, 'hashCode', {
    value: function() {
        var hash = 0, i, chr;
        for (i = 0; i < this.length; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
});

Object.defineProperty(Object.prototype, 'getPath', {
    value: function(path, defaultValue = undefined) {
        const travel = regexp =>
            String.prototype.split
                .call(path, regexp)
                .filter(Boolean)
                .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), this);
        const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
        return result === undefined || result === this ? defaultValue : result;
    }
});

Object.defineProperty(Object.prototype, 'setPath', {
    value: function(path, value) {
        let newObj = R.clone(this);
        if (Object(newObj) !== newObj) return undefined;
        if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
        path.slice(0,-1).reduce((a, c, i) =>
                Object(a[c]) === a[c]
                    ? a[c]
                    : a[c] = Math.abs(path[i+1])>>0 === +path[i+1]
                    ? []
                    : {},
            newObj)[path[path.length-1]] = value;
        return newObj;
    }
});

Vue.mixin({
    methods: {
        getSet(providedValue, defaultValue) {
            if (providedValue===null) {
                return defaultValue
            }
            else if (typeof providedValue==='undefined') {
                return defaultValue
            }
            return providedValue;
        }
    }
})

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
Vue.use(VueFormulate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
