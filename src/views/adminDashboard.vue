<template>
  <div class="my-4">
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Admin Dashboard</div>
            <div class="card-body">
                Bienvenue sur votre dashboard administrateur

                <div class="my-2">
                  <router-link :to="{ name: 'Administration'}" class="btn btn-custom-primary">Accès au CRUD</router-link>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      //
    }
  }
</script>