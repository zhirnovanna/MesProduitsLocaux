<script>
export default {
	name: 'Cart',

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
        },
    },

    methods: {
        getProductsQuantityInCart(id) {
            const index = this.cartLocalStorage.content.findIndex(item => item.id === id);
            if(index !== -1) {
                return this.cartLocalStorage.content[index].quantity;
            }
        },

        addOneToCart(product){
            this.$store.dispatch("addOneToCartFromCart", product);
        },

        removeOneFromCart(product) {
            this.$store.dispatch("removeOneFromCart", product);
        },

        removeProductFromCart(product) {
            this.$store.dispatch("removeProductFromCart", product);
        }

    },

    mounted() {
        this.$store.dispatch("getCartLocalStorage");
        this.$store.dispatch("getCartProductsInfos", this.productsInCartIds);
    }
}

</script>

<template>

<div class="my-3">
    <div class="container">
        <div>
            <div v-for="product in productsInCartInfo" v-bind:key="product.id" class="card">
                <div>{{product.name}}</div>
                <div>Prix unitaire : {{product.price}}</div>
                <div> 
                    <span>Quantité : {{getProductsQuantityInCart(product.id)}}</span> 
                    <span>
                        <a @click="addOneToCart(product)"><i class="bi bi-bag-plus btn"></i></a>
                        <a @click="removeOneFromCart(product)"><i class="bi bi-bag-dash btn"></i></a>
                    </span>
                </div>
                <div>Prix : {{getProductsQuantityInCart(product.id) * product.price}} </div>
                <a @click="removeProductFromCart(product)"><i class="bi bi-trash btn"></i></a>
            </div>
        </div>

        <div>{{ totalPrice }}</div>

    </div>
</div>

</template>

<style>


</style>