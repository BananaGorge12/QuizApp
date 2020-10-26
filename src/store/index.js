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
    user: null,
    //quizzes
    quizzes:null,
  },
  mutations: {
    //send data to state
    loadUserData: (state, payload) => (state.user = payload),
    loadQuizzes: (state, payload) => (state.quizzes = payload)
  },
  actions: {
    //get data from db
    loadUserDataFromDB(context) {
      if (this.state.token()) {
          return axios.get('/api/users/me', {
            headers: {
              'Authorization': `Bearer ${this.state.token()}`
            }
          }).then(res => {
            // sends data to mutation
            context.commit('loadUserData', res.data)

          }).catch(err => {
            console.error(err)
          })
      } return null

    },
    loadQuizzesFromDB(context){
      if (this.state.token()){
        return axios.get('/api/quiz',{
          headers: {
            'Authorization': `Bearer ${this.state.token()}`
          }
        }).then(res => {
          context.commit('loadQuizzes',res.data)
        }).catch(err => {
          console.error(err)
        })
      } return null
    }
  },
  modules: {
  }
})
