<template>
<div class="my-5">

  <div v-if="loading === true" class="d-flex justify-content-center">
    <div class="spinner-border spinner-products" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>


  <div v-else>

    <div v-if="products.length === 0" class="d-flex flex-column align-items-center">
      <i class="bi bi-bag-x not-found__icon"></i>
      <span class="mt-3 not-found__text">Aucun produit ne correspondant à vos critères</span>
    </div>

    <div v-else>
      <div class="container">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              <ProductCard v-for="product in products" 
              v-bind:product="product" 
              v-bind:key="product.key" />
          </div>
      </div>

      <Pagination
      @update:modelPage = 'updatePage'
      v-bind:modelPage="page"
      v-bind:modelItemsPerPage="productsPerPage"
      v-bind:modelNumberOfItems="lengthMatchedProducts"
      />
      
    </div>
  </div>
</div>
</template>

<script>

import ProductCard from '@/components/ProductCard.vue'
import Pagination from '@/components/Pagination.vue'


export default {
  name: 'ProductList',

  components: {
    ProductCard,
    Pagination
  },

  data() {
      return {
        productsPerPage: 12,
        page: 1
      }

  },

  props: {
    regionId: {
      type: [String, Number],
      required: false,
      default: ''
    },
    categoryId: {
      type: [String, Number],
      required: false,
      default: ''
    },
    minPrice: {
      type: [String, Number],
      required: false,
      default: ''
    },
    maxPrice: {
      type: [String, Number],
      required: false,
      default: ''
    },
    searchTerm: {
      type: String,
      required: false,
      default: ''
    },
    sorting: {
      type: String,
      required: false,
      default: ''
    }, 
  },

  computed: {
    filters() {
      // generate parameters object from filters passed as props for API request
      return {
        'region': this.regionId, 
        'category': this.categoryId, 
        'min_price': this.minPrice, 
        'max_price': this.maxPrice, 
        'search': this.searchTerm, 
        'sorting': this.sorting };
    },

    loading() {
      // are the products still loading ?
      return this.$store.state.loading;
    },

    products() {
      // return the products array from state which has been set as the API GET request result
      return this.$store.state.products;
    },

    lengthMatchedProducts() {
      // return the number of products matched with the criteria passed as parameters for pagination
      return this.$store.state.lengthMatchedProducts;
    }
  },

  watch: {
    filters() {
      // send new GET request to API with new filters every time filters change
      this.$store.dispatch("getFilteredProducts", { 'filters': this.filters, 'offset': (this.page - 1) * this.productsPerPage, 'limit': this.productsPerPage});
      this.$store.dispatch("getMatchedProductsNumber", this.filters);
    },

    page() {
      // get corresponding paginated set of matched products when changing page
      this.$store.dispatch("getFilteredProducts", { 'filters': this.filters, 'offset': (this.page - 1) * this.productsPerPage, 'limit': this.productsPerPage});
    },

    lengthMatchedProducts() {
      // at every new total of matched products go back to page 1
      this.page = 1;
    }
  },

  methods: {
    updatePage(value) {
      this.page = value;
    },
  },

  mounted() {
    // send GET request to API to get the products info corresponding to the passed parameters
    this.$store.dispatch("getFilteredProducts", { 'filters': this.filters, 'offset': (this.page - 1) * this.productsPerPage, 'limit': this.productsPerPage});
    this.$store.dispatch("getMatchedProductsNumber", this.filters);
  }
}
</script>

<style lang="scss">

.spinner-products{
  color: $primary-color;
}


@-webkit-keyframes swinging{
  0%{-webkit-transform: rotate(20deg);}
  50%{-webkit-transform: rotate(-15deg)}
  100%{-webkit-transform: rotate(20deg);}
}

@keyframes swinging{
  0%{transform: rotate(20deg);}
  50%{transform: rotate(-15deg)}
  100%{transform: rotate(20deg);}
}

.not-found {
  
  &__text {
    font-size: 1.1rem;
    text-align: center;
  }

  &__icon {
    font-size: 2rem;
    color: $primary-color;
    -webkit-transform-origin: 50% 0;
    -webkit-animation: swinging 2s ease-in-out forwards infinite;
    transform-origin: 50% 0;
    animation: swinging 2s ease-in-out forwards infinite;
  }
}
</style>