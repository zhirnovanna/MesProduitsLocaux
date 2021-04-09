<template>
<div class="body">
    <div class="quickview">
        <div class="content">
            <div class="bloc-modale" v-if="revele">
                <div class="overlay" v-on:click="$emit('toggleModale', product.id)"></div>
                    <div class="modale card">
                        <div v-on:click="$emit('toggleModale', product.id)" class="btn-modale btn btn-danger">X</div>
                        <div class="parent">
                            <div class="col-md-6 col-sm-6 col-xs-12 product-left">
                                <div class="thumb">
                                    <img :src="product.image" class="card-img-top block-modal__image" alt="">
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-12 product-right">
                                <div class="infos">
                                    <h2 class="title">{{product.name}}</h2>
                                    <div class="stars">
                                    <fieldset class="rating-stars">

                                    <input type="radio" id="star5" name="rating" value="5" />
                                    <label class="full" for="star5" title="Great"></label>

                                    <input type="radio" id="star4half" name="rating" value="4.5" />
                                    <label class="half" for="star4half" title="Pretty good"></label>

                                    <input type="radio" id="star4" name="rating" value="4" />
                                    <label class="full" for="star4" title="Pretty good"></label>

                                    <input type="radio" id="star3half" name="rating" value="3.5" />
                                    <label class="half" for="star3half" title="Average"></label>

                                    <input type="radio" id="star3" name="rating" value="3" />
                                    <label class="full" for="star3" title="Average"></label>

                                    <input type="radio" id="star2half" name="rating" value="2.5" />
                                    <label class="half" for="star2half" title="Bad"></label>

                                    <input type="radio" id="star2" name="rating" value="2" />
                                    <label class="full" for="star2" title="Bad"></label>

                                    <input type="radio" id="star1half" name="rating" value="1 and a half" />
                                    <label class="half" for="star1half" title="Sucks"></label>

                                    <input type="radio" id="star1" name="rating" value="1" />
                                    <label class="full" for="star1" title="Sucks"></label>

                                    <input type="radio" id="starhalf" name="rating" value="half" />
                                    <label class="half" for="starhalf" title="Sucks"></label>
                                    </fieldset>
                                    </div>
                                    <br>

                                    <ul class="blocks">
                                        <li class="category_name"><span>CATÉGORIE</span><a>{{product.category_name}}</a></li>
                                        <li class="region_name"><span>RÉGION</span><a>{{product.region_name}}</a></li>
                                        <li class="dispo"><span>Disponibilité</span><a>{{product.quantity === 0 ? 'Épuisé' : 'En stock'}}</a></li>
                                        <li class="quantity"><span>Quantité</span><a>{{product.quantity}}</a></li>

                                    </ul>
                                    <div class="blocks2">
                                        <div class="description">{{product.description}}</div>
                                        <div class="price">{{product.price}} €</div>
                                    </div>
                                    <div class="blocks3">
                                        <label class="control-label" for="input-quantity">Qty</label>
                                        <input type="number" name="quantity" id="input-quantity" min="1" :max="product.quantity" class="form-control" v-model.number="quantityWanted">
                                        <button @click="addToCartModal" type="button" id="button-cartqv" data-loading-text="Loading..." class="btn btn-primary btn-lg btn-block">Ajouter au panier</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'ProductModale',
    props: ['revele', 'toggleModale', 'product'],
    data() {
        return {
            quantityWanted: 1,
        }
    },
    methods: {
        addToCartModal() {
            this.$emit('add-to-cart', this.quantityWanted);
        }
    }
}
</script>

