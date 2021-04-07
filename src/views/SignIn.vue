<template>

  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <div class="alert alert-danger" v-if="has_error">
           <p>Erreur, impossible de se connecter avec ces identifiants.</p>
        </div>
        <form @submit.prevent="submit">
          <h1 class="h3 mb-3 font-weight-normal">Connectez-vous</h1>
            <div class="form-group">
              <label for="email">
                Email
              </label>

              <input type="text" class="form-control" name="email" placeholder="ex: mesproduitslocaux@yahoo.com" id="email" v-model="form.email">
            </div>

            <div class="form-group">
              <label for="password">
                Mot de passe
              </label>
              <input type="password" class="form-control" name="password" placeholder="ex: jaimemesproduitslocaux" id="password" v-model="form.password">
            </div>

            <div>
              <button class="btn btn-lg btn-custom-primary btn-block" type="submit">
                Valider
              </button>
            </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'

export default {
  name: 'SignIn',
  components: {
    //
  },
    data () {
      return {
        has_error: false,
        errors: [],
        form: {
          email: '',
          password: '',
        }
      }
    },
  methods: {
      ...mapActions({
        signIn: 'auth/signIn'
      }),
        submit(){
          this.signIn(this.form).then((res) => {
            if(res){
              this.has_error = true;
            }else{
              this.$router.replace({
                name: 'Dashboard'
              })}
          })
        }
  }
}
</script>
