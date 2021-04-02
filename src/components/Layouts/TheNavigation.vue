<template>
    <div class="block-navigation">
        <div class="container">
            <ul class="list-unstyled d-flex justify-content-end py-1 m-0">
                <template v-if="authenticated">
                    <li class="mr-5 block-navigation__message"> Bonjour {{ user.firstname }} ! </li>
                    <li class="mr-3">
                        <router-link class="block-navigation__link" :to="{
                            name: 'Dashboard'
                        }">
                        Mon compte
                        </router-link>
                    </li>

                    <li class="">
                        <a class="block-navigation__link" href="#" @click.prevent="signOut">
                        Se déconnecter
                        </a>
                    </li>
                </template> 
                <template v-else>
                    <li class="mr-3">
                        <router-link class="block-navigation__link" :to="{
                            name: 'SignIn'
                        }">
                        Se connecter
                        </router-link>
                    </li>
                    <li class="">
                        <router-link class="block-navigation__link" :to="{
                            name: 'SignUp'
                        }">
                        Créer votre compte
                        </router-link>
                    </li>
                </template>
            </ul>
        </div>
    </div>
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

<style lang="scss" scoped>
.block-navigation {
    background-color: $off-white;
    font-size: 0.8rem;

    @media screen and (min-width: #{$phone}) {
        font-size: 1rem;
    }

    &__link {
        font-weight: 500;
        color: $dark;
        transition: color 300ms ease-out;

        &:hover {
            text-decoration: none;
            color: $grey;
        }
    }

    &__message {
        transition: all 300ms ease-out;
        color: $dark;

        &:hover {
            transform: translateX(-1rem);
            color: $grey;
        }
    }
}
</style>
