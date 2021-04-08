export const mutations = {
    SET_LOADING(state, bool) {
        state.loading = bool;
    },

    SET_PRODUCTS(state, products) {
        state.products = products;
    },

    SET_PRODUCTS_NUMBER(state, productsNumber) {
        state.lengthMatchedProducts = productsNumber;
    },

    SET_PRODUCT(state, product) {
        state.product = product;
    },

    SET_REGIONS(state, regions) {
        state.regions = regions;
    },

    SET_REGIONS_NUMBER(state, regionsNumber) {
        state.lengthRegions = regionsNumber;
    },

    SET_REGION(state, region) {
        state.region = region;
    },

    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },

    SET_CATEGORIES_NUMBER(state, categoriesNumber) {
        state.lengthCategories = categoriesNumber;
    },

    SET_CATEGORY(state, category) {
        state.category = category;
    },

    ADD_PRODUCT(state, newProduct) {
        const index = state.products.findIndex(product => product.id === newProduct.id);
  
        if (index === -1) {
            state.products.push(newProduct);
        }
    },

    UPDATE_PRODUCT(state, updatedProduct) {
        const index = state.products.findIndex(product => product.id === updatedProduct.id);
  
        if (index !== -1) {
            state.products.splice(index, 1, updatedProduct);
        }

        if(state.product.id === updatedProduct.id) {
            state.product = updatedProduct;
        }
    },

    REMOVE_PRODUCT(state, productId) {
        state.products = state.products.filter((product) => product.id !== productId);

        if(state.product.id === productId) {
            state.product = {};
        }
    },

    ADD_CATEGORY(state, newCategory) {
        const index = state.categories.findIndex(category => category.id === newCategory.id);
  
        if (index === -1) {
            state.categories.push(newCategory);
        }
    },

    UPDATE_CATEGORY(state, updatedCategory) {
        const index = state.categories.findIndex(category => category.id === updatedCategory.id);
  
        if (index !== -1) {
            state.categories.splice(index, 1, updatedCategory);
        }

        if(state.category.id === updatedCategory.id) {
            state.category = updatedCategory;
        }
    },

    REMOVE_CATEGORY(state, categoryId) {
        state.categories = state.categories.filter((category) => category.id !== categoryId);

        if(state.category.id === categoryId) {
            state.category = {};
        }
    },

    ADD_REGION(state, newRegion) {
        const index = state.regions.findIndex(region => region.id === newRegion.id);
  
        if (index === -1) {
            state.regions.push(newRegion);
        }
    },

    UPDATE_REGION(state, updatedRegion) {
        const index = state.regions.findIndex(region => region.id === updatedRegion.id);
  
        if (index !== -1) {
            state.regions.splice(index, 1, updatedRegion);
        }

        if(state.region.id === updatedRegion.id) {
            state.region = updatedRegion;
        }
    },

    REMOVE_REGION(state, regionId) {
        state.regions = state.regions.filter((region) => region.id !== regionId);

        if(state.region.id === regionId) {
            state.region = {};
        }
    },
}