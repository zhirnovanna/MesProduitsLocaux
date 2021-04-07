<template>
  <div class="p-4 modal-window">
      <div class="w-100 pt-2 pb-2 d-flex flex-column">
        <h4 class="mb-3">Modifier mon profil</h4>
        <form @submit.prevent="userSubmission" ref="meForm" class="needs-validation" novalidate>
            <div class="form-group mb-4">
                <label for="lastname">Nom de famille de l'utilisateur</label>
                <input type="text" name="lastname" id="lastname" v-model="lastName" class="form-control" ref="lastnameInput">
                <div class="invalid-feedback" ref="lastnameFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="firstname">Prénom de l'utilisateur</label>
                <input type="text" name="firstname" id="firstname" v-model="firstName" class="form-control" ref="firstnameInput">
                <div class="invalid-feedback" ref="firstnameFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="email">Email de l'utilisateur</label>
                <input type="email" name="email" id="email" v-model="email" class="form-control" ref="emailInput">
                <div class="invalid-feedback" ref="emailFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="phone">Téléphone de l'utilisateur</label>
                <input type="tel" name="phone" id="phone" v-model="phone" class="form-control" ref="phoneInput">
                <div class="invalid-feedback" ref="phoneFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="address">Adresse de l'utilisateur</label>
                <input type="text" name="address" id="address" v-model="address" class="form-control" ref="addressInput">
                <div class="invalid-feedback" ref="addressFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="pc">Code postal de l'utilisateur</label>
                <input type="number" name="pc" id="pc" v-model="pc" class="form-control" ref="pcInput">
                <div class="invalid-feedback" ref="pcFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="city">Ville de l'utilisateur</label>
                <input type="text" name="city" id="city" v-model="city" class="form-control" ref="cityInput">
                <div class="invalid-feedback" ref="cityFeedback"></div>
            </div>
            <input type="submit" value="Valider" class="btn btn-primary">
        </form>
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
    data() {
        return {
            modelLastName: null,
            modelFirstName: null,
            modelAddress: null,
            modelPc: null,
            modelCity: null,
            modelEmail: null,
            modelPhone: null
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            userAuth: 'auth/user',
        }),

        user() {
            return this.$store.state.crud.userToUpdate;
        },

        usersEmails() {
            return this.$store.state.crud.takenUserEmails;
        },

        takenUsersEmails() {
            return this.usersEmails.filter((userEmail) => userEmail !== this.user.email);
        },

        lastName: {
            get() {
                return this.modelLastName;
            },
            set(value) {
                this.modelLastName = value;
            }
        },

        firstName: {
            get() {
                return this.modelFirstName;
            },
            set(value) {
                this.modelFirstName = value;
            }
        },
        
        email: {
            get() {
                return this.modelEmail
            },
            set(value) {
                // check validation requirements
                if(this.takenUsersEmails.includes(value)) {
                    this.$refs.emailInput.setCustomValidity('Cet email est déjà utilisé.');
                    this.$refs.emailFeedback.innerHTML = 'Cet email est déjà utilisé.';
                    this.$refs.emailInput.reportValidity();
                } else if (this.$refs.emailInput.validity.typeMismatch) {
                    this.$refs.emailInput.setCustomValidity('Le format n\'est pa valide. Veuillez entrer un email.');
                    this.$refs.emailFeedback.innerHTML = 'Le format n\'est pa valide. Veuillez entrer un email.';
                    this.$refs.emailInput.reportValidity();
                } else if (value.length > 100) {
                    this.$refs.emailInput.setCustomValidity('L\'email doit comporter 100 caractères maximum.');
                    this.$refs.emailFeedback.innerHTML = 'L\'email doit comporter 100 caractères maximum.';
                    this.$refs.emailInput.reportValidity();
                } else {
                    this.$refs.emailInput.setCustomValidity('');
                    this.$refs.emailInput.reportValidity();
                }
                
                // set new value
                this.name = value;
            }
        },
        
        isAdmin: {
            get() {
                return this.modelIsAdmin;
            },
            set(value) {
                this.modelLastName = value;
            }
        }
    },

    watch: {
        user: function() {
            if(this.userId) {
                this.modelLastName = this.user.lastname;
                this.modelFirstName = this.user.firstname;
                this.modelAddress = this.user.address;
                this.modelPc = this.user.pc;
                this.modelCity = this.user.city;
                this.modelEmail = this.user.email;
                this.modelPhone = this.user.phone;
            }
        }
    },

    methods: {
        userSubmission() {
            // add was validated class to form if not already there to make validation feedback style appear
            if(!this.$refs.meForm.classList.contains('was-validated')) {
                this.$refs.meForm.classList.add('was-validated');
            }

            // if all validation criteria passed send request to API and redirect to products management page
            if(this.$refs.meForm.checkValidity() === true) {
                if(this.userId) {
                this.$store.dispatch("editUser", 
                    {id: this.userId, 
                    body: {'lastname': this.email,
                            'firstname': this.email,
                            'email': this.email,
                            'phone': this.email,
                            'address': this.email,
                            'pc': this.email,
                            'city': this.email,
                }});

                }
                if(this.userAuth.admin === 0) {
                    this.$router.push({ name: 'Dashboard' });
                } else if (this.userAuth.admin === 1) {
                    this.$router.push({ name: 'adminDashboard' });
                }
            }
        },
    },
    mounted() {
        if(this.$route.params.id != this.userAuth.id) {
            this.$router.push({ name: 'Home' })
        } else {
            this.$store.dispatch("getUser", this.userAuth.id);
            this.$store.dispatch("getTakenUserEmails");
        }
    }
}
</script>

<style lang="scss" scoped>
</style>