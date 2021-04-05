import { createStore } from 'vuex'

// API root endpoint
const ENDPOINT = 'http://127.0.0.1:8000/api/';

export default createStore({
  state: {
    products: [],
    product: {}
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },

    SET_PRODUCT(state, product) {
      state.product = product;
    },
  },
  actions: {
    async getAllProducts ({ commit }) {
      // get all products
      let response = await fetch(ENDPOINT + 'products');

      if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          console.log(message);
          return null;
      }

      const data = await response.json();

      commit('SET_PRODUCTS', data);
    },

    async getPartialProducts ({ commit }, pagination) {
      // get a partial set of products for pagination
      // pagination parameter must me an object with offset key and limit key
      // offset and limit values must be integers and positive
      let response = await fetch(ENDPOINT + 'products?offset=' + pagination.offset + '&limit=' + pagination.limit);

      if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          console.log(message);
          return null;
      }

      const data = await response.json();

      commit('SET_PRODUCTS', data);
    },

    async getProduct ({ commit }, productId) {
      // get one product data by id
      let response = await fetch(ENDPOINT + 'products/' + productId);

      if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          console.log(message);
          return null;
      }

      const data = await response.json();

      commit('SET_PRODUCT', data);
    },
  },
  modules: {
  }
})