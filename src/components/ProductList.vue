<template>
<div class="py-5">
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
            <ProductCard v-for="product in products" 
            v-bind:product="product" 
            v-bind:key="product.key" />
        </div>
    </div>
</div>
</template>

<script>

import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductList',

  components: {
    ProductCard
  },

  computed: {
    products() {
      // return the products array from state which has been set as the API GET request result
      return this.$store.state.products;
    },
  },

  methods: {
  },

  mounted() {
    // send GET request to API to get all the products info
    this.$store.dispatch("getAllProducts");     
  },
}
</script>

<style scoped>
</style>