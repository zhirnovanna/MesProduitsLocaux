import { ENDPOINT } from './../index';
import * as Alertify from 'alertifyjs';



const state = () => ({
    productsInCart: [],
    cartLocalStorage: null,
    cartProductsIds: [],
    cartTotalItemsNumber: 0
})

const getters = {
}

const mutations = {
    SET_PRODUCTS_CART(state, productsInCart) {
        state.productsInCart = productsInCart;
    },
    SET_CART_LOCALSTORAGE(state, cart) {
        state.cartLocalStorage = cart;
    },
    SET_CART_PRODUCTS_IDS(state, cart) {
        if(cart === null || !cart.content) {
            state.cartProductsIds = [];
        } else {
            let ids = [];
            for(const item of cart.content) {
                ids.push(item.id);
            }
            state.cartProductsIds = ids;
        }
    },
    SET_CART_TOTAL_NUMBER(state, cart) {
        if(cart === 0) {
            state.cartTotalItemsNumber = 0;
        } else {
            let total = 0;
            for(const item of cart.content) {
                total += item.quantity;
            }
            state.cartTotalItemsNumber = total;
        }
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

    getCartLocalStorage({ commit }) {
        if(!localStorage.getItem('mesproduitslocaux-cart')) {
            commit('SET_CART_LOCALSTORAGE', null);
            commit('SET_CART_TOTAL_NUMBER', 0);
        } else {
            let cart = JSON.parse(localStorage.getItem('mesproduitslocaux-cart'));
            commit('SET_CART_LOCALSTORAGE', cart);
            commit('SET_CART_PRODUCTS_IDS', cart);
            commit('SET_CART_TOTAL_NUMBER', cart);
        }
    },

    getCartArticlesNumber({ commit }) {
        if(!localStorage.getItem('mesproduitslocaux-cart')) {
            commit('SET_CART_TOTAL_NUMBER', 0);
        } else {
            let cart = JSON.parse(localStorage.getItem('mesproduitslocaux-cart'));
            commit('SET_CART_TOTAL_NUMBER', cart);
        }
    },

    addOneToCartFromCart({ commit }, product){
        if(product.quantity >= 1) {
            let currentCart = JSON.parse(localStorage.getItem('mesproduitslocaux-cart'));

            if(currentCart.region != product.region_id) {
                Alertify.alert('Panier', 'Vous avez déjà dans votre panier un ou des article(s) provenant d\'une autre région. Veuillez continuer votre shopping dans cette même région ou vider votre panier.')
            } else {
                const index = currentCart.content.findIndex(item => item.id === product.id);
                if(index === -1) {
                    return;
                }

                let newTotal = currentCart.content[index].quantity + 1;
                if(newTotal <= product.quantity) {
                    currentCart.content[index].quantity ++;
                } else {
                    currentCart.content[index].quantity = product.quantity;
                    Alertify.alert('Panier', 'Quantité maximum atteinte pour ce produit');
                }
            }

            let newCartValue = JSON.stringify(currentCart);
            localStorage.setItem('mesproduitslocaux-cart', newCartValue);
            commit('SET_CART_LOCALSTORAGE', currentCart);
            commit('SET_CART_TOTAL_NUMBER', currentCart);

        } else {
            Alertify.alert('Panier', 'Quantité indisponible !');
        }
    },

    addToCartFromShop({ commit }, payload) {
        //console.log(localStorage.getItem('mesproduitslocaux-cart'));
        if(Number.isInteger(payload.quantityWanted) 
        && payload.quantityWanted >= 1 
        && payload.quantityWanted <= payload.quantityAvailable) {

            if(!localStorage.getItem('mesproduitslocaux-cart')) {
                let newCart = {'region': payload.productRegion, 'content': [{'id': payload.productId, 'quantity': payload.quantityWanted}]};
                localStorage.setItem('mesproduitslocaux-cart', JSON.stringify(newCart));
                commit('SET_CART_LOCALSTORAGE', newCart);
                commit('SET_CART_TOTAL_NUMBER', newCart);

            } else {
                let currentCart = JSON.parse(localStorage.getItem('mesproduitslocaux-cart'));
                if(currentCart.region != payload.productRegion) {
                    Alertify.alert('Panier', 'Vous avez déjà dans votre panier un ou des article(s) provenant d\'une autre région. Veuillez continuer votre shopping dans cette même région ou vider votre panier.')
                
                } else {
                    const index = currentCart.content.findIndex(item => item.id === payload.productId);
                    if (index === -1) {
                        currentCart.content.push({'id': payload.productId, 'quantity': payload.quantityWanted});
                    } else {
                        let newTotal = currentCart.content[index].quantity + payload.quantityWanted;
                        if(newTotal <= payload.quantityAvailable) {
                            currentCart.content[index].quantity += payload.quantityWanted;
                        } else {
                            currentCart.content[index].quantity = payload.quantityAvailable;
                            Alertify.alert('Panier', 'Quantité maximum atteinte pour ce produit');
                        }
                    }
                    let newCartValue = JSON.stringify(currentCart);
                    localStorage.setItem('mesproduitslocaux-cart', newCartValue);
                    commit('SET_CART_LOCALSTORAGE', currentCart);
                    commit('SET_CART_TOTAL_NUMBER', currentCart);
    
                }
            }
        } else {
          Alertify.alert('Panier', 'Quantité indisponible !');
        }
    },

    removeOneFromCart({ commit }, product) {
        let currentCart = JSON.parse(localStorage.getItem('mesproduitslocaux-cart'));
        const index = currentCart.content.findIndex(item => item.id === product.id);

        if(index === -1) {
            return;
        }
                
        let newTotal = currentCart.content[index].quantity - 1;
        if(newTotal < product.quantity && newTotal > 0) {
            currentCart.content[index].quantity --;
        } else if (newTotal <= 0 || product.quantity === 0) {
            // if removing the last item of this product from cart or if this product is no longer in stock
            currentCart.content = currentCart.content.filter((item) => item.id !== product.id);

            if(currentCart.content.length === 0) {
                // if the cart is now empty remove localstorage item (to also forget region)
                localStorage.removeItem('mesproduitslocaux-cart');
                currentCart = null;
                commit('SET_CART_LOCALSTORAGE', currentCart);
                commit('SET_CART_TOTAL_NUMBER', 0);
                commit('SET_CART_PRODUCTS_IDS', currentCart);
                return null;
            }

            commit('SET_CART_PRODUCTS_IDS', currentCart);
        } else {
            currentCart.content[index].quantity = product.quantity;
            Alertify.alert('Panier', 'Quantité maximum atteinte pour ce produit');
        }
        let newCartValue = JSON.stringify(currentCart);
        localStorage.setItem('mesproduitslocaux-cart', newCartValue);
        commit('SET_CART_LOCALSTORAGE', currentCart);
        commit('SET_CART_TOTAL_NUMBER', currentCart);

    },

    removeProductFromCart({ commit }, product) {
        let currentCart = JSON.parse(localStorage.getItem('mesproduitslocaux-cart'));
        currentCart.content = currentCart.content.filter((item) => item.id !== product.id);
        if(currentCart.content.length === 0) {
            // if the cart is now empty remove localstorage item (to also forget region)
            localStorage.removeItem('mesproduitslocaux-cart');
            currentCart = null;
            commit('SET_CART_TOTAL_NUMBER', 0);
        } else {
            let newCartValue = JSON.stringify(currentCart);
            localStorage.setItem('mesproduitslocaux-cart', newCartValue);
            commit('SET_CART_TOTAL_NUMBER', currentCart);
        }

        commit('SET_CART_LOCALSTORAGE', currentCart);
        commit('SET_CART_PRODUCTS_IDS', currentCart);
    },

    emptyCart({ commit }) {
        localStorage.removeItem('mesproduitslocaux-cart');
        const currentCart = null;
        commit('SET_CART_LOCALSTORAGE', currentCart);
        commit('SET_CART_TOTAL_NUMBER', 0);
        commit('SET_CART_PRODUCTS_IDS', currentCart);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}