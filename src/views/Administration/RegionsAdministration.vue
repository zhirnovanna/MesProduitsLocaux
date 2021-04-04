<template>
    <div>
        <div class="container">
            <div class="mt-5 mb-4">
                <router-link :to="{ name: 'Administration' }" class="btn btn-secondary mb-3">Retour au choix de la table</router-link>
                <div class="d-flex justify-content-between align-items-end mb-2">
                    <h3 class="mb-2 mt-2">Régions</h3>
                    <router-link :to="{ name: 'RegionCreation' }" class="btn btn-primary mb-2">Ajouter une région</router-link>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nom</th>
                                <th scope="col" class="">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="region in regions" v-bind:key="region.id">
                                <th scope="row">{{ region.id }}</th>
                                <td>{{ region.name }}</td>
                                <td class="">
                                    <router-link :to="{ name: 'RegionUpdate', params: { id: region.id } }" class="btn btn-success mr-1 mb-1">Modifier</router-link>
                                    <button @click.prevent="deleteRegion(region.id)" href="#" class="btn btn-danger mb-1">Supprimer</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination
                @update:modelPage = 'updatePage'
                v-bind:modelPage="page"
                v-bind:modelItemsPerPage="regionsPerPage"
                v-bind:modelNumberOfItems="regionsTotalNumber"
            />

        </div>


        <div
        class="modal-bg"
        v-if="isRegionOpen"
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
  name: 'RegionsAdministration',
  components: {
      Pagination
  },

  data() {
    return {
      regionsPerPage: 10,
      page: 1
    }
  },

  computed: {
    regions() {
      return this.$store.state.regions;
    },

    regionsTotalNumber() {
      return this.$store.state.lengthRegions;
    },

    isRegionOpen () {
      return (this.$route.name === 'RegionCreation' || this.$route.name === 'RegionUpdate');
    }
  },

  methods: {
    close () {
      this.$router.push({ name: 'RegionsAdministration' })
    },

    updatePage(value) {
        this.page = value;
    },

    deleteRegion(regionId) {
      this.$store.dispatch("deleteRegion", regionId);
    },
  },

  watch: {

    page() {
      // get new set of paginated regions when changing page
      this.$store.dispatch("getRegions", { 'offset': (this.page - 1) * this.regionsPerPage, 'limit': this.regionsPerPage });
    }
  },

  mounted() {
    // get all regions paginated
    this.$store.dispatch("getRegions", { 'offset': (this.page - 1) * this.regionsPerPage, 'limit': this.regionsPerPage });
    // get total number of regions
    this.$store.dispatch("getRegionsNumber");
  }
}
</script>

<style lang="scss" scoped>
</style>