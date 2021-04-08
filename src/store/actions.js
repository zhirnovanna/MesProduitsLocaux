import { ENDPOINT } from './index';

let abortControllerProduct = new AbortController();
let abortControllerCount = new AbortController();

export const actions = {
    async getAllProducts ({ commit }) {
        // get all products
        let response = await fetch(ENDPOINT + 'products');

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return null;
        }

        const data = await response.json();

        commit('SET_PRODUCTS', data);
    },

    async getFilteredProducts ({ commit }, parameters) {
        commit('SET_LOADING', true);

        abortControllerProduct.abort(); // Cancel the previous request
        abortControllerProduct = new AbortController();

        try {
            // get a filtered set of products
            // possible parameters are region, category, max_price, min_price, search, sorting, offset, limit
            // pass empty strings for unneeded parameters
            let response = await fetch(ENDPOINT + 'products?region=' + parameters.filters.region 
                                        + '&category=' + parameters.filters.category
                                        + '&min_price=' + parameters.filters.min_price
                                        + '&max_price=' + parameters.filters.max_price
                                        + '&search=' + parameters.filters.search
                                        + '&sorting=' + parameters.filters.sorting
                                        + '&offset=' + parameters.offset
                                        + '&limit=' + parameters.limit,
                                        { signal: abortControllerProduct.signal });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                console.log(message);
                return null;
            }

            const data = await response.json();

            commit('SET_PRODUCTS', data);
            commit('SET_LOADING', false);
        }
        catch (ex) {
            if (ex.name === 'AbortError') {
            return; // Continuation logic has already been skipped, so return normally
            }
        
            throw ex;
        }
    },

    async getMatchedProductsNumber ({ commit }, parameters = {'region': '', 'category': '', 'min_price': '', 'max_price': '', 'search': ''}) {
        abortControllerCount.abort(); // Cancel the previous request
        abortControllerCount = new AbortController();

        try {
            // get a filtered set of products total number
            // if no parameters get total number of products
            // possible parameters are region, category, max_price, min_price, search
            // empty strings for unneeded parameters
            let response = await fetch(ENDPOINT + 'products/count?region=' + parameters.region 
                                        + '&category=' + parameters.category
                                        + '&min_price=' + parameters.min_price
                                        + '&max_price=' + parameters.max_price
                                        + '&search=' + parameters.search,
                                        { signal: abortControllerCount.signal });

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                console.log(message);
                return null;
            }

            const data = await response.json();

            commit('SET_PRODUCTS_NUMBER', data);
        }
        catch (ex) {
            if (ex.name === 'AbortError') {
            return; // Continuation logic has already been skipped, so return normally
            }
        
            throw ex;
        }
    },

    async getProduct ({ commit }, productId) {
        // get one product data by id
        let response = await fetch(ENDPOINT + 'products/' + productId);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return null;
        }

        const data = await response.json();

        commit('SET_PRODUCT', data);
    },

    async getRegions ({ commit }, pagination = {offset: '', limit: ''}) {
        // get all products
        let response = await fetch(ENDPOINT + 'regions?offset=' + pagination.offset + '&limit=' + pagination.limit);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return null;
        }

        const data = await response.json();

        commit('SET_REGIONS', data);
    },

    async getRegion ({ commit }, regionId) {
        // get one region data by id
        let response = await fetch(ENDPOINT + 'regions/' + regionId);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return null;
        }

        const data = await response.json();

        commit('SET_REGION', data);
    },

    async getRegionsNumber ({ commit }) {
        // get one region data by id
        let response = await fetch(ENDPOINT + 'regions/count');

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return null;
        }

        const data = await response.json();

        commit('SET_REGIONS_NUMBER', data);
    },

    async getCategories ({ commit }, pagination = {offset: '', limit: ''}) {
        // get all products
        let response = await fetch(ENDPOINT + 'categories?offset=' + pagination.offset + '&limit=' + pagination.limit);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return null;
        }

        const data = await response.json();

        commit('SET_CATEGORIES', data);
    },

    async getCategory ({ commit }, categoryId) {
        // get one category data by id
        let response = await fetch(ENDPOINT + 'categories/' + categoryId);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return null;
        }

        const data = await response.json();

        commit('SET_CATEGORY', data);
    },

    async getCategoriesNumber ({ commit }) {
        // get one region data by id
        let response = await fetch(ENDPOINT + 'categories/count');

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return null;
        }

        const data = await response.json();

        commit('SET_CATEGORIES_NUMBER', data);
    },
}