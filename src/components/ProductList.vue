<template>
<div class="my-5">
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
    v-bind:modelLastPage="lastPage"
    v-bind:modelPages="pages"/>
</div>
</template>

<script>

import ProductCard from './ProductCard.vue'
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
        page: 1,
        pages: [],
        lastPage: 1
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
      // at every new total of matched products go back to page 1 and recalculate pages
      this.page = 1;
      this.setPages();
    }
  },

  methods: {
    setPages() {
      // reinitialize pages array before re running the method 
      this.pages = [];

      let numberOfPages = Math.ceil(this.lengthMatchedProducts/this.productsPerPage);
      this.lastPage = numberOfPages;

      for (let i = 1; i <= numberOfPages; i++) {
		    this.pages.push(i);
      }

      console.log(this.pages, this.lastPage, this.page)
    },

    updatePage(value) {
      this.page = value;
    },
  },

  mounted() {
    // send GET request to API to get the products info corresponding to the passed parameters
    this.$store.dispatch("getFilteredProducts", { 'filters': this.filters, 'offset': (this.page - 1) * this.productsPerPage, 'limit': this.productsPerPage});
    this.$store.dispatch("getMatchedProductsNumber", this.filters);
    this.setPages();
  }
}
</script>

<style scoped>
</style>