<style lang="scss" scoped>
.bloc-modale {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.modale {
    overflow-y: scroll;
    background: #ffffff;
    color: #333;
    padding: 30px;
    position: fixed;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.5px;

    width: 100%;
    height: 100%;
    overflow-y: scroll;

    @media screen and (min-width: #{$phone}) {
        height: auto;
        width: auto;
        max-width: 80%;
        max-height: 90%;
    }
}
.btn-modale {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: rgb(128, 128, 128);
}
.btn-modale:hover {
    color: #6fae1d;
}
.parent {
    position: relative;
}
.product-left {
    float: left;
    border: 1px solid #eee;
    border-radius: 0;
    padding: 0;
    line-height: 1.42857143;
    background-color: #fff;
}
.product-right {
    float: right;
}
.title {
    font-weight: 600;
    text-align: left;
    padding: 0 0 5px;
    font-size: 21px;
    color: #333;
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 3px;
    font-family: inherit;
    line-height: 1.1;
}
/*----------------étoiles--------------------*/
.stars {
    margin: 0 0 20px 15px;
    clear: both;
    color: #888;
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
/*-------------------------------------------------*/
.blocks {
    border-bottom: 1px solid rgb(228, 228, 228);
    border-top: 1px solid rgb(228, 228, 228);
    padding: 20px 0;
    margin: 0 0 20px 15px;
    display: block;
    overflow: hidden;
    text-align: center;
    list-style: none;
}
.category_name {
    line-height: 28px;
    font-size: 14px;
    color: rgb(92, 92, 92);
    width: 47%;
    padding: 5px 5px 0;
    float: left;
    border: 1px solid rgb(228, 228, 228);
    margin-right: 10px;
    margin-bottom: 15px;
    text-align: center;
}
.region_name {
    line-height: 28px;
    font-size: 14px;
    color: rgb(92, 92, 92);
    width: 47%;
    padding: 5px 5px 0;
    float: left;
    border: 1px solid rgb(228, 228, 228);
    margin-bottom: 15px;
    text-align: center;
}
.dispo {
    line-height: 28px;
    font-size: 14px;
    color: rgb(92, 92, 92);
    width: 47%;
    padding: 5px 5px 0;
    float: left;
    border: 1px solid rgb(228, 228, 228);
    margin-right: 10px;
    text-align: center;
}
.quantity {
    line-height: 28px;
    font-size: 14px;
    color: rgb(92, 92, 92);
    width: 47%;
    padding: 5px 5px 0;
    float: left;
    border: 1px solid rgb(228, 228, 228);
    text-align: center;
}
span {
    font-weight: 400;
    font-size: 13px;
    display: block;
    text-transform: uppercase;
    background: #e6e6e6;
    padding: 0;
}
a {
text-decoration: none;
background-color: transparent;
}
/*-------------------------------------------------*/
.description {
    margin-left: 15px;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
}
.price {
    border-bottom: 1px solid rgb(228, 228, 228);
    padding-bottom: 15px;
    color: #000;
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
    margin-top: 10px;
    margin-bottom: 15px;
    margin-left: 20px;
    font-family: inherit;
    text-align: left;
}
/*-------------------------------------------------*/
.blocks3 {
    margin-bottom: 20px;
    margin-left: 20px;
    overflow: hidden;
    position: relative;
    clear: both;
}
.control-label {
    margin: 8px 8px 8px 0;
    float: left;
    font-size: 14px;
    font-weight: 400;
    color: #888;
    max-width: 100%;
}
#input-quantity {
    width: 3.5rem;
    margin-right: 6px;
    margin-bottom: 5px;
    float: left;
    height: 37px;
    text-align: center;
    color: #999;
    opacity: 1;
    line-height: 20px;
    font-size: 12px;
    box-shadow: none;
    border-radius: 0;
    border-color: #e9e9e9;
    transition: all 0.5s;
    padding: 0.25rem;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    font-family: inherit;
}
 #button-cartqv {
    width: auto;
    display: inline-block;
    vertical-align: middle;
    opacity: 1;
    font-size: 14px;
    font-weight: 400;
    padding: 10px 20px;
    text-transform: uppercase;
    border-radius: 0;
    transition: all 0.5s;
    color: #fff;
    background-color: #6fae1d;
    border: 1px solid #6fae1d;
    outline: none;
    line-height: 18px;
    margin-bottom: 0;
    margin-left: 0px;
    text-align: center;
    white-space: nowrap;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    font-family: inherit;
    overflow: visible;
 }
#button-cartqv:hover {
    background-color:#588b15;
}

.block-modal__image {
    @media screen and (min-width: #{$phone}) {
        max-height: 80vh;
    }
}
</style>