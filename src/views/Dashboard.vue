<template>
  <div class="my-4">
    <div class="container">

      <div class="card card-default">
        <div class="card-header">Bienvenue sur votre dashboard utilisateur</div>

          <div class="card-body">
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
// @ is an alias to /src
import UserProfile from '@/components/UserProfile.vue'


export default {
  name: 'Dashboard',
  components: {
    UserProfile,
  },

  computed: {
    isUserOpen () {
      return (this.$route.name === 'ModifyMyInfo');
    }

  },
  
  methods: {
    close () {
      this.$router.push({ name: 'Dashboard' })
    },
  }
}
</script>