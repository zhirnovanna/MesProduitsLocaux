<template>
    <ul>
        <li>
            <router-link :to="{
                name: 'Home'
            }">
            Page d'accueil 
            </router-link>
        </li>
        
        <template v-if="authenticated">
        <li> Bonjour {{ user.firstname }} ! </li>
        <li>
            <router-link :to="{
                name: 'Dashboard'
            }">
            Mon compte 
            </router-link>
        </li>

        <li>
            <a href="#" @click.prevent="signOut">
            Se déconnecter
            </a>
        </li>
        </template> 
        <template v-else>
            <li>
            <router-link :to="{
                name: 'SignIn'
            }">
            Se connecter
            </router-link>
        </li>
        <li>
            <router-link :to="{
                name: 'SignUp'
            }">
            Créer votre compte
            </router-link>
        </li>
        </template>
    </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            })
        },

    methods: {
            ...mapActions({
                signOutAction: 'auth/signOut'
            }),

            signOut () {
                this.signOutAction().then(() => {
                    this.$router.replace({
                        name: 'Home'
                    })
                })
            }
        }
}
</script>
