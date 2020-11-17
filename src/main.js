import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

Vue.config.productionTip = false

const loadVue = () => {
  //renders app
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}


//loads user data to store if has token
if(localStorage.getItem('token')){
  
  //gets user data before load
  const getData = async () => {
    try {
      //gets user
      const user = await axios.get('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      //puts user on store
      store.commit('loadUserData', user.data)

      //gets quizzes
      const quizzes = await axios.get('/api/quiz',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      //puts quizzes in store
      store.commit('loadQuizzes',quizzes.data)

      //get assigendQuizzes
      const assigendQuizzes = await axios.get('/api/quiz/assigend',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      store.commit('loadAssignedQuizzes',assigendQuizzes.data)


      //get classes
      const classes = await axios.get('/api/classes',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      store.commit('loadClasses',classes.data)


      //loads vue
      loadVue()

    } catch {
      //loads vue
      loadVue()
    }
  }

  //gets data from db
  getData()

}else{
  //loads vue
  loadVue()
}