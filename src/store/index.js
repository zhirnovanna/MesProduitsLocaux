import { createStore } from 'vuex'
import auth from './auth'
import {mutations} from './mutations';
import {actions} from './actions';
import crud from './modules/crud'
import cart from './modules/cart'

// API root endpoint
export const ENDPOINT = 'https://api-mesproduitslocaux.herokuapp.com/api/';
//export const ENDPOINT = 'http://127.0.0.1:8000/api/';

export default createStore({
  state: {
    loading: true,
    products: [],
    product: {},
    lengthMatchedProducts: 0,
    categories: [],
    category: {},
    lengthCategories: 0,
    regions: [],
    region: {},
    lengthRegions: 0
  },

  getters: {
  },

  mutations,

  actions,

  modules: {
    auth,
    crud,
    cart
  }
})
