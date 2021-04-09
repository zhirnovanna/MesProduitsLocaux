import axios from 'axios'

export default {
  namespaced: true,

  state: {
    token: null,
    user: null,
    userType: null,
  },

  getters: {
    authenticated (state) {
      return state.token && state.user
    },

    user (state) {
      return state.user
    },

    // userType(state){
    //   return state.userType
    // },
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },

    SET_USER (state, data) {
      state.user = data
    },

    // authUser(state, userData){
    //   state.userType = userData.type
    // },
  },

  actions: {
    async signIn ({ dispatch }, credentials) {
      let restest = await axios.post('auth/signin', credentials).then(response => {
       return dispatch('attempt', response.data.access_token)
       })
       .catch(error =>  {
        console.log(error);
        return true;
       })
    return restest
    },

    async attempt ({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        return
      }

      try {
        let response = await axios.post('auth/me')
        //console.log(state.token)
        commit('SET_USER', response.data)
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }

    },

    signOut ({ commit }) {
      return axios.post('auth/signout').then(() => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      })
    },
    async signUp({dispatch}, form) {
      
      await axios.post('auth/signup', form)

      let UserForm = new FormData()
      UserForm.append('email', form.email)
      UserForm.append('password', form.password)
      await dispatch('signIn', UserForm)
      .catch(error =>  {
        console.log(error);
        return true;
       })
    },
  }
}
