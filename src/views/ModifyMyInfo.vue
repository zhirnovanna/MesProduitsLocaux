<template>
  <div class="p-4 modal-window">
      <div class="w-100 pt-2 pb-2 d-flex flex-column">
        <h4 class="mb-3">Modifier mon profil</h4>
        <form @submit.prevent="userSubmission" ref="meForm" class="needs-validation" novalidate>
            <div class="form-group mb-4">
                <label for="lastname">Mon nom de famille</label>
                <input type="text" name="lastname" id="lastname" v-model="lastName" class="form-control" ref="lastnameInput">
                <div class="invalid-feedback" ref="lastnameFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="firstname">Mon prénom</label>
                <input type="text" name="firstname" id="firstname" v-model="firstName" class="form-control" ref="firstnameInput">
                <div class="invalid-feedback" ref="firstnameFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="phone">Mon téléphone</label>
                <input type="tel" name="phone" id="phone" v-model="phone" class="form-control" ref="phoneInput">
                <div class="invalid-feedback" ref="phoneFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="address">Mon adresse</label>
                <input type="text" name="address" id="address" v-model="address" class="form-control" ref="addressInput">
                <div class="invalid-feedback" ref="addressFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="pc">Mon code postal</label>
                <input type="number" name="pc" id="pc" v-model="pc" class="form-control" ref="pcInput">
                <div class="invalid-feedback" ref="pcFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <label for="city">Ma ville</label>
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
            modelPhone: null
        }
    },
    computed: {
        ...mapGetters({
            userAuth: 'auth/user',
        }),

        user() {
            return this.$store.state.crud.userToUpdate;
        },

        lastName: {
            get() {
                return this.modelLastName;
            },
            set(value) {
            // check validation requirements
                if (value.length > 100) {
                    this.$refs.lastnameInput.setCustomValidity('Le nom de famille ne peut comporter que 100 caractères maximum.');
                    this.$refs.lastnameFeedback.innerHTML = 'Le nom de famille ne peut comporter que 100 caractères maximum.';
                    this.$refs.lastnameInput.reportValidity();
                } else if (!value) {
                    this.$refs.lastnameInput.setCustomValidity('Le nom de famille ne peut pas être vide.');
                    this.$refs.lastnameFeedback.innerHTML = 'Le nom de famille ne peut pas être vide.';
                    this.$refs.lastnameInput.reportValidity();
                } else {
                    this.$refs.lastnameInput.setCustomValidity('');
                    this.$refs.lastnameInput.reportValidity();
                }
                this.modelLastName = value;
            }
        },

        firstName: {
            get() {
                return this.modelFirstName;
            },
            set(value) {
                // check validation requirements
                if (value.length > 100) {
                    this.$refs.firstnameInput.setCustomValidity('Le prénom ne peut comporter que 100 caractères maximum.');
                    this.$refs.firstnameFeedback.innerHTML = 'Le prénom ne peut comporter que 100 caractères maximum.';
                    this.$refs.firstnameInput.reportValidity();
                } else if (!value) {
                    this.$refs.firstnameInput.setCustomValidity('Le prénom ne peut pas être vide.');
                    this.$refs.firstnameFeedback.innerHTML = 'Le prénom ne peut pas être vide.';
                    this.$refs.firstnameInput.reportValidity();
                } else {
                    this.$refs.firstnameInput.setCustomValidity('');
                    this.$refs.firstnameInput.reportValidity();
                }
                this.modelFirstName = value;
            }
        },

        phone: {
            get() {
                return this.modelPhone;
            },
            set(value) {
                const regexp = new RegExp('^0[1-9][0-9]{8}$');

                if (!regexp.test(value)) {
                    this.$refs.phoneInput.setCustomValidity('Le téléphone n\'est pas au bon format.');
                    this.$refs.phoneFeedback.innerHTML = 'Le téléphone n\'est pas au bon format.';
                    this.$refs.phoneInput.reportValidity();
                } else if (!value) {
                    this.$refs.phoneInput.setCustomValidity('Le téléphone ne peut pas être vide.');
                    this.$refs.phoneFeedback.innerHTML = 'Le téléphone ne peut pas être vide.';
                    this.$refs.phoneInput.reportValidity();
                } else {
                    this.$refs.phoneInput.setCustomValidity('');
                    this.$refs.phoneInput.reportValidity();
                }

                this.modelPhone = value;
            }
        },

        address: {
            get() {
                return this.modelAddress;
            },
            set(value) {
                // check validation requirements
                if (value.length > 100) {
                    this.$refs.addressInput.setCustomValidity('L\'adresse ne peut comporter que 100 caractères maximum.');
                    this.$refs.addressFeedback.innerHTML = 'L\'adresse ne peut comporter que 100 caractères maximum.';
                    this.$refs.addressInput.reportValidity();
                } else if (!value) {
                    this.$refs.addressInput.setCustomValidity('L\'adresse ne peut pas être vide.');
                    this.$refs.addressFeedback.innerHTML = 'L\'adresse ne peut pas être vide.';
                    this.$refs.addressInput.reportValidity();
                } else {
                    this.$refs.addressInput.setCustomValidity('');
                    this.$refs.addressInput.reportValidity();
                }
                this.modelAddress = value;
            }
        },
        
        pc: {
            get() {
                return this.modelPc;
            },
            set(value) {
                const regexp = new RegExp('^[0-9]{5}$');

                if (!regexp.test(value)) {
                    this.$refs.pcInput.setCustomValidity('Le code postal n\'est pas au bon format.');
                    this.$refs.pcFeedback.innerHTML = 'Le code postal n\'est pas au bon format.';
                    this.$refs.pcInput.reportValidity();
                } else if (!value) {
                    this.$refs.pcInput.setCustomValidity('Le code postal ne peut pas être vide.');
                    this.$refs.pcFeedback.innerHTML = 'Le code postal ne peut pas être vide.';
                    this.$refs.pcInput.reportValidity();
                } else {
                    this.$refs.pcInput.setCustomValidity('');
                    this.$refs.pcInput.reportValidity();
                }

                this.modelPc = value;
            }
        },

        city: {
            get() {
                return this.modelCity;
            },
            set(value) {

                if (value.length > 45) {
                    this.$refs.cityInput.setCustomValidity('La ville ne peut comporter que 45 caractères maximum.');
                    this.$refs.cityFeedback.innerHTML = 'La ville ne peut comporter que 45 caractères maximum.';
                    this.$refs.cityInput.reportValidity();
                } else if (!value) {
                    this.$refs.cityInput.setCustomValidity('La ville ne peut pas être vide.');
                    this.$refs.cityFeedback.innerHTML = 'La ville ne peut pas être vide.';
                    this.$refs.cityInput.reportValidity();
                } else {
                    this.$refs.cityInput.setCustomValidity('');
                    this.$refs.cityInput.reportValidity();
                }

                this.modelCity = value;
            }
        },
    },

    watch: {
        user: function() {
                this.modelLastName = this.user.lastname;
                this.modelFirstName = this.user.firstname;
                this.modelAddress = this.user.address;
                this.modelPc = this.user.pc;
                this.modelCity = this.user.city;
                this.modelPhone = this.user.phone;
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

                this.$store.dispatch("editUser", 
                    {id: this.user.id, 
                    body: {'lastname': this.lastName,
                            'firstname': this.firstName,
                            'email': this.email,
                            'phone': this.phone,
                            'address': this.address,
                            'pc': this.pc,
                            'city': this.city,
                }});

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
        }
    }
}
</script>

<style lang="scss" scoped>
</style>