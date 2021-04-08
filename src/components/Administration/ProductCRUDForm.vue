<script>
export default {
	name: 'ProductCRUDForm',
    props: {
        modelId: {
            type: [String, Number],
            required: false
        },
        modelName: {
            type: String,
            required: false
        },
        modelDescription: {
            type: String,
            required: false
        },
        modelPrice: {
            type: [String, Number],
            required: false
        },
        modelQuantity: {
            type: [String, Number],
            required: false
        },
        modelImage: {
            type: String,
            required: false
        },
        modelCategoryId: {
            type: [String, Number],
            required: false
        },
        modelRegionId: {
            type: [String, Number],
            required: false
        },
        modelCategories: {
            type: Array,
            required: false
        },
        modelRegions: {
            type: Array,
            required: false
        }
    },

    computed: {
        id: {
            get() {
                return this.modelId
            }
        },

        name: {
            get() {
                return this.modelName
            },
            set(name) {
                this.$emit('update:modelName', name, this.$refs.nameInput, this.$refs.nameFeedback);
            }
        },
        
        description: {
            get() {
                return this.modelDescription
            },
            set(description) {
                this.$emit('update:modelDescription', description, this.$refs.descTextarea, this.$refs.descFeedback)
            }
        },

        price: {
            get() {
                return this.modelPrice
            },
            set(price) {
                this.$emit('update:modelPrice', price)
            }
        },
        
        quantity: {
            get() {
                return this.modelQuantity
            },
            set(quantity) {
                this.$emit('update:modelQuantity', quantity)
            }
        },

        image: {
            get() {
                return this.modelImage
            }
        },
        
        categoryId: {
            get() {
                return this.modelCategoryId
            },
            set(categoryId) {
                this.$emit('update:modelCategoryId', categoryId)
            }
        },

        regionId: {
            get() {
                return this.modelRegionId
            },
            set(regionId) {
                this.$emit('update:modelRegionId', regionId)
            }
        }
    },

    methods: {
        imageFileUpload(event) {
            this.$emit('update:modelImage', event, this.$refs.imgFeedback);
        }
    }
}

</script>

<template>
    <div class="w-100 pt-2 pb-2 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-baseline">
            <h4 v-if="modelId" class="mb-3">Modifier un produit</h4>
            <h4 v-else class="mb-3">Ajouter un produit</h4>
            <div @click="$emit('closeModal')" class="btn text-danger">X</div>
        </div>

        <form @submit.prevent="$emit('product-submission', $refs.form)" ref="form" class="needs-validation" enctype="multipart/form-data" novalidate>
            <input type="hidden" name="id" v-model="id">
            <div class="form-group mb-4">
                <label for="name">Nom du produit</label>
                <input type="text" name="name" id="name" v-model="name" class="form-control" ref="nameInput" required>
                <div class="invalid-feedback" ref="nameFeedback"></div>
                <small class="form-text text-muted">Le nom doit comporter 10 à 45 caractères.</small>
            </div>
            <div class="form-group mb-4">
                <label for="description">Description du produit</label>
                <textarea name="description" id="description" v-model="description" class="form-control block-form__description" ref="descTextarea" required></textarea>
                <div class="invalid-feedback" ref="descFeedback"></div>
                <small class="form-text text-muted">1000 caractères maximum</small>
            </div>
            <div class="form-group mb-4">
                <label for="price">Prix du produit</label>
                <input type="number" name="price" id="price" v-model="price" class="form-control" min="0" step="0.01" required>
                <div class="invalid-feedback">Le prix doit être positif et peut comporter jusqu'à deux décimales.</div>
            </div>
            <div class="form-group mb-4">
                <label for="quantity">Quantité du produit</label>
                <input type="number" name="quantity" id="quantity" v-model="quantity" class="form-control" min="0" required>
                <div class="invalid-feedback">La quantité doit être un entier positif.</div>
            </div>
            <div class="form-group mb-4">
                <label for="imgFile">Fichier image du produit</label>
                <div class="custom-file">
                    <label for="imgFile" class="custom-file-label text-muted">Format JPEG, PNG ou GIF</label>
                    <input type="file" name="imgFile" id="imgFile" class="custom-file-input" @change="imageFileUpload" accept=".jpeg, .jpg, .png, .gif">
                </div>
                <div class="invalid-feedback" ref="imgFeedback"></div>
                <img v-if="image !== null" :src="image" alt="Photo du produit" class="d-block m-2 block-form__photo">
            </div>
            <div class="form-group mb-4">
                <label for="categoryId">Catégorie du produit</label>
                <select name="categoryId" id="categoryId" v-model="categoryId" class="custom-select" required>
                    <option v-for="category in modelCategories" v-bind:key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <div class="form-group mb-4">
                <label for="regionId">Région où se trouve le produit</label>
                <select name="regionId" id="regionId" v-model="regionId" class="custom-select" required>
                    <option v-for="region in modelRegions" v-bind:key="region.id" :value="region.id">{{ region.name }}</option>
                </select>
            </div>
            <input type="submit" value="Valider" class="btn btn-primary">
        </form>
    </div>
</template>

<style lang="scss" scoped>

	.block-form {

        &__description{
            min-height: 225px;
        }

        &__photo{
            max-width: 100%;
        }
    }
</style>