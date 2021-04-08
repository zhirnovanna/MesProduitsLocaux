<script>
export default {
	name: 'UserCRUDForm',
    props: {
        modelId: {
            type: [String, Number],
            required: false
        },
        modelLastName: {
            type: String,
            required: false
        },
        modelFirstName: {
            type: String,
            required: false
        },
        modelAddress: {
            type: String,
            required: false
        },
        modelPc: {
            type: [String, Number],
            required: false
        },
        modelCity: {
            type: String,
            required: false
        },
        modelEmail: {
            type: String,
            required: false
        },
        modelPhone: {
            type: [String, Number],
            required: false
        },
        modelIsAdmin: {
            type: [String, Number],
            required: false
        }
    },

    computed: {
        email: {
            get() {
                return this.modelEmail
            },
            set(email) {
                this.$emit('update:modelEmail', email, this.$refs.emailInput, this.$refs.emailFeedback);
            }
        },
        
        isAdmin: {
            get() {
                return this.modelIsAdmin
            },
            set(isAdmin) {
                this.$emit('update:modelIsAdmin', isAdmin, this.$refs.adminInput, this.$refs.adminFeedback)
            }
        }
    },
}

</script>

<template>
    <div class="w-100 pt-2 pb-2 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-baseline">
            <h4 v-if="modelId" class="mb-3">Modifier un profil utilisateur</h4>
            <div @click="$emit('closeModal')" class="btn text-danger">X</div>
        </div>
        <div class="my-3">
            <div class="h6">Informations</div>
            <div>{{ modelFirstName }} {{ modelLastName}}</div>
            <div>{{ modelAddress }}</div>
            <div>{{ modelPc }} {{ modelCity }}</div>
            <div>{{ modelPhone }}</div>
        </div>
        <form @submit.prevent="$emit('user-submission', $refs.userForm)" ref="userForm" class="needs-validation" novalidate>
            <div class="form-group mb-4">
                <label for="email">Email de l'utilisateur</label>
                <input type="email" name="email" id="email" v-model="email" class="form-control" ref="emailInput">
                <div class="invalid-feedback" ref="emailFeedback"></div>
            </div>
            <div class="form-group mb-4">
                <p>Cet utilisateur est-il un administrateur ?</p>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="admin" id="is_admin" v-model="isAdmin" :value="1" ref="adminInput" required>
                    <label class="form-check-label" for="is_admin">Oui, cet utilisateur est administrateur</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="admin" id="not_admin" v-model="isAdmin" :value="0">
                    <label class="form-check-label" for="not_admin">Non, cet utilisateur n'est pas administrateur</label>
                </div>
                <div class="invalid-feedback" ref="adminFeedback"></div>
            </div>
            <input type="submit" value="Valider" class="btn btn-primary">
        </form>
    </div>
</template>

<style lang="scss" scoped>
</style>