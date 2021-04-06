<script>
export default {
	name: 'Cart',
    props: {
        modelId: {
            type: [String, Number],
            required: true
        },
        modelQuantity: {
            type: [String, Number],
            required: true
        },
    },
    data() {
    },
    computed: {
    },
    mounted() {
      this.$store.dispatch("getProduct", this.modelId);
    }
}

</script>

<template>

<div class="my-3">
    <div class="container">
        <CartProductPreview v-for="product in productsInCart" 
            v-bind:id="product.id" 
            v-bind:quantity="product.quantity" 
            v-bind:key="product.id"/>
    </div>
</div>

</template>

<style>


</style>