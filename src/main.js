import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

Vue.config.productionTip = false


//gets user data before load
axios.get('/api/users/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}).then(res => {
  //updates store
  store.commit('loadUserData', res.data)

  axios.get('/api/quiz',{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    //updates store
    store.commit('loadQuizzes',res.data)

    //render app
    new Vue({
      router,
      store,
      // vuetify,
      render: h => h(App)
    }).$mount('#app')

  }).catch(err => {
    console.error(err)
  })

}).catch(err => {
  console.error(err)

  //render app
  new Vue({
    router,
    store,
    // vuetify,
    render: h => h(App)
  }).$mount('#app')

})
