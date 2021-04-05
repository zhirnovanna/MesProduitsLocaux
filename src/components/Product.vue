<template>
<div class="card">
    <div :key="index" v-for="(name, index) in name">
        <img :src="name.image" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title"> {{name.name}} </h5>
            <p class="card-text">{{name.price}} €</p>
            <div class="btn">
                <div class="btn-detail">
                  <button @click="viewProduct(product)" v-on:click="toggleModale" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Voir le détail">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
                <div class="btn-qtt">
                  <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Noter ce produit">
                    <i class="bi bi-heart"></i>
                  </button>
                </div>
                <div class="btn-like">
                  <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Quantité">
                    <i class="bi bi-hash"></i>
                  </button>
                </div>
                <div class="btn-cart">
                  <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Ajouter au panier">
                    <i class="bi bi-basket3"></i>
                  </button>
                </div>
            </div>
        </div>
  </div>
</div>
<ProductModale v-bind:revele="revele" v-bind:toggleModale="toggleModale"></ProductModale>
</template>

<script>
import Axios from 'axios';
import ProductModale from './ProductModale.vue'

export default {
  name: 'Product',
  data() {
      return{
          name:null,
          revele:false,
      }
  },

  components: {
      'ProductModale' : ProductModale
  },

  methods: {
    toggleModale: function() {
      this.revele = !this.revele;
    },

    viewProduct(product) {
      this.product = product;
    },
  },

  mounted() {
      Axios
      .get('http://127.0.0.1:8000/api/products')
      .then((reponse) =>{
          this.name = reponse.data;
          console.log(this.name)
      });      
  },
}
</script>

<style scoped>

</style>
