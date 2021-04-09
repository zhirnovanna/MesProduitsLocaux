<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form @submit.prevent="submit">
          <h1 class="h3 mb-3 font-weight-normal">Création de votre compte</h1>

          <div class="form-group">
            <label for="firstname">Votre prénom</label>
            <input type="text" v-model="form.firstname" class="form-control" name="first_name" placeholder="ex: Paul " required>
          </div>


          <div class="form-group">
            <label for="lastname">Votre nom</label>
            <input type="text" v-model="form.lastname" class="form-control" name="last_name" placeholder="ex: Dupont" required>
          </div>
          <div class="form-group">
            <label for="email">Votre email</label>
            <input type="email" v-model="form.email" class="form-control" name="email" placeholder="ex: paul@gmail.com" required>
          </div>
           <div class="form-group">
            <label for="city">Votre ville </label>
            <input type="text" v-model="form.city" class="form-control" name="city" placeholder="ex: Paris" required>
          </div>            
          <div class="form-group">
            <label for="pc">Code Postal</label>
            <input type="number" v-model="form.pc" class="form-control" name="pc" placeholder="ex: 75000" required>
          </div> 
          <div class="form-group">
            <label for="address">Adresse</label>
            <input type="text" v-model="form.address" class="form-control" name="address" placeholder="ex: 1 rue La Fayette" required>
          </div> 
          <div class="form-group">
            <label for="phone">Numéro de téléphone</label>
            <input type="number" v-model="form.phone" class="form-control" name="phone" placeholder="ex: 06123456" required>
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" v-model="form.password" class="form-control" name="password" placeholder="ex:mesproduitslocaux" required>
          </div>

          <button type="submit" class="btn btn-lg btn-custom-primary btn-block">Valider</button>
        </form>
      </div>
    </div>
  </div>

</template>


<script>

    import { mapActions } from 'vuex'

    export default{
        name: "SignUp",
        data(){
            return {
              has_error : false,
              errors: [],
              form : {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                admin: '0',
                address: '',
                pc: '',
                city: '',
                phone: ''
            }}
        },
      methods: {
      ...mapActions({
        signUp: 'auth/signUp',
        async submit() {
        await this.signUp(this.form);
        this.$router.push("/dashboard");
        },
      }),
  }}
</script>