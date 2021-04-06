import { ENDPOINT } from './../index';


const state = () => ({
    regionOfOrderCode = null,
    departementsOfRegion = []
})

const getters = {
}

const mutations = {
    SET_REGION_CODE(state, regionCode) {
        state.regionOfOrderCode = regionCode;
    },

    SET_REGION_DPTS(state, departements) {
        let departementsCodes = [];
        for(const departement of departements) {
            departementsCodes.push(departement.code);
        }

        state.departementsOfRegion = departementsCodes;
    },
}

const actions = {
    async getRegionCode({ commit }, regionName) {
        // get all products
        let response = await fetch('https://geo.api.gouv.fr/regions?nom=' + regionName);

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return null;
        }
        
        const data = await response.json();
        
        commit('SET_REGION_CODE', data.code);
    },

    async getRegionDepartments({ commit }, regionCode) {
        // get all products
        let response = await fetch('https://geo.api.gouv.fr/regions/' + regionCode + '/departements');

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            return null;
        }
        
        const data = await response.json();
        
        commit('SET_REGION_DPTS', data);
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}