<template>
  <div class="quiz-maker">
    <header class="header">
      <h1 class="header__title">Quiz Editor</h1>
    </header>
    <form @submit.prevent class="quiz-main quiz-maker-main">
      <input class="quiz-maker__name-input" type="text" v-model="quiz.name">
      <ul>
        <li v-for="(question,index) in questions" :key="index">
          <svg @click="deleteQuestion(index)" class="quiz-maker-main__deleteQuestionBtn icon icon-bin2">
            <symbol id="icon-bin2" viewBox="0 0 32 32">
              <path d="M6 32h20l2-22h-24zM20 4v-4h-8v4h-10v6l2-2h24l2 2v-6h-10zM18 4h-4v-2h4v2z"></path>
            </symbol>
            <use xlink:href="#icon-bin2"></use>
          </svg>
          <div v-if="question.type == 'multi'" class="quiz__question quiz__muli-choice">
            <input :value="question.title" type="text" class="quiz-maker-main__question-title">
            <ul class="quiz-main__list u-indent">
              <li v-for="(option,index) in question.options" :key="index">
                <input :class="{ 'quiz-maker-main__question-option--correct':option.correct,'quiz-maker-main__question-option--incorrect':!option.correct }"
                  :value="option.title" class="quiz-maker-main__question-option" type="text">
                <button @click="option.correct = !option.correct" class="quiz-maker-main__is-correct-btn">
                 <!-- correct btn -->
                <svg v-if="option.correct" class="quiz-maker-main__icon quiz-maker-main__icon--correct icon icon-checkmark">
                  <symbol id="icon-checkmark" viewBox="0 0 32 32">
                    <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
                  </symbol>
                  <use xlink:href="#icon-checkmark"></use>
                </svg>
                <!-- incorrect btn -->
                <svg v-else class="quiz-maker-main__icon icon quiz-maker-main__icon--incorrect icon-cross">
                  <symbol id="icon-cross" viewBox="0 0 32 32">
                    <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                  </symbol>
                  <use xlink:href="#icon-cross"></use>
                </svg>
                </button>
              </li>
            </ul>
          </div>
          <div v-else-if="question.type == 'text'" class="quiz__question quiz__text-question">
            <input class="u-margin-bottom quiz-maker-main__text-title" v-model="question.title">
            <input type="text" placeholder="Leave Blank For Manual Checking." v-model="question.answer">
          </div>
          <div v-else-if="question.type == 'video'" class="quiz__video">
            <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${getVideoId(question.url)}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div v-else-if="question.type == 'paragraph'" class="quiz__paragraph">
            <textarea class="quiz-maker-main__textarea" cols="30" rows="10" v-model="question.text"></textarea>
          </div>
        </li>
        <button v-if="questions.length > 0" @click="saveQuiz" class="quiz-maker-main__save-btn form__btn">Save</button>
      </ul>
    </form>
    <div tabindex="0" class="quiz-maker__nq-container">
      <span>+</span>
      <button class="quiz-maker__nq-btn" @click="addNewTextQuestion">Text</button>
      <button class="quiz-maker__nq-btn" @click="addNewMuliChoiceQuestion">Muli Choice</button>
      <button class="quiz-maker__nq-btn" @click="ytPopup = true">Video</button>
      <button class="quiz-maker__nq-btn" @click="addNewParagraph">Paragraph</button>
    </div>
    <!-- popup -->
    <div v-if="ytPopup" class="ytpopup__content">
      <svg @click="ytPopup = false" class="icon-cross">
        <symbol id="icon-cross" viewBox="0 0 32 32">
          <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
        </symbol>
        <use xlink:href="#icon-cross"></use>
      </svg>
      <h3>Youtube Link</h3>
      <input v-model="ytLink" placeholder="Link" type="text">
      <button @click="addVideo">Add</button>
    </div>
    <div v-if="ytPopup" class="ytpopup__overlay"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "editQuiz",
  data() {
    return {
      quiz:false,
      questions:[],
      ytPopup:false,
    };
  },
  created() {
    if(!this.user){
      return this.$router.push({ name:'Home' })
    }

    this.quiz = this.storeQuizzes.filter(quiz => quiz._id == this.$route.params.id)[0]
    this.questions = this.quiz.questions

  },
  methods: {
    //delete question by index
    deleteQuestion(questionIndex){
      let index = 0
      this.questions = this.questions.filter(() => {
        if(index == questionIndex){
          index = index + 1
          return false
        }
        index = index + 1
        return true
      })
    },
    getVideoId(url){
      const id = new URLSearchParams(url).entries().next().value[1]
      return id
    },
    addNewParagraph(){
      this.questions.push(        {
          type:'paragraph',
          text:'Write Your Paragraph Here...'
      })
    },
    addVideo(){
      this.questions.push({
          title:'Video Question',
          type:'video',
          url:this.ytLink
      })
      this.ytLink = null
      this.ytPopup = false
    },
    addNewMuliChoiceQuestion() {
      const newQuestion = {
        title: 'Muli Choice Question',
        type:'multi',
        options: [
          {
            title: "Option 1",
            correct: true,
          },
          {
            title: "Option 2",
            correct: false,
          },
          {
            title: "Option 3",
            correct: false,
          },
          {
            title: "Option 4",
            correct: false,
          },
        ],
      };
      this.questions.push(newQuestion);
    },
    addNewTextQuestion(){
      this.questions.push({
        title:'Text Question',
        type:'text',
        answer:''
      })
    },
    saveQuiz() {
        axios.patch(`/api/quiz/${this.$route.params.id}`, {name:this.quiz.name,questions:this.quiz.questions}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then(() => {
            this.$router.push({name:'Home'})
            location.reload()
        }).catch(err => {
          console.log(err)
        })
    },
  },
  computed:{
      storeQuizzes(){
          return this.$store.state.quizzes
      },
      user(){
        return this.$store.state.user
      }
  }
};
</script>
<style lang="scss">

</style>