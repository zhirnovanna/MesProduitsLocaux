<template>
<div class="owl-item active" style="width: 234px;">
    <div :key="index" v-for="(name, index) in name" class="item product-container" data-countdowntime=""> 
        <div class="product-thumb">
          <div class="image">
            <a href="http://demo.ishitechnolabs.com/OPC019/index.php?route=product/product&amp;product_id=28">
              <img src="../assets/10-370x370.jpg" alt="Oignon" title="Oignon" class="img-responsive">
            </a>
          </div>

          <div class="caption">
            <h4><a href="http://demo.ishitechnolabs.com/OPC019/index.php?route=product/product&amp;product_id=28">{{name.name}}</a></h4>
            <p class="price">0,5€</p>

            <div class="button-group">

                <div class="btn-quickview"> 
                  <div class="quickview-button button" data-toggle="tooltip" title="" data-original-title="Quick View"> 
                    <a class="quickbox" href="http://demo.ishitechnolabs.com/OPC019/index.php?route=product/quick_view&amp;product_id=28">
                      <i class="bi bi-eye"></i>
                    </a>
                  </div>
                </div>

                <div class="btn-wishlist">
                  <button type="button" data-toggle="tooltip" title="" onclick="wishlist.add('28');" data-original-title="Add to Wish List">
                    <i class="bi bi-heart"></i>
                  </button>
                </div>

                <div class="btn-compare">  
                  <button type="button" data-toggle="tooltip" title="" onclick="compare.add('28');" data-original-title="Compare this Product">
                    <i class="bi bi-hash"></i>
                  </button>
                </div>

                <div class="btn-cart">
                  <button data-toggle="tooltip" title="" onclick="cart.add('28');" data-original-title="Add to Cart" aria-describedby="">
                      <i class="bi bi-basket3"></i>
                      <span class="lblcart"></span>
                  </button>
                </div>
            </div>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'Product',
    data()
    {
        return {
            Product:[],
        };
    },
    mounted() {
        this.getProduct();
    },
    methods: {
        getProduct() {
            Axios.get('http://127.0.0.1:8000/api/products',).then((response) => {
                this.formatProduct(response.data);
            });
        },
        formatProduct(posts) {
            for(let key in posts) {
                this.Product.push({...posts[key], id: key});
            }
            console.log(this.Product);
        },
    },
};
</script>

<style scoped>
.owl-item {
    user-select: none;
    width: 234px;
    min-height: 1px;
float: left;
position: relative;
outline: 0 !important;
box-sizing: border-box;
font-family: 'Lato', sans-serif;
font-weight: 400;
color: #232323;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.5px;
}

.product-container {
    padding: 15px 10px;
    outline: 0 !important;
    box-sizing: border-box;
    text-align: center;
    font-family: 'Lato', sans-serif;
font-weight: 400;
color: #232323;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.5px;
}

.product-thumb {
    text-align: center;
    display: block;
    overflow: hidden;
    position: relative;
    border: 1px solid #eee;
    transition: all 0.5s;
    outline: 0 !important;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
font-weight: 400;
color: #232323;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.5px;
}

.image {
    overflow: hidden;
    position: relative;
    outline: 0 !important;
    box-sizing: border-box;
    text-align: center;
    font-family: 'Lato', sans-serif;
font-weight: 400;
color: #232323;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.5px;
}

a {
    color: #000;
text-decoration: none;
background-color: transparent;
outline: 0 !important;
box-sizing: border-box;
font-family: 'Lato', sans-serif;
font-weight: 400;
color: #232323;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.5px;
}

.image img {
    margin: 0 auto;
    max-width: 100%;
    width: 100%;
    transition: all 0.7s ease 0s;
    display: block;
border: 0;
outline: 0 !important;
box-sizing: border-box;
}

.product-thumb .image .product-img-extra {
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    transform: scale(0, 1);
}

.rating {
    position: absolute;
    left: 0;
    right: 0;
    top: auto;
    bottom: 10px;
    text-align: center;
    margin: 0 auto;
    transition: all 0.5s;
    outline: 0 !important;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
font-weight: 400;
color: #232323;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.5px;
}

