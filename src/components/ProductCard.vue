<template>
  <div>
    <div class="my-2 mx-auto">
      <div class="product-container">
        <div class="card product-card">
          <img @click="toggleModale" :src="product.image" class="card-img-top" alt="">
          <div class="stars">
          <fieldset class="rating-stars">
            <input type="radio" :id="'star5' + product.id" :name="'rating' + product.id" value="5" />
            <label class="full" :for="'star5' + product.id" title="Great"></label>

            <input type="radio" :id="'star4half' + product.id" :name="'rating' + product.id" value="4.5" />
            <label class="half" :for="'star4half' + product.id" title="Pretty good"></label>

            <input type="radio" :id="'star4' + product.id" :name="'rating' + product.id" value="4" />
            <label class="full" :for="'star4' + product.id" title="Pretty good"></label>

            <input type="radio" :id="'star3half' + product.id" :name="'rating' + product.id" value="3.5" />
            <label class="half" :for="'star3half' + product.id" title="Average"></label>

            <input type="radio" :id="'star3' + product.id" :name="'rating' + product.id" value="3" />
            <label class="full" :for="'star3' + product.id" title="Average"></label>

            <input type="radio" :id="'star2half' + product.id" :name="'rating' + product.id" value="2.5" />
            <label class="half" :for="'star2half' + product.id" title="Bad"></label>

            <input type="radio" :id="'star2' + product.id" :name="'rating' + product.id" value="2" />
            <label class="full" :for="'star2' + product.id" title="Bad"></label>

            <input type="radio" :id="'star1half' + product.id" :name="'rating' + product.id" value="1 and a half" />
            <label class="half" :for="'star1half' + product.id" title="Sucks"></label>

            <input type="radio" :id="'star1' + product.id" :name="'rating' + product.id" value="1" />
            <label class="full" :for="'star1' + product.id" title="Sucks"></label>

            <input type="radio" :id="'starhalf' + product.id" :name="'rating' + product.id" value="half" />
            <label class="half" :for="'starhalf' + product.id" title="Sucks"></label>
          </fieldset>
          </div>
          <div class="card-body">
              <h4 @click="toggleModale" class="card-title"> {{product.name}} </h4>
              <p class="card-text">{{product.price}} €</p>
              <div class="btn">
                  <div class="btn-detail">
                    <button @click="toggleModale" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Voir le détail">
                      <i class="bi bi-eye"></i>
                    </button>
                  </div>
                  <div class="btn-qtt">
                    <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Noter ce produit">
                      <i class="bi bi-heart"></i>
                    </button>
                  </div>
                  <div class="btn-like">
                    <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Quantité">
                      <i class="bi bi-hash"></i>
                    </button>
                  </div>
                  <div class="btn-cart">
                    <button @click="addToCart(1)" type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Ajouter au panier">
                      <i class="bi bi-basket3"></i>
                    </button>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>

    <ProductModale 
    @add-to-cart = 'addToCart'
    @toggleModale = "toggleModale"
    v-bind:revele="revele" 
    v-bind:product="product" />

  </div>
</template>

<script>
import ProductModale from './ProductModale.vue'
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: false
    }
  },
  data() {
    return{
      revele:false,
    }
  },
  components: {
    ProductModale
  },
  methods: {
    toggleModale: function(productId = null) {
      if (productId === null) {
        return;
      } else {
        this.revele = !this.revele;
      }
    },

    addToCart(quantityWanted) {
      this.$store.dispatch("addToCartFromShop", {'quantityWanted': quantityWanted, 
                                                'quantityAvailable': this.product.quantity,
                                                'productId': this.product.id,
                                                'productRegion': this.product.region_id});
    }
  },
}
</script>

<style scoped>
.my-2 {
  width: 250px;
}
.product-container {
  padding: 15px 10px;
}
.product-card {
  text-align: center;
  display: block;
  overflow: hidden;
  position: relative;
  border: 1px solid #eee;
  transition: all 0.5s;
}
img {
  overflow: hidden;
  position: relative;
}

.card-img-top {
  height: 200px;
  max-height: 200px;
  object-fit: contain;
  cursor: pointer;
}
.card-body {
  margin: 0 12px 15px;
  padding: 8px 0 0;
  border-top: 1px solid #eee;
  text-align: center;
}
h4 {
  font-size: 15px;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 1.1;
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
  letter-spacing: 0.5px;
}
.card-text {
  color: #6fae1d;
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 10px;
  transition: all 0.4s;
}
.btn{
  display: flex;                  /* establish flex container */
  flex-direction: row;            /* default value; can be omitted */
  flex-wrap: nowrap;              /* default value; can be omitted */
  justify-content: space-between; /* switched from default (flex-start, see below) */
  margin-left: 18px;
  width: 170px;
  height: 36px;
  border-radius: 50px;
  border: none;
  box-shadow: 0 0px 4px 1px rgba(0, 0, 0, 0.1);
}
.btn-detail {
  margin-left: 45px;
  margin-right: 15px;
  margin-top: 6px;
  margin-bottom: 8px;
  width: 1px;
  background: #e5e5e5;
}
.btn-qtt, .btn-like, .btn-cart {
  margin-left: 20px;
  margin-right: 15px;
  margin-top: 6px;
  margin-bottom: 8px;
  width: 1px;
  background: #e5e5e5;
}
.btn-cart {
  margin-left: 20px;
  width: 1px;
  background: #ffffff;
}
.btn-secondary {
  border: 0;
  box-shadow: none;
  padding: 0;
  transition: all 0.5s;
  background: transparent;
  color: rgb(128, 128, 128);
  text-decoration: none;
  display: none;
  overflow: hidden;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin-left: -32px;
}
.btn-secondary:hover {
  color:#6fae1d;
}
.stars {
display: inline-block;
}
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
* {
  margin: 0;
  padding: 0;
  border: 0;
}
body {
  margin: 10%;
}
.rating-stars {
  float: left;
  clear: both;
}
.rating-stars > input {
  display: none;
}
.rating-stars > label:before {
  font-family: FontAwesome;
  font-size: 1em;
  content: "\f005";
  margin: 0 3px;
}
.rating-stars > .half:before {
  content: "\f089";
  position: absolute;
}
.rating-stars > label {
  color: gainsboro;
  float: right;
}
.rating-stars > input:checked + label:hover,
.rating-stars > input:checked ~ label:hover,
.rating-stars > label:hover ~ input:checked ~ label,
.rating-stars > input:checked ~ label:hover ~ label {
  color: #ffd400;
}
.rating-stars > input:checked ~ label,
.rating-stars:not(:checked) > label:hover,
.rating-stars:not(:checked) > label:hover ~ label {
  color: #ffe100;
}
</style>
