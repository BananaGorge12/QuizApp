import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    quizzes:null,
    assignedQuizzes:null,
    classes:null,
  },
  mutations: {
    //send data to state
    loadUserData: (state, payload) => (state.user = payload),
    loadQuizzes: (state, payload) => (state.quizzes = payload),
    loadAssignedQuizzes:(state,payload) => (state.assignedQuizzes = payload),
    loadClasses:(state,payload) => (state.classes = payload),
    //remove quiz from state
    removeQuiz(state,payload){
      state.quizzes = state.quizzes.filter(quiz => quiz._id != payload)
    },
    //add quiz
    addQuiz(sate,payload){
      sate.quizzes.push(payload)
    }
  },
  actions:{

  },
})
