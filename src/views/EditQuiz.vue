<template>
  <div class="quiz-maker">
    <!-- settings -->
    <div class="settings">
      <svg tabindex="0" @click="settingsPopup = true" class="settings__btn icon icon-cog">
        <symbol id="icon-cog" viewBox="0 0 32 32">
          <path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"></path>
        </symbol>
        <use xlink:href="#icon-cog"></use>
      </svg>
      <div v-if="settingsPopup" class="settings__popup">
        <div class="settings__content">
          <svg @click="settingsPopup = false" class="settings__close-btn icon-cross">
            <symbol id="icon-cross" viewBox="0 0 32 32">
              <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
            </symbol>
            <use xlink:href="#icon-cross"></use>
          </svg>
          <h1>Settings</h1>
          <ul>
            <li>
              <h2>Background Image</h2>
              <form @submit.prevent="updateBg" id="setBgImageForm">
                <input accept="image/png, image/jpeg, image,jpg" @change="fileName = $event.target.files[0].name" type="file" name="quizBackground" id="new-quiz-background-btn">
                <label class="settings__new-quiz-background-btn" for="new-quiz-background-btn">Upload File</label>
                <button>Save!</button>
                <button @click.prevent="deleteBg">Remove</button>
                <span class="settings__fileName" v-if="fileName">{{ fileName }}</span>
              </form>
            </li>
          </ul>
          <h3 class="settings__feedback" v-if="popupFeedback">{{ popupFeedback }}</h3>
        </div>
      </div>
    </div>
    <!-- header -->
    <header class="header">
      <h1 class="header__title">Quiz Editor</h1>
    </header>
    <form :style="bgStyles" @submit.prevent class="quiz-main quiz-maker-main">
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
      settingsPopup:false,
      bgStyles:null,
      fileName:null,
      popupFeedback:null,
    };
  },
  created() {
    if(!this.user){
      return this.$router.push({ name:'Home' })
    }

    this.quiz = this.storeQuizzes.filter(quiz => quiz._id == this.$route.params.id)[0]
    this.questions = this.quiz.questions

    this.getBgImage()
  },
  methods: {
    deleteBg(){
      axios.delete(`/api/quiz/${this.$route.params.id}/background`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
        }
      }).then(() => {
        this.bgStyles = null
      }).catch(err => {
        this.popupFeedback = err.response.data.error
      })
    },
    updateBg(){
      const form = document.querySelector('#setBgImageForm')
      const newBgFormData = new FormData(form)

      axios.post(`/api/quiz/${this.$route.params.id}/background`,newBgFormData,{
        headers:{
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }).then(() => {
        this.getBgImage()
        this.popupFeedback = null
      }).catch(err => this.popupFeedback = err.response.data.error)
    },
    //gets bg image from server
    getBgImage(){
      this.bgStyles = `background-image: url('/api/quiz/${this.$route.params.id}/background?token=${localStorage.getItem('token')}&t=${Date.now()}');`
    },
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
      axios.patch(`/api/quiz/${this.$route.params.id}`, {name:this.quiz.name,questions:this.questions}, {
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
.quiz-maker-main{
  padding: 1rem 4rem;
}
</style>