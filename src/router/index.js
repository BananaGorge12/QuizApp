import Vue from 'vue'
import VueRouter from 'vue-router'
//pages
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import newQuiz from '../views/NewQuiz.vue'
import editQuiz from '../views/EditQuiz.vue'
import takeQuiz from '../views/TakeQuiz.vue'
import quizPage from '../views/QuizPage.vue'
import Classes from '../views/Classes.vue'
import NotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/signup',
    name:'Signup',
    component:Signup
  },
  {
    path:'/profile',
    name:'Profile',
    component:Profile
  },
  {
    path:'/classes',
    name:'classes',
    component:Classes
  },
  {
    path:'/new-quiz',
    name:'newQuiz',
    component:newQuiz
  },
  {
    path:'/quiz/:id/view',
    name:'quizPage',
    component:quizPage
  },
  {
    path:'/quiz/:id/edit',
    name:'editQuiz',
    component:editQuiz
  },
  {
    path:'/quiz/:id/take',
    name:'takeQuiz',
    component:takeQuiz
  },
  {
    path:'/*',
    name:'NotFound',
    component:NotFound
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
