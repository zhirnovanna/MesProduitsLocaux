<template>
  <div class="my-4">
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Bienvenue sur votre dashboard administrateur</div>
            <div class="card-body">
              
                <div class="my-2">
                  <router-link :to="{ name: 'Administration'}" class="btn btn-custom-primary">Accès au CRUD</router-link>
                </div>

                <UserProfile/>
            </div>
        </div>

        <div class="modal-bg"
          v-if="isUserOpen"
          @click.self="close">
          <router-view/>
        </div>
    </div>
  </div>
</template>
<script>
import UserProfile from '@/components/UserProfile.vue'

  export default {
    name: 'Dashboard',
    components: {
      UserProfile,
    },
    computed: {
      isUserOpen () {
        return (this.$route.name === 'ModifyMyInfoAdmin');
      }

    },
    methods: {
      close () {
        this.$router.push({ name: 'adminDashboard' })
      },
    },
    mounted() {
      //
    }
  }
</script>