  
import Vue from 'vue'
import vuetify from './plugin'
import router from './router'
import './vee-validate'

import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2'; 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import { config } from './config'
 
Vue.use(VueRouter);
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);

Vue.prototype.appConfig = config
 
const app = new Vue({
    router,
    vuetify,
    el: '#app',
    render: h => h(App)
  })
