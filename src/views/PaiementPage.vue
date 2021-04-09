<template>
  <div class="my-4 col-md-12 d-flex justify-content-center align-items-center">
    <div class="col-md-8 rounded px-5 py-4 shadow bg-white">
        <div class="row" style="text-center">
          <h2 class="col-md-12"> Choisissez votre moyen de paiement</h2>
          <div class="col-md-12" ref="paypal"></div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  computed: {
        ...mapGetters({
          authenticated: 'auth/authenticated',
          user: 'auth/user',
        }),

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

  mounted: function (){
    if (this.user === null) {
      this.$router.push('/SignIn')
    }

    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AaYiqrdqAUiYqHdVL_65JuJlLXsTXBUKmX-xOgs9N1rZGD1roTv__LFHZV9-vNQ-aIWv4rKuRAWWgKB0";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

    this.$store.dispatch("getCartLocalStorage");
    this.$store.dispatch("getCartProductsInfos", this.productsInCartIds);
  },


  methods:{
    getProductsQuantityInCart(id) {
            const index = this.cartLocalStorage.content.findIndex(item => item.id === id);
            if(index !== -1) {
                return this.cartLocalStorage.content[index].quantity;
            }
        },

    setLoaded: function(){
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              //description: product.name + getProductsQuantityInCart(product.id),
              
              amount: {
                currency: "EUR",
                value: this.totalPrice + 9.99
              }
            }]
          });
        },
        onApprove: async (data, actions) => {
          this.processing = true;
          const order = await actions.order.capture();

          console.log(order);
          for(const product of this.productsInCartInfo) {
            let updatedQuantity = (product.quantity - this.getProductsQuantityInCart(product.id));
            this.$store.dispatch("editProduct", {id: product.id, body: { 'quantity' : updatedQuantity }});
          }
          this.$router.push('/Confirmation')
        },

        onError: err => {
          console.log(err);
        },
      })
      .render(this.$refs.paypal) // Display payment options on your web page
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.justify-content-center {
 text-align: center;
 margin-top: 50px;
 margin-bottom: 50px;
}
</style>
