<template>
    <div class="container">
        <div class="py-5 block-notfound d-flex flex-column justify-content-center align-items-center">
            <div>
                <div class="display-2">404</div>
                <div class="h4 mb-4">La page demandée n'existe pas</div>
                <router-link class="btn btn-custom-secondary" to="/">Retour à l'accueil</router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'NotFound',
}

</script>

<style lang="scss">

.block-notfound {
    text-align: center;
    min-height: 90vh;
}

</style>