<template>
  <div class="p-4 modal-window">
    <UserCRUDForm 
        @user-submission='submitUser'
        @closeModal='close'
        @update:modelEmail = 'updateEmail'
        @update:modelIsAdmin = 'updateIsAdmin'
        v-bind:modelId="userId"
        v-bind:modelLastName="lastName"
        v-bind:modelFirstName="firstName"
        v-bind:modelAddress="address"
        v-bind:modelPc="pc"
        v-bind:modelCity="city"
        v-bind:modelEmail="email"
        v-bind:modelPhone="phone"
        v-bind:modelIsAdmin="isAdmin"
    />
  </div>
</template>

<script>

// @ is an alias to /src
import UserCRUDForm from '@/components/Administration/UserCRUDForm.vue'

export default {
  name: 'ProductAdministration',
  components: {
      UserCRUDForm
  },

  data() {
    return {
      id: null,
      lastName: null,
      firstName: null,
      address: null,
      pc: null,
      city: null,
      email: null,
      phone: null,
      isAdmin: 0
    }
  },

  computed: {
    userId() {
      return this.$route.params.id;
    },

    user() {
      if(this.userId) {
        return this.$store.state.crud.userToUpdate;
      } else {
        return null;
      }
    },

    usersEmails() {
      return this.$store.state.crud.takenUserEmails;
    },

    takenUsersEmails() {
      if(this.userId) {
        // in case of user update remove current name from taken user names array so the form validation does not check it against itself
        return this.usersEmails.filter((userEmail) => userEmail !== this.user.email);
      } else {
        return this.usersEmails;
      }
    }
  },

  watch: {
    user: function() {
      if(this.userId) {
        this.id = this.userId;
        this.lastName = this.user.lastname;
        this.firstName = this.user.firstname;
        this.address = this.user.address;
        this.pc = this.user.pc;
        this.city = this.user.city;
        this.email = this.user.email;
        this.phone = this.user.phone;
        this.isAdmin = this.user.admin;
      }
    }
  },

  mounted() {
    this.$store.dispatch("getUsers");
    this.$store.dispatch("getTakenUserEmails");

    // in case of an update get the info of the user to update
    if(this.userId) {
      this.$store.dispatch("getUser", this.userId);
    }
  },

  methods: {
    close() {
      this.$router.push({ name: 'UsersAdministration' });
    },

    submitUser(form) {
      // add was validated class to form if not already there to make validation feedback style appear
      if(!form.classList.contains('was-validated')) {
        form.classList.add('was-validated');
      }

      // if all validation criteria passed send request to API and redirect to products management page
      if(form.checkValidity() === true) {
        if(this.userId) {
          this.$store.dispatch("editUser", 
            {id: this.userId, 
            body: {'email': this.email, 
              'admin' : this.isAdmin,
          }});

        }
        this.$router.push({ name: 'UsersAdministration' });
      }
    },

    updateEmail(value, inputElement, feedbackMessageElement) {
      // check validation requirements
      if(this.takenUsersEmails.includes(value)) {
        inputElement.setCustomValidity('Cet email est déjà utilisé.');
        feedbackMessageElement.innerHTML = 'Cet email est déjà utilisé.';
        inputElement.reportValidity();
      } else if (inputElement.validity.typeMismatch) {
        inputElement.setCustomValidity('Le format n\'est pa valide. Veuillez entrer un email.');
        feedbackMessageElement.innerHTML = 'Le format n\'est pa valide. Veuillez entrer un email.';
        inputElement.reportValidity();
      } else if (value.length > 100) {
        inputElement.setCustomValidity('L\'email doit comporter 100 caractères maximum.');
        feedbackMessageElement.innerHTML = 'L\'email doit comporter 100 caractères maximum.';
        inputElement.reportValidity();
      } else {
        inputElement.setCustomValidity('');
        inputElement.reportValidity();
      }
      
      // set new value
      this.name = value;
    },

    updateIsAdmin(value, element, feedbackMessageElement) {
      // check validation requirements
      if (value != 1 && value != 0) {
        element.setCustomValidity('Le statut n\'est pas valide.');
        feedbackMessageElement.innerHTML = 'Le statut n\'est pas valide.';
        element.reportValidity();
      } else {
        element.setCustomValidity('');
        element.reportValidity();
      }

      // set new value
      this.isAdmin = value;
    },

  }
}
</script>

<style lang="scss" scoped>
</style>