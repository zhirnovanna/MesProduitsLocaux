<script>
export default {
	name: 'EntityCRUDForm',
    props: {
        modelId: {
            type: [String, Number],
            required: false
        },
        modelName: {
            type: String,
            required: false
        },
        modelPath: {
            type: String,
            required: false
        },
        modelIcon: {
            type: String,
            required: false
        }, 
        modelEntity: {
            type: String,
            required: true
        }, 
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
                this.$emit('update:modelName', name, this.$refs.entityNameInput, this.$refs.entityNameFeedback);
            }
        },

        path: {
            get() {
                return this.modelPath
            },
            set(path) {
                this.$emit('update:modelPath', path);
            }
        },

        icon: {
            get() {
                return this.modelIcon
            }
        },
    },

    methods: {
        imageFileUpload(event) {
            this.$emit('update:modelIcon', event, this.$refs.iconFeedback);
        }
    }
}

</script>

<template>
    <div class="w-100 pt-2 pb-2 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-baseline">
            <h4 v-if="modelId" class="mb-3">Modifier une {{ modelEntity }}</h4>
            <h4 v-else class="mb-3">Ajouter une {{ modelEntity }}</h4>
            <div @click="$emit('closeModal')" class="btn text-danger">X</div>
        </div>

        <form @submit.prevent="$emit('entity-submission', $refs.entityForm)" ref="entityForm" class="needs-validation" novalidate>
            <input type="hidden" name="id" v-model="id">

            <div class="form-group mb-4">
                <label for="name">Nom de la {{ modelEntity }}</label>
                <input type="text" name="name" id="name" v-model="name" class="form-control" ref="entityNameInput">
                <div class="invalid-feedback" ref="entityNameFeedback"></div>
                <small class="form-text text-muted">Le nom doit comporter 3 à 45 caractères.</small>
            </div>

            <div v-if="modelEntity === 'catégorie'" class="form-group mb-4">
                <label for="imgFile">Fichier image de l'icône de la catégorie</label>
                <div class="custom-file">
                    <label for="imgFile" class="custom-file-label text-muted">Format JPEG, PNG ou GIF</label>
                    <input type="file" name="imgFile" id="imgFile" class="custom-file-input" @change="imageFileUpload" accept=".jpeg, .jpg, .png, .gif">
                </div>
                <div class="invalid-feedback" ref="iconFeedback"></div>
                <img v-if="icon !== null" :src="icon" alt="Icone de la catégorie" class="d-block m-2">
            </div>

            <div v-if="modelEntity === 'région'" class="form-group mb-4">
                <label for="path">Path du SVG de la {{ modelEntity }}</label>
                <textarea name="path" id="path" v-model="path" class="form-control" ref="pathInput"></textarea>
                <div class="invalid-feedback" ref="pathFeedback"></div>
            </div>

            <input type="submit" value="Valider" class="btn btn-primary">
        </form>
    </div>
</template>

<style lang="scss" scoped>

</style>