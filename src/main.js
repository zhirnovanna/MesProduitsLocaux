import { createApp } from 'vue'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

require('@/store/subscriber')

axios.defaults.baseURL = "https://api-mesproduitslocaux.herokuapp.com/api"
store.dispatch('auth/attempt', localStorage.getItem('token'))
//.then(() => {

createApp(App).use(store).use(router).mount('#app')
