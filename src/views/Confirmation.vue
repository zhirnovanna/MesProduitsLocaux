<template>
<div v-if="user !== null" class="background">
    <div class="recap">
        <div class="logo">
            <div class="backlogo"></div>
            <img :src="require('@/assets/map_mpl.png')" alt="Logo Mes Produits Locaux" class="footer__logo">
        </div>
        <div class="numco">
            N° de commande :
            <p class="pnumco">0EF0HE980ZKE0F</p>
        </div>
        <div class="merci">
            <p class="mu">Merci <span class="meruse">{{ user.firstname }}</span>,</p>
            <p class="enreg">Votre commande a été enregistrée.</p>
        </div>
        <div class="listecommande">
            <table class="tableau">
                <thead>
                    <tr>
                        <th class="text-center-image">Image</th>
                        <th class="text-left-nom">Nom du produit</th>
                        <th class="text-left-cat">Catégorie</th>
                        <th class="text-left-qtt">Quantité</th>
                        <th class="text-right-prx">Prix</th>
                        <th class="text-right-tot">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in productsInCartInfo" v-bind:key="product.id">
                        <td class="text-center-image2">
                            <img :src="product.image" class="card-img-top" alt="">
                        </td>
                        <td class="text-center-prodnam">
                            <div>{{product.name}}</div>
                        </td>
                        <td class="text-center-catnam">
                            <div>{{product.category_name}}</div>
                        </td>
                        <td class="text-center-qttprod">
                            <div>
                                <span>
                                    <span>{{getProductsQuantityInCart(product.id)}}</span>
                                </span>
                            </div>
                        </td>
                        <td class="text-center-unitpr">
                            <div>{{product.price}} €</div>
                        </td>
                        <td class="text-center-qttpr">
                            <div>{{getProductsQuantityInCart(product.id) * product.price}} €</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="paiement">
            <p class="titpaie">Paiement</p>
            <div class="sub-total-table">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td class="text-right1">
                                <strong>Total H.T.</strong>
                            </td>
                            <td class="text-right total-amount">
                                <div>{{totalPrice * 0.8}} € </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-right2">
                                <strong>Frais de port</strong>
                            </td>
                            <td class="text-right total-amount">
                                9,99 €
                            </td>
                        </tr>
                        <tr>
                            <td class="text-right3">
                                <strong>T.V.A. (20%)</strong>
                            </td>
                            <td class="text-right total-amount">
                                <div>{{totalPrice * 0.2}} €</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-right4">
                                <strong>Total</strong>
                            </td>
                            <td class="text-right total-amount">
                                <div>{{ totalPrice + 9.99 }} €</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="paiedr">
                <p class="modere">Mode de règlement</p>
                <div class="moderebl">
                    <img :src="require('@/assets/PayPal-Logo.png')" alt="Logo Paypal" class="paypal__logo">
                    <p class="payp">Paypal : <span class="paypreg">{{ totalPrice + 9.99 }} €</span></p>
                    <i class="bi bi-exclamation-circle"></i>
                    <p class="paydesc">Le paiement sera débité seulement au moment de l'expédition de la commande ou lors de la confirmation de commande pour une commande effectuée auprès d'un vendeur partenaire.</p>
                </div>
            </div>
        </div>
        <div class="infosp">
            <i class="bi bi-exclamation-circle"></i>
            <p class="prquest">Pour toute question concernant le suivi de votre commande, vos garanties et votre droit de rétractation, consultez nos pages d'aide en ligne ou envoyez un mail en <span class="cliqici">cliquant ici</span>.</p>
        </div>
        <div class="livraison">
            <p class="livr">Livraison</p>
            <div class="noir">
                <i class="bi bi-geo-alt-fill"></i>
                <p class="adliv">Adresse de livraison</p>
                <div class="coord">
                    {{ user.firstname }}
                    {{ user.lastname }}
                    <br>
                    {{ user.address }}
                    <br>
                    {{ user.pc }}
                    {{ user.city }}
                </div>
                <i class="bi bi-credit-card-fill"></i>
                <div class="addr"></div>
                <p class="adfact">Adresse de facturation</p>
                <div class="coord2">
                    {{ user.firstname }}
                    {{ user.lastname }}
                    <br>
                    {{ user.address }}
                    <br>
                    {{ user.pc }}
                    {{ user.city }}
                </div>
            </div>
        </div>
        <p class="commter">Votre commande est terminée.</p>
        <div class="butt">
            <router-link to="/" class="btn btn-primary">Retour à l'accueil</router-link>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            }),

        cartLocalStorage() {
            return this.$store.state.cart.cartLocalStorage;
        },

        productsInCartIds() {
            return this.$store.state.cart.cartProductsIds;
        },

        productsInCartInfo() {
            return this.$store.state.cart.productsInCart;
        },

        totalPrice(){
            let sum = 0;
            for(const product of this.productsInCartInfo) {
                sum += product.price * this.getProductsQuantityInCart(product.id);
            }
            return sum;
        }
    },

    watch: {
        productsInCartIds() {
            this.$store.dispatch("getCartProductsInfos", this.productsInCartIds);
        },
    },

    methods: {
        getProductsQuantityInCart(id) {
            const index = this.cartLocalStorage.content.findIndex(item => item.id === id);
            if(index !== -1) {
                return this.cartLocalStorage.content[index].quantity;
            }
        },
    },

    mounted() {
        this.$store.dispatch("getCartLocalStorage");
        this.$store.dispatch("getCartProductsInfos", this.productsInCartIds);
    },

    beforeUnmount() {
        this.$store.dispatch("emptyCart");
    }
}
</script>

