<template>
    <div>
        <div class="container">
            <div class="mt-5 mb-4">
                <router-link :to="{ name: 'Administration' }" class="btn btn-secondary mb-3">Retour au choix de la table</router-link>
                <div class="d-flex justify-content-between align-items-end mb-2">
                    <h3 class="mb-2 mt-2">Produits</h3>
                    <router-link :to="{ name: 'ProductCreation' }" class="btn btn-primary mb-2">Ajouter un produit</router-link>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prix</th>
                                <th scope="col">Région</th>
                                <th scope="col">Catégorie</th>
                                <th scope="col" class="">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products" v-bind:key="product.id">
                                <th scope="row">{{ product.id }}</th>
                                <td>{{ product.name }}</td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.region_name }}</td>
                                <td>{{ product.category_name }}</td>
                                <td class="">
                                    <router-link :to="{ name: 'ProductUpdate', params: { id: product.id } }" class="btn btn-success mr-1 mb-1">Modifier</router-link>
                                    <button @click.prevent="deleteProduct(product.id)" href="#" class="btn btn-danger mb-1">Supprimer</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <Pagination
            @update:modelPage = 'updatePage'
            v-bind:modelPage="page"
            v-bind:modelItemsPerPage="productsPerPage"
            v-bind:modelNumberOfItems="productsTotalNumber"
        />


        <div
        class="modal-bg"
        v-if="isProductOpen"
        @click.self="close"
        >
        <router-view/>
        </div>

    </div>

</template>

<script>

// @ is an alias to /src
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'ProductsAdministration',
  components: {
    Pagination
  },

  data() {
    return {
      productsPerPage: 10,
      page: 1
    }
  },

  computed: {
    products() {
      return this.$store.state.products;
    },

    productsTotalNumber() {
      return this.$store.state.lengthMatchedProducts;
    },

    isProductOpen () {
      return (this.$route.name === 'ProductCreation' || this.$route.name === 'ProductUpdate');
    }
  },

  methods: {
    close () {
      this.$router.push({ name: 'ProductsAdministration' })
    },

    updatePage(value) {
      this.page = value;
    },

    deleteProduct(productId) {
      this.$store.dispatch("deleteProduct", productId);
    },
  },

  watch: {
    page() {
      // get new set of products (without filters) paginated on page change
      this.$store.dispatch("getFilteredProducts", { 'filters': {'region': '', 'category': '', 'min_price': '', 'max_price': '', 'search': ''},
        'offset': (this.page - 1) * this.productsPerPage, 'limit': this.productsPerPage });
    }
  },

  mounted() {
    // get set of all type of products (without filters) paginated
    this.$store.dispatch("getFilteredProducts", { 'filters': {'region': '', 'category': '', 'min_price': '', 'max_price': '', 'search': ''},
      'offset': (this.page - 1) * this.productsPerPage, 'limit': this.productsPerPage });
    // get total number of products (without filters)
    this.$store.dispatch("getMatchedProductsNumber");
  }
}
</script>

<style lang="scss" scoped>
</style>