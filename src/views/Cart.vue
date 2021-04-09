<script>
import ProductModale from '@/components/ProductModale.vue'
export default {
	name: 'Cart',
  data() {
    return{
      revele:[],
    }
  },
  components: {
    ProductModale
  },
    computed: {
        cartLocalStorage() {
            return this.$store.state.cart.cartLocalStorage;
        },

        productsInCartIds() {
            return this.$store.state.cart.cartProductsIds;
        },

        productsInCartInfo() {
            return this.$store.state.cart.productsInCart;
        },

        totalPrice(){
            let sum = 0;
            for(const product of this.productsInCartInfo) {
                sum += product.price * this.getProductsQuantityInCart(product.id);
            }
            return sum;
        }
    },

    watch: {
        productsInCartIds() {
            this.$store.dispatch("getCartProductsInfos", this.productsInCartIds);
            if(typeof(this.productsInCartIds) !== "undefined" && this.productsInCartIds.length > 0) {
                for(const productId of this.productsInCartId) {
                    this.revele[productId] = false;
                }
            }
        },
    },

    methods: {
        getProductsQuantityInCart(id) {
            const index = this.cartLocalStorage.content.findIndex(item => item.id === id);
            if(index !== -1) {
                return this.cartLocalStorage.content[index].quantity;
            }
        },
        toggleModale(productId) {
            this.revele[productId] = !this.revele[productId];
        },
        addToCart(quantityWanted) {
            this.$store.dispatch("addToCartFromShop", {'quantityWanted': quantityWanted, 
                                                'quantityAvailable': this.product.quantity,
                                                'productId': this.product.id,
                                                'productRegion': this.product.region_id});
        },

        addOneToCart(product){
            this.$store.dispatch("addOneToCartFromCart", product);
        },

        removeOneFromCart(product) {
            this.$store.dispatch("removeOneFromCart", product);
        },

        removeProductFromCart(product) {
            this.$store.dispatch("removeProductFromCart", product);
        },
    
        empty() {
            this.$store.dispatch("emptyCart");
        }

    },

    mounted() {
        this.$store.dispatch("getCartLocalStorage");
        this.$store.dispatch("getCartProductsInfos", this.productsInCartIds);
    }
}

</script>

<template>
<div>

    <div v-if="!cartLocalStorage" class="vide">
        <p class="pavi">Votre panier est vide.</p>
        <i class="bi bi-emoji-frown"></i>
        <div class="butt">
            <router-link to="/" class="btn btn-primary">Faire des achats</router-link>
        </div>
    </div>

<div v-if="cartLocalStorage" class="my-3">
    <div class="mt-2 mb-4 d-flex justify-content-end">
        <button @click="empty" class="btn btn-custom-primary">Vider le panier</button>
    </div>
    <table class="tableau">
        <thead>
            <tr>
                <th class="text-center-image">Image</th>
                <th class="text-left-nom">Nom du produit</th>
                <th class="text-left-cat">Catégorie</th>
                <th class="text-left-qtt">Quantité</th>
                <th class="text-left-supp">Supprimer</th>
                <th class="text-right-prx">Prix</th>
                <th class="text-right-tot">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in productsInCartInfo" v-bind:key="product.id">
                <td class="text-center-image2">
                    <img :src="product.image" class="card-img-top" alt="">
                </td>
                <td class="text-center-prodnam">
                    <a @click="toggleModale(product.id)">{{product.name}}</a>
                </td>
                <td class="text-center-catnam">
                    <div>{{product.category_name}}</div>
                </td>
                <td class="text-center-qttprod">
                    <div>
                        <span>
                            <a @click="removeOneFromCart(product)"><span class="minus-cart"> - </span></a>
                            <span>{{getProductsQuantityInCart(product.id)}}</span>
                            <a @click="addOneToCart(product)"><span class="plus-cart"> + </span></a>
                        </span>
                    </div>
                </td>
                <td class="text-center-suppr">
                    <a @click="removeProductFromCart(product)"><i class="bi bi-trash btn"></i></a>
                </td>
                <td class="text-center-unitpr">
                    <div>{{product.price}} €</div>
                </td>
                <td class="text-center-qttpr">
                    <div>{{getProductsQuantityInCart(product.id) * product.price}} €</div>
                </td>

                    <ProductModale 
                    @add-to-cart = 'addToCart'
                    @toggleModale = "toggleModale"
                    v-bind:revele="revele[product.id]" 
                    v-bind:product="product"
                    v-bind:key="product.id" />
            </tr>
        </tbody>

    </table>

    <div class="sub-total-table">
        <table class="table table-bordered">
            <tbody>
                <tr>
                    <td class="text-right1">
                        <strong>Total H.T.</strong>
                    </td>
                    <td class="text-right total-amount">
                        <div>{{totalPrice * 0.8}} </div>
                    </td>
                </tr>
                <tr>
                    <td class="text-right2">
                        <strong>Frais de port</strong>
                    </td>
                    <td class="text-right total-amount">
                        9,99 €
                    </td>
                </tr>
                <tr>
                    <td class="text-right3">
                        <strong>T.V.A. (20%)</strong>
                    </td>
                    <td class="text-right total-amount">
                        <div>{{totalPrice * 0.2}} </div>
                    </td>
                </tr>
                <tr>
                    <td class="text-right4">
                        <strong>Total</strong>
                    </td>
                    <td class="text-right total-amount">
                        <div>{{ totalPrice }} €</div>
                    </td>
                </tr>
                <tr>
                    <td class="text-right5">
                        <strong>Total frais de port inclus</strong>
                    </td>
                    <td class="text-right total-amount">
                        <div>{{ totalPrice + 9.99 }} €</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="buttons-clearfix">
        <div class="pull-left">
            <router-link to="/" class="btn btn-default">Continuer mes achats</router-link>
        </div>
        <div class="pull-right">
            <router-link class="btn btn-primary" to="/PaiementPage">Confirmer</router-link>
        </div>

    </div>
    
