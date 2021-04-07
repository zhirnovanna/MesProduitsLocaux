import { createApp } from 'vue'
//import {createAuth} from '@websanova/vue-auth';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/alertify.min.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import * as Vue from 'vue'
// import VueAxios from 'vue-axios'

require('@/store/subscriber')


axios.defaults.baseURL = "https://api-mesproduitslocaux.herokuapp.com/api"
//axios.defaults.baseURL = "http://127.0.0.1:8000/api"
store.dispatch('auth/attempt', localStorage.getItem('token'))
//.then(() => {

createApp(App).use(store).use(router).mount('#app')

// // Set Vue globally
// window.Vue = Vue
// //console.log(Vue);
// const app = Vue.createApp()
// app.use(VueAxios, axios)
// //axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`
// //app.use(VueAuth, auth)

// // Set Vue authentication
// // Vue.use(VueAxios, axios)
// // 
