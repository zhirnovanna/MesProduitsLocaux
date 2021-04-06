<script>
export default {
	name: 'Cart',
    data() {
        return {

        }
    },
    computed: {
        cartLocalStorage() {
            if(!localStorage.getItem('mesproduitslocaux-cart')) {
                return null;
            } else {
                return JSON.parse(localStorage.getItem('mesproduitslocaux-cart'));
            }
        },
        productsInCartIds() {
            if(!this.cartLocalStorage) {
                localStorage.setItem('mesproduitslocaux-cart', JSON.stringify({}));
                return [];
            } else {
                let ids = [];
                for(const item of this.cartLocalStorage.content) {
                    ids.push(item.id)
                }
                return ids;
            }
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
            if(product.quantity >= 1) {
                let currentCart = JSON.parse(localStorage.getItem('mesproduitslocaux-cart'));

                if(currentCart.region != product.region_id) {
                    alert('Vous avez déjà dans votre panier un ou des article(s) provenant d\'une autre région. Veuillez continuer votre shopping dans cette même région ou vider votre panier.')
                } else {
                    const index = currentCart.content.findIndex(item => item.id === product.id);
                    if(index === -1) {
                        return;
                    }

                    let newTotal = currentCart.content[index].quantity + 1;
                    if(newTotal < product.quantity) {
                        currentCart.content[index].quantity ++;
                    } else {
                        currentCart.content[index].quantity = product.quantity;
                        alert('Quantité maximum atteinte pour ce produit');
                    }
                }
                let newCartValue = JSON.stringify(currentCart);
                localStorage.setItem('mesproduitslocaux-cart', newCartValue);
                console.log(localStorage.getItem('mesproduitslocaux-cart'));

            } else {
                alert('Quantité indisponible !');
            }
        },

        removeOneFromCart(product) {
            let currentCart = JSON.parse(localStorage.getItem('mesproduitslocaux-cart'));
            const index = currentCart.content.findIndex(item => item.id === product.id);

            if(index === -1) {
                return;
            }
                    
            let newTotal = currentCart.content[index].quantity - 1;
            if(newTotal < product.quantity && newTotal > 0) {
                currentCart.content[index].quantity --;
            } else if (newTotal <= 0) {
                currentCart.content = currentCart.content.filter((item) => item.id !== product.id);
            } else {
                currentCart.content[index].quantity = product.quantity;
                alert('Quantité maximum atteinte pour ce produit');
            }
            let newCartValue = JSON.stringify(currentCart);
            localStorage.setItem('mesproduitslocaux-cart', newCartValue);
            console.log(localStorage.getItem('mesproduitslocaux-cart'));
        },

        removeProductFromCart(product) {
            let currentCart = JSON.parse(localStorage.getItem('mesproduitslocaux-cart'));
            currentCart.content = currentCart.content.filter((item) => item.id !== product.id);
            let newCartValue = JSON.stringify(currentCart);
            localStorage.setItem('mesproduitslocaux-cart', newCartValue);
        }

    },

    mounted() {
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