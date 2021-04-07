<template>
    <div class="block-navigation">
        <nav class="navbar navbar-expand-md p-0">
            <div class="container">

                <button class="navbar-light navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse block-navigation__wrapper" id="navbarSupportedContent">
                    <div>
                        <ul class="navbar-nav">
                            <li class="">
                                <router-link to="/" class="block-navigation__link">Accueil</router-link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul class="navbar-nav list-unstyled d-flex justify-content-end py-1 m-0">
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
            </div>
        </nav>
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

<style lang="scss">
.block-navigation {
    background-color: $off-white;
    font-size: 0.8rem;

    @media screen and (min-width: #{$phone}) {
        font-size: 1rem;
    }

    &__wrapper {
        @media screen and (min-width: #{$phone}) {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
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
