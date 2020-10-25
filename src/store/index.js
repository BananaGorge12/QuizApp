import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token(){
      const token = localStorage.getItem('token')
      if(!token){
        return null
      }
      return token
    },
    user:null
  },
  mutations: {
    loadUserData:(state,payload) => (state.user = payload)
  },
  actions: {
    loadUserDataFromDB(context){
      if(this.state.token()){
        return new Promise((resolve,reject) => {
          axios.get('/api/users/me',{
            headers:{
              'Authorization':`Bearer ${this.state.token()}`
          }}).then(res => {
            // console.log(res.data)
            context.commit('loadUserData',res.data)
            resolve()
          }).catch(err => {
            console.log(err)
            reject()
          })
        })
      }

    }
  },
  modules: {
  }
})
