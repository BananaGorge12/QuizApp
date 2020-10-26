import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //gets jwt from local storage
    token() {
      const token = localStorage.getItem('token')
      if (!token) {
        return null
      }
      return token
    },
    //user data
    user: null
  },
  mutations: {
    //send data to state
    loadUserData: (state, payload) => (state.user = payload)
  },
  actions: {
    //get data from db
    loadUserDataFromDB(context) {
      if (this.state.token()) {
        return new Promise((resolve, reject) => {

          axios.get('/api/users/me', {
            headers: {
              'Authorization': `Bearer ${this.state.token()}`

            }
          }).then(res => {
            // sends data to mutation
            context.commit('loadUserData', res.data)
            //end of promise
            resolve()

          }).catch(err => {
            //end of promise
            reject(err)
          })
        })
      } return null

    }
  },
  modules: {
  }
})
