<template>
  <div class="mt-4 mb-2">
      <div class="d-flex block-userinfo">
        <div>
            <h5>Mes informations</h5>
            <div>
                    <div>{{ user.firstname }} {{ user.lastname}}</div>
                    <div>{{ user.address }}</div>
                    <div>{{ user.pc }} {{ user.city }}</div>
                    <div>{{ user.phone }}</div>
                    <div>{{ user.email }}</div>
            </div>
        </div>

        <div>
            <router-link v-if="user.admin === 1" :to="{ name: 'ModifyMyInfoAdmin', params: { id: user.id } }" class="btn btn-custom-primary my-2">Modifier mes informations</router-link>
            <router-link v-if="user.admin === 0" :to="{ name: 'ModifyMyInfo', params: { id: user.id } }" class="btn btn-custom-primary my-2">Modifier mes informations</router-link>
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
    .block-userinfo {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        @media screen and (min-width: #{$phone}) {
            flex-direction: row;
            justify-content: space-between;
            align-items: baseline;

        }
    }
</style>