<template>
  <div class="my-4">
    <div class="map__region-name">Région selectionnée : {{ selectedRegion }}</div>
    <div class="pb-2 map">
        <svg preserveAspectRatio version="1.1" viewBox="0 0 612 585" class="map__image">
            <router-link v-for="region in regions" 
            v-bind:key="region.id" 
            v-bind:to="{ name: 'ProductsDisplay', params: { regionId: region.id } }"
            >
                <path v-bind:d="region.path"
                @mouseover="mouseOver($event, region.name)"
                @mouseleave="mouseLeave"
                class="map__image-path"/>
            </router-link>
        </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Map',

  data() {
    return {
      selectedRegion: ''
    }
  },

  computed: {
    regions() {
      return this.$store.state.regions;
    },
  },

  methods: {
      mouseOver(event, regionName){
        event.target.style.fill = '#6FAE1D';
        this.selectedRegion = regionName;
      },
      mouseLeave(event){
        event.target.style.fill = '#E7F8D2';
        this.selectedRegion = '';
      }
  },

  mounted() {
    this.$store.dispatch("getRegions");
  }
    
}
</script>

<style lang="scss" scoped>

.map {
  background-color: $white;
  margin: 2rem auto;

  /*&__region-name {
    color: $primary-color;
  }*/

  &__image {
    width: 100%;
    height: 25rem;

    &-path {
      fill: lighten($primary-color, 50%);
      stroke: $primary-color;
      stroke-width: 1px;
      transition: fill 0.3s;
    }
  }
}




</style>