</div>

</div>

</template>

<style scoped>
.my-3 {
    min-height: .01%;
    overflow-x: auto;
    padding-left: 40px;
    padding-right: 40px;
}

.tableau {
    border-color: #e9e9e9;
    margin: auto;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    border-spacing: 0;
    border-collapse: collapse;
}

/*--------------thead--------------*/

.text-center-image {
    border-top: 0;
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    line-height: 18px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    vertical-align: middle;
    padding: 8px;
    text-align: center;
    width: 17%;
    max-width: 17%;
}

.text-left-nom, .text-left-cat, .text-left-qtt, .text-left-supp {
    border-top: 0;
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    line-height: 18px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    vertical-align: middle;
    padding: 8px;
    text-align: left;
}

.text-right-prx, .text-right-tot {
    border-top: 0;
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    line-height: 18px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    vertical-align: middle;
    padding: 8px;
    text-align: right;
    width: 14%;
    max-width: 14%;
}

.text-left-nom {
    width: 20%;
    max-width: 20%;
}

.text-left-cat {
    width: 13%;
    max-width: 13%;
}

.text-left-supp {
    width: 7%;
    max-width: 7%;
}

/*-------------tbody------------*/

.text-center-image2 {
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.6px;
    text-transform: capitalize;
    vertical-align: middle;
    padding: 8px;
    text-align: center;
}

.card-img-top {
    border-radius: 0;
    padding: 0;
    border-color: #eee;
    display: inline-block;
    max-width: 20%;
    height: auto;
    line-height: 1.42857143;
    background-color: #fff;
    border: 1px solid #ddd;
    transition: all .2s ease-in-out;
    vertical-align: middle;
}

.text-center-prodnam, .text-center-catnam, .text-center-qttprod, .text-center-suppr {
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    vertical-align: middle;
    padding: 8px;
    line-height: 1.42857143;
    text-align: left;
}

.text-center-prodnam:hover {
    cursor:pointer;
    color: #6fae1d;
}

.minus-cart {
    color:black;
    cursor: pointer;
}
.minus-cart:hover {
    color:red;
}

.plus-cart {
    color: black;
    cursor: pointer;
}
.plus-cart:hover {
    color: #6fae1d;
}

.text-center-suppr {
    text-align: center;
}

.bi-trash:hover {
    color:red;
}

.text-center-unitpr, .text-center-qttpr {
    color: #333;
    font-size: 16px;
    background: #fff;
    border: 1px solid #e9e9e9;
    vertical-align: middle;
    padding: 8px;
    line-height: 1.42857143;
    text-align: right;
}

/*-------------tableau prix ------------------*/

.sub-total-table {
    margin-bottom: 20px;
    width: 33.33333333%;
    float: right;
    position: relative;
    min-height: 1px;
}

.table-bordered {
    border-color: #e9e9e9;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    border-spacing: 0;
    border-collapse: collapse;
}

.text-right1, .text-right2, .text-right3, .text-right4, .text-right5 {
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    vertical-align: middle;
    padding: 8px;
    line-height: 1.42857143;
    text-align: right;
}

strong {
    font-weight: 400;
}

.total-amount {
    color: #333;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    background: #fff;
    border: 1px solid #e9e9e9;
    vertical-align: middle;
    padding: 8px;
}

/*---------------buttons---------------*/

.buttons-clearfix {
    clear: both;
    display: table;
    content: " ";
    margin: 0 0 15px;
    display: block;
    overflow: hidden;
    position: relative;
}

.pull-left {
    float: left !important;
}

.btn-default, .btn-primary {
    background-color: #6fae1d;
    border-color: #6fae1d;
    color: #fff;
    outline: none;
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    padding: 10px 20px;
    text-transform: uppercase;
    border-radius: 0;
    transition: all 0.5s;
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
}

.btn-default:hover {
    background-color:#588b15;
}

.btn-primary:hover {
    background-color:#588b15;
}

.pull-right {
    float: right !important;
}

/*---------------PANIER VIDE---------------*/
.vide {
    text-align: center;
    margin-top: 70px;
    margin-bottom: 70px;
}

.pavi {
    font-size: 50px;
    color:rgb(199, 199, 199);
}

.bi-emoji-frown {
    color:rgb(199, 199, 199) ;
    font-size: 100px;
}

</style>