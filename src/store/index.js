import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token(){
      const token = localStorage.getItem('token')
      if(!token){
        return null
      }
      return token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