<style scoped>
.background {
    background-color: #F5F5F5;
    margin: 100px 200px 100px 200px;
}
.recap {
    margin: 0px 100px 0px 100px;
}
/*---------------logo---------------------*/
.logo {
    text-align: center;
}

.backlogo {
    background-color: #2A2A2A;
    height: 60px;

}

.footer__logo {
    width: 8rem;
    height: auto;
    margin-top: -40px;
}

/*---------------N° commande---------------------*/
.numco {
    float: right;
}

.pnumco {
    font-weight: 800;
}

/*---------------Merci---------------------*/
.merci {
    background-color: white;
    padding: 30px 30px 30px 30px;
    text-align: center;
    margin-top: 60px;
    font-size: 40px;
    font-weight: 400;
}

.enreg {
    margin-top: -20px;
}

.meruse {
    color: #6fae1d;
    font-weight: 600;
}

/*---------------LISTE COMMANDE---------------------*/
.listecommande {
    margin-top: 60px;
}
.tableau {
    border-color: #e9e9e9;
    margin: auto;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    border-spacing: 0;
    border-collapse: collapse;
}

/*--------------thead--------------*/

.text-center-image {
    border-top: 0;
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    line-height: 18px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    vertical-align: middle;
    padding: 8px;
    text-align: center;
    width: 17%;
    max-width: 17%;
}

.text-left-nom, .text-left-cat, .text-left-qtt {
    border-top: 0;
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    line-height: 18px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    vertical-align: middle;
    padding: 8px;
    text-align: left;
}

.text-right-prx, .text-right-tot {
    border-top: 0;
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    line-height: 18px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    vertical-align: middle;
    padding: 8px;
    text-align: right;
    width: 14%;
    max-width: 14%;
}

.text-left-nom {
    width: 30%;
    max-width: 30%;
}

.text-left-cat {
    width: 20%;
    max-width: 20%;
}

.text-left-supp {
    width: 7%;
    max-width: 7%;
}

/*-------------tbody------------*/

.text-center-image2 {
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.6px;
    text-transform: capitalize;
    vertical-align: middle;
    padding: 8px;
    text-align: center;
}

.card-img-top {
    border-radius: 0;
    padding: 0;
    border-color: #eee;
    display: inline-block;
    max-width: 20%;
    height: auto;
    line-height: 1.42857143;
    background-color: #fff;
    border: 1px solid #ddd;
    transition: all .2s ease-in-out;
    vertical-align: middle;
}

