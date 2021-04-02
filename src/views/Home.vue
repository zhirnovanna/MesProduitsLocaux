<template>
  <div class="container">
    <div class="mt-5 mb-4">

        <div class="block-map my-3">
          <h4 class="block-map__title">Choisissez votre région</h4>
          <div class="d-flex flex-column my-2">
          <router-link to="/region/1">Grand Est</router-link>
          <router-link to="/region/8">Corse</router-link>
          <router-link to="/region/11">Hauts de France</router-link>
          </div>
        </div>

        <div class="py-2 d-flex block-infos">
          <div class="d-flex flex-column align-items-center block-infos__item">
            <i class="bi bi-truck block-infos__icon"></i>
            <div class="h6 block-infos__title">Livraison gratuite à partir de 50€</div>
          </div>
          <div class="d-flex flex-column align-items-center block-infos__item">
            <i class="bi bi-wallet2 block-infos__icon"></i>
            <div class="h6 block-infos__title">Satisfait ou remboursé</div>
          </div>
          <div class="d-flex flex-column align-items-center block-infos__item">
            <i class="bi bi-globe2 block-infos__icon"></i>
            <div class="h6 block-infos__title">Service client en ligne</div>
          </div>
          <div class="d-flex flex-column align-items-center block-infos__item">
            <i class="bi bi-flower1 block-infos__icon"></i>
            <div class="h6 block-infos__title">Produits bio et locaux</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss" scoped>

.block-map {

  &__title {
    color: $primary-color;
  }
}

.block-infos {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media screen and (min-width: #{$phone}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__item {
    cursor: pointer;
    margin-bottom: 0.5rem;
    text-align: center;

    @media screen and (min-width: #{$phone}) {
      margin-bottom: 0;
    }

    &:hover .block-infos__icon{
      color: lighten($grey, 20%);
      transform: translateY(-0.5rem);
    }

    &:hover .block-infos__title{
      color: lighten($grey, 20%);
    }
  }

  &__icon {
    font-size: 2.5rem;
    color: $primary-color;
    transition: all 300ms ease-out;
    margin-bottom: 0.3rem;

    @media screen and (min-width: #{$phone}) {
      font-size: 3rem;
    }
  }

    &__title {
    color: inherit;
    transition: all 300ms ease-out;
  }
}
</style>
