import { ENDPOINT } from './../index';


const state = () => ({
    productsInCart: [],
})

const getters = {
}

const mutations = {
    SET_PRODUCTS_CART(state, productsInCart) {
        state.productsInCart = productsInCart;
    },
}

const actions = {
    async getCartProductsInfos({ commit }, productsIds) {
        let products = [];
        // get all products
        for (let id of productsIds) {
            let response = await fetch(ENDPOINT + 'products/' + id);

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                console.log(message);
                return null;
            }
            
            const data = await response.json();
            products.push(data);
        }
        commit('SET_PRODUCTS_CART', products);
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}