span.fa-stack {
    width: 8px;
    height: 8px;
    margin-right: 3px;
    position: relative;
display: inline-block;
line-height: 2em;
vertical-align: middle;
font: normal normal normal 14px/1 FontAwesome;
    font-size: 14px;
    line-height: 1;
font-size: inherit;
text-rendering: auto;
outline: 0 !important;
text-align: center;
color: #232323;
letter-spacing: 0.5px;
}

.yellow {
    color: #fec42d;
    font-size: 13px;
line-height: 0;
position: absolute;
left: 0;
width: 100%;
text-align: center;
display: inline-block;
font: normal normal normal 14px/1 FontAwesome;
    font-size: 14px;
    line-height: 1;
text-rendering: auto;
outline: 0 !important;
box-sizing: border-box;
letter-spacing: 0.5px;
}

.caption {
    margin: 0 12px 15px;
    padding: 8px 0 0;
    border-top: 1px solid #eee;
    text-align: center;
    outline: 0 !important;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
font-weight: 400;
color: #232323;
font-size: 14px;
line-height: 18px;
letter-spacing: 0.5px;
}

.caption h4 {
    overflow: hidden;
    margin: 0;
        margin-bottom: 0px;
    margin-bottom: 8px;
    font-size: 15px;
    color: #333;
    font-family: inherit;
font-weight: 500;
line-height: 1.1;
outline: 0 !important;
box-sizing: border-box;
letter-spacing: 0.5px;
}

.caption h4 a {
    color: #000;
    white-space: nowrap;
    text-transform: capitalize;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 18px;
    margin: 0;
        margin-bottom: 0px;
    margin-bottom: 10px;
    font-family: 'Lato', sans-serif;
    text-decoration: none;
    background-color: transparent;
    outline: 0 !important;
    box-sizing: border-box;
}

.price {
    color: #6fae1d;
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 13px;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
    outline: 0 !important;
    box-sizing: border-box;
    line-height: 18px;
letter-spacing: 0.5px;
}

p {
    margin: 0 0 10px;
        margin-bottom: 10px;
        outline: 0 !important;
        box-sizing: border-box;
        line-height: 18px;
letter-spacing: 0.5px;
}

.price-tax {
    color: #999;
    font-size: 12px;
    display: none;
    outline: 0 !important;
    box-sizing: border-box;
}

.button-group {
    text-align: center;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    position: relative;
    box-shadow: 0 0px 4px 1px rgba(0, 0, 0, 0.1);
    padding: 7px 50px;
    border-radius: 50px;
}

.product-thumb .button-group .btn-quickview::after, .product-thumb .button-group .btn-cart::after, .product-thumb .button-group .btn-wishlist::after, .product-thumb .button-group .btn-compare::after {
    content: "";
    position: absolute;
    right: -2px;
    top: -2px;
    height: 20px;
    width: 1px;
    background: #e5e5e5;
}

.product-thumb .button-group .btn-quickview, .product-thumb .button-group .btn-cart, .product-thumb .button-group .btn-wishlist, .product-thumb .button-group .btn-compare {
    position: relative;
}

.product-thumb .button-group > div {
    border: none;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    line-height: 0;
    text-align: center;
}

a[data-v-3cf4ef6f] {
    color: #6d6d6d;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.5px;
    margin-left: -50px;
}

a:hover {
    color: #6fae1d;
}

.btn-cart {
    position: relative;
}

.product-thumb .button-group .btn-quickview .quickbox, .product-thumb .button-group .btn-cart .quickbox, .product-thumb .button-group .btn-wishlist .quickbox, .product-thumb .button-group .btn-compare .quickbox, .product-thumb .button-group .btn-quickview button, .product-thumb .button-group .btn-cart button, .product-thumb .button-group .btn-wishlist button, .product-thumb .button-group .btn-compare button {
    border: 0;
    box-shadow: none;
    padding: 0;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    background: transparent;
}

</style>
