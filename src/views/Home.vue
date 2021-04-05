<template>
  <div class="home">
    <Header />
    <ProductList/>
    <Footer />
 
  </div>
</template>

<script>

// @ is an alias to /src

// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    ProductList,
    Header,
    Footer,
  }
}
/*
export default {
  name: 'Home',
  components: {
    CategoriesNavigation
  },

  computed: {
    products() {
      return this.$store.state.products;
    }
  },

  mounted() {
    this.$store.dispatch("getAllProducts");
  }
}*/
</script>
