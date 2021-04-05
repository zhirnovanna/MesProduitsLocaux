<template>
<!--<div class="body">
    <div class="quickview">
        <div class="content">
            <div class="bloc-modale" v-if="revele">
                <div class="overlay" v-on:click="toggleModale"></div>
                    <div class="modale card">
                        <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
                        <div class="col-md-6 col-sm-6 col-xs-12 product-left">
<div class="container">
    <div class="row">
        <div class="col-md-5">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img :src="product.image" class="d-block w-100" alt="">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div class="col-md-7">
            <p class="newarrival text-center">New Arrival</p>
            <h2>Men</h2>
            <p>Product code</p>
            <p class="price">{{product.price}}€</p>
            <p><b>Avalalbility:</b> In stock</p>
            <p><b>ACondition</b> New</p>
            <p><b>Brand:</b> Nike</p>
            <label>Quantity</label>
            <input type="text" value="1">
            <button type="button" class="btn btn-default cart">Ajouter au panier</button>
        </div>
    </div>
</div>
                    </div>
            </div>
        </div>
    </div>
</div>
</div>-->

<div class="body">
    <div class="quickview">
        <div class="content">
            <div class="bloc-modale" v-if="revele">
                <div class="overlay" v-on:click="toggleModale"></div>
                    <div class="modale card">
                        <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
                        <div class="parent">
                            <div class="col-md-6 col-sm-6 col-xs-12 product-left">
                                <div class="thumb">
                                    <img :src="product.image" class="card-img-top" alt="">
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
                                        <li class="dispo"><span>Disponibilité</span><a>En stock</a></li>
                                        <li class="quantity"><span>Quantité</span><a>{{product.quantity}}</a></li>

                                    </ul>
                                    <div class="blocks2">
                                        <div class="description">{{product.description}}</div>
                                        <div class="price">{{product.price}} €</div>
                                    </div>
                                    <div class="blocks3">
                                        <label class="control-label" for="input-quantity">Qty</label>
                                        <input type="text" name="quantity" value="1" size="2" id="input-quantity" class="form-control">
                                        <button type="button" id="button-cartqv" data-loading-text="Loading..." class="btn btn-primary btn-lg btn-block">Ajouter au panier</button>
                                    </div>
                                    <!--<div class="social">
                                        <div class="addthis_toolbox addthis_default_style" data-url="http://demo.ishitechnolabs.com/OPC019/index.php?route=product/product&amp;product_id=36">
                                        <a class="addthis_button_facebook_like at300b" fb:like:layout="button_count"><div class="fb-like fb_iframe_widget" style="height: 25px;" data-layout="button_count" data-show_faces="false" data-share="false" data-action="like" data-width="90" data-height="25" data-font="arial" data-href="http://demo.ishitechnolabs.com/OPC019/index.php?route=product/quick_view&amp;product_id=36" data-send="false" fb-xfbml-state="rendered" fb-iframe-plugin-query="action=like&amp;app_id=172525162793917&amp;container_width=0&amp;font=arial&amp;height=25&amp;href=http%3A%2F%2Fdemo.ishitechnolabs.com%2FOPC019%2Findex.php%3Froute%3Dproduct%2Fquick_view%26product_id%3D36&amp;layout=button_count&amp;locale=en_US&amp;sdk=joey&amp;send=false&amp;share=false&amp;show_faces=false&amp;width=90"><span style="vertical-align: bottom; width: 90px; height: 28px;"><iframe name="f192abaf0c76388" data-testid="fb:like Facebook Social Plugin" title="fb:like Facebook Social Plugin" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" style="border: medium none; visibility: visible; width: 90px; height: 28px;" src="https://www.facebook.com/v2.6/plugins/like.php?action=like&amp;app_id=172525162793917&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df2d0a03ce3a4ea%26domain%3Ddemo.ishitechnolabs.com%26origin%3Dhttp%253A%252F%252Fdemo.ishitechnolabs.com%252Ff59d936396c02c%26relation%3Dparent.parent&amp;container_width=0&amp;font=arial&amp;height=25&amp;href=http%3A%2F%2Fdemo.ishitechnolabs.com%2FOPC019%2Findex.php%3Froute%3Dproduct%2Fquick_view%26product_id%3D36&amp;layout=button_count&amp;locale=en_US&amp;sdk=joey&amp;send=false&amp;share=false&amp;show_faces=false&amp;width=90" class="" width="90px" height="25px" frameborder="0"></iframe></span></div></a>
                                        <a class="addthis_button_tweet at300b"><div class="tweet_iframe_widget" style="width: 62px; height: 25px;"><span><iframe id="twitter-widget-0" scrolling="no" allowtransparency="true" allowfullscreen="true" class="twitter-share-button twitter-share-button-rendered twitter-tweet-button" style="position: static; visibility: visible; width: 60px; height: 20px;" title="Twitter Tweet Button" src="https://platform.twitter.com/widgets/tweet_button.0edc1ef9f8b82d9b79c6115bda79f63f.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;original_referer=http%3A%2F%2Fdemo.ishitechnolabs.com%2FOPC019%2Findex.php%3Froute%3Dproduct%2Fquick_view%26product_id%3D36&amp;size=m&amp;text=%3A&amp;time=1617615868947&amp;type=share&amp;url=http%3A%2F%2Fdemo.ishitechnolabs.com%2FOPC019%2Findex.php%3Froute%3Dproduct%2Fquick_view%26product_id%3D36%23.YGrb_IhBtQI.twitter" data-url="http://demo.ishitechnolabs.com/OPC019/index.php?route=product/quick_view&amp;product_id=36#.YGrb_IhBtQI.twitter" frameborder="0"></iframe></span></div></a>
                                        <a class="addthis_button_pinterest_pinit at300b"></a>
                                        <a class="addthis_counter addthis_pill_style" style="display: inline-block;" href="#"><a class="atc_s addthis_button_compact">Share<span></span></a><a class="addthis_button_expanded" target="_blank" title="More" href="#" tabindex="1000"></a></a>
                                        <div class="atclear"></div></div>
                                    </div>-->
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
}
</script>