.text-center-prodnam, .text-center-catnam, .text-center-qttprod, .text-center-suppr {
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    vertical-align: middle;
    padding: 8px;
    line-height: 1.42857143;
    text-align: left;
}

.text-center-suppr {
    text-align: center;
}

.text-center-unitpr, .text-center-qttpr {
    color: #333;
    font-size: 16px;
    background: #fff;
    border: 1px solid #e9e9e9;
    vertical-align: middle;
    padding: 8px;
    line-height: 1.42857143;
    text-align: right;
}

/*-------------PAIEMENT-----------*/

.titpaie {
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: -3px;
}

.sub-total-table {
    margin-bottom: 20px;
    width: 50%;
    position: relative;
    min-height: 1px;
    text-align: center;
}

.table-bordered {
    border-color: #e9e9e9;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    border-spacing: 0;
    border-collapse: collapse;
}

.text-right1, .text-right2, .text-right3, .text-right4 {
    background: #fff;
    border: 1px solid #e9e9e9;
    color: #222;
    vertical-align: middle;
    padding: 8px;
    line-height: 1.42857143;
    text-align: right;
}

strong {
    font-weight: 400;
}

.total-amount {
    color: #333;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    background: #fff;
    border: 1px solid #e9e9e9;
    vertical-align: middle;
    padding: 8px;
}

.paiedr {
    margin-top: -222px;
    margin-left: 440px;
}

.modere {
    font-size: 30px;
}

.moderebl {
    background-color: white;
    margin-top: -1rem;
}

.paypal__logo {
    height: 40px;
    margin-left: 10px;
}

.payp {
    font-size: 25px;
    font-weight: 600;
    margin-left: 100px;
    margin-top: -35px;
}

.paypreg {
    color: #6fae1d;
}

.bi-exclamation-circle {
    font-size: 45px;
    margin-left: 10px;
}

.paydesc {
    font-size: 14px;
    margin-left: 70px;
    margin-top: -80px;
    text-align: justify;
    padding-left: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
}

/*-------------INFOSP-----------*/
.infosp {
    background-color: white;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-top: 20px;
    padding-bottom: 12px;
}

.prquest {
    font-size: 15px;
    text-align: justify;
    margin-left: 70px;
    margin-top: -61px;
    font-weight:600;
    padding-right: 20px;
}

.cliqici {
    color: #6fae1d;
    cursor: pointer;
}

/*-------------LIVRAISON-----------*/

.livr {
    font-size: 30px;
    margin-bottom: -5px;
}

.noir {
    background-color: #2A2A2A;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 70px;
}

.bi-geo-alt-fill {
    color:#6fae1d;
    font-size: 30px;
}

.adliv {
    color:white;
    font-size: 25px;
    max-width: 200px;
    font-weight: 600;
    margin-left: 60px;
    margin-top: -45px;
}

.coord {
    color:white;
    margin-left: 60px;
    font-weight:400;
}

.bi-credit-card-fill {
    color:#6fae1d;
    font-size: 30px;
    float:right;
    margin-top: -164px;
    margin-right: 350px;
}

.addr {
    border-left: 2px solid #ffffff;
    height: 160Px;
    margin-left: 300px;
    margin-top: -160px;
}

.adfact {
    color:white;
    font-size: 25px;
    max-width: 200px;
    font-weight: 600;
    float: right;
    margin-top: -164px;
    margin-right: 110px;
}

.coord2 {
    color:white;
    float: right;
    font-weight:400;
    margin-top: -75px;
    margin-right: 225px;
}

/*-------------COMMANDE TERMINEE-----------*/

.commter {
    color:black;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    padding-top: 50px;
}

.butt {
    text-align: center;
}

.btn-primary {
    background-color: #6fae1d;
    border-color: #6fae1d;
    color: #fff;
    outline: none;
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    padding: 10px 20px;
    text-transform: uppercase;
    border-radius: 0;
    transition: all 0.5s;
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    margin-bottom: 40px;
}

.btn-primary:hover {
    background-color:#588b15;
}
</style>