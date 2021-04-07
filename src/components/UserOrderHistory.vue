<template>
  <div class="mt-4 mb-2">
      <div class="">
            <h5>Mon historique de commandes</h5>
            <div>
            </div>
      </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'

export default {
    name: 'UserProfile',
    components: {
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        })
    },
}
</script>

<style lang="scss" scoped>
</style>