<style scoped>

/*.body {
    padding: 0;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    color: #232323;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.5px;
    margin: 0;
}

.quickview {
    background: #fff;
    padding: 15px 0;
    display: block;
    overflow: hidden;
    position: relative;
    float: left;
}

.content {
    float: left;
    width: 100%;
}

.product-left {
    float: left;
    position: relative;
    display: block;
    border: 1px solid #eee;
    border-radius: 0;
    margin-bottom: 0;
    padding: 0;
    width: 100%;
}

.col-sm-6, .col-sm-6, .col-xs-12 {
    width: 50%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
}

.thumb {
    border: 1px solid #eee;
    border-radius: 0;
    margin-bottom: 0;
    padding: 0;
    display: block;
    line-height: 1.42857143;
    background-color: #fff;
    transition: border .2s ease-in-out;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    display: block;
    max-width: 100%;
    height: auto;
}

.product-right {
    float: right;
    clear: none !important;
    position: sticky;
    top: 80px;
    margin-bottom: 30px;
}

.title {
    font-weight: 600;
    padding: 0 0 5px;
    font-size: 21px;
    color: #333;
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: inherit;
    line-height: 1.1;
}*/

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
    background: #ffffff;
    color: #333;
    padding: 30px;
    position: fixed;
    top: 10%;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.5px;
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
    margin-right: 6px;
    margin-bottom: 5px;
    width: auto;
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
    padding: 6px 12px;
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

/*-------------------------------------------------*/

/*-------------------------------------------------*/
/*
.container {
    margin-top: 100px;
}

.newarrival {
    background: #6fae1d;
    width: 50px;
    color: #eee;
    font-size: 12px;
    font-weight: bold;
}

.col-md-7 h2 {
    color: aqua;
}

.price {
    color: brown;
    font-size: 26px;
    font-weight: bold;
    padding-top: 20px;
}

input {
    border: 1px solid #ccc;
    font-weight: bold;
    height: 33px;
    text-align: center;
    width: 30px;
}

.cart{
    background: coral;
    color: #ffffff;
    font-size: 15px;
    margin-left: 20px;
}*/
</style>