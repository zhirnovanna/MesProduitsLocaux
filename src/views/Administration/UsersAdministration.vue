<template>
    <div>
        <div class="container">
            <div class="mt-5 mb-4">
                <router-link :to="{ name: 'Administration' }" class="btn btn-secondary mb-3">Retour au choix de la table</router-link>
                <h3 class="mb-2 mt-2">Utilisateurs</h3>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prénom</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Statut</th>
                                <th scope="col" class="">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" v-bind:key="user.id">
                                <th scope="row">{{ user.id }}</th>
                                <td>{{ user.lastname }}</td>
                                <td>{{ user.firstname }}</td>
                                <td>{{ user.email }}</td>
                                <td v-if="user.admin">ADMIN</td>
                                <td v-else></td>
                                <td class="">
                                    <router-link :to="{ name: 'UserUpdate', params: { id: user.id } }" class="btn btn-success mr-1 mb-1">Modifier</router-link>
                                    <button @click.prevent="deleteUser(user.id)" href="#" class="btn btn-danger mb-1">Supprimer</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination
                @update:modelPage = 'updatePage'
                v-bind:modelPage="page"
                v-bind:modelLastPage="lastPage"
                v-bind:modelPages="pages"
            />

        </div>


        <div
        class="modal-bg"
        v-if="isUserOpen"
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
  name: 'UsersAdministration',
  components: {
      Pagination
  },

  data() {
    return {
      usersPerPage: 10,
      page: 1,
      pages: [],
      lastPage: 1
    }
  },

  computed: {
    users() {
      return this.$store.state.crud.users;
    },

    usersTotalNumber() {
      return this.$store.state.crud.lengthUsers;
    },

    isUserOpen () {
      return (this.$route.name === 'UserUpdate');
    }
  },

  methods: {
    close () {
      this.$router.push({ name: 'UsersAdministration' })
    },

    setPages() {
      // reinitialize pages array before re running the method 
      this.pages = [];
      let numberOfPages = Math.ceil(this.usersTotalNumber/this.usersPerPage);
      this.lastPage = numberOfPages;

      for (let i = 1; i <= numberOfPages; i++) {
		    this.pages.push(i);
      }
    },

    updatePage(value) {
        this.page = value;
    },

    deleteUser(userId) {
      this.$store.dispatch("deleteUser", userId);
    },
  },

  watch: {
    usersTotalNumber() {
      this.setPages();
    },

    page() {
      this.$store.dispatch("getUsers", { 'offset': (this.page - 1) * this.usersPerPage, 'limit': this.usersPerPage });
    }
  },

  mounted() {
    this.$store.dispatch("getUsers", { 'offset': (this.page - 1) * this.usersPerPage, 'limit': this.usersPerPage });
    this.$store.dispatch("getUsersNumber");
    this.setPages();
  }
}
</script>

<style lang="scss" scoped>
</style>