<template>
  <div class="quiz-maker">
    <!-- header -->
    <header class="header">
      <h1 class="header__title u-f40">THE QUIZ MAKER 3000!</h1>
    </header>
    <!-- quizmaker -->
    <form @submit.prevent class="quiz-main quiz-maker-main">
      <input class="quiz-maker__name-input" type="text" v-model="quizName">
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
  name: "newQuiz",
  data() {
    return {
      ytPopup:false,
      ytLink:null,
      questions: [],
      quizName:'New Quiz',
      settingsPopup:false,
      bgImg:null,
    };
  },
  created() {
    if(!this.user){
      return this.$router.push({ name:'Home' })
    }

    //loads quiz from loacal storge
    if(localStorage.getItem('newQuiz')){
      let quiz = localStorage.getItem('newQuiz')

      quiz = JSON.parse(quiz)

      this.quizName = quiz.name
      this.questions = quiz.question
    }


    //save quiz every 10 sec
    setInterval(() => {
      let localQuiz = {
        name:this.quizName,
        question:this.questions
      }

      localQuiz = JSON.stringify(localQuiz)

      localStorage.setItem('newQuiz',localQuiz)
    },10000)
  },
  methods: {
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
      axios.post("/api/quiz", {name:this.quizName,questions:this.questions}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
          this.$store.commit('addQuiz',res.data)
          this.$router.push({name:'Home'})
      }).catch(err => {
          alert(`An error has happend :(. Message:${err}`)
      })
    },
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  }
};
</script>
<style lang="scss">
@import '../sass/settings';
.ytpopup{

  &__overlay{
    height: 100vh;
    width: 100vw;
    position: fixed;
    background-color: rgba(0, 0, 0, .3);
    z-index: 1;
    top: 0;
    left: 0;
    animation: fade-in .4s;
  }
}

.ytpopup__content{
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%,-50%);
  background-color: #ffffff;
  font-family: 'wendy one';
  text-align: center;
  font-size: 1.4rem;
  padding: 2rem 5rem;
  border-radius: .3rem;
  animation: fade-in .4s;

  h3{
    margin-bottom: 2rem;
  }

  input{
    outline: none;
    border-bottom:.2rem solid;
    transition: all .2s;
    width: 110%;
    margin: 0 auto;
    margin-bottom: 2rem;

    &:focus{
      border-bottom:.2rem solid #FF1744;
    }
  }

  button{
    display: block;
    margin: 0 auto;
    background: #FF1744;
    padding: .2rem .7rem;
    border-radius: .3rem;
    color: #ffffff;
    outline: none;

    &:hover,&:focus{
      background-color: lighten(#FF1744,7);
    }

    &:active{
      background-color: lighten(#FF1744,12);
    }
  }

  svg{
    cursor: pointer;
    height: 1rem;
    position: absolute;
    top: 5%;
    right: -30%;
  }
}
.quiz-maker{

  &__name-input{
    text-align: center;
    width: 50%;
    border-bottom:solid .2rem;
    margin: 0 auto;
    display: block;
    outline: none;
    font-family: 'wendy one';
    letter-spacing: .03rem;
    transition: all .4s;

    &:focus{
      border-bottom:#248CEC solid .2rem;
    }
  }

  &-main{
    font-size: 2rem;

    .quiz__text-question &__text-title{
      font-size: 1.7rem;
      width: 100%;
      transition: all .2s;
      border: none;

      &:focus{
        border-bottom:.4rem solid #4396da;
      }
    }

    &__deleteQuestionBtn{
      display: inline-block;
      height: 1.7rem;
      width: 1.7rem;
      position: relative;
      top: 2.6rem;
      left: -3rem;
      cursor: pointer;
      fill: #757575;
      transition: all .2s;

      &:hover,&:focus{
        fill: darken(#757575,5);
      }

      &:active{
        fill: darken(#757575,10);
      }
    }

    &__save-btn{
      font-family: 'wendy one';
      position: relative;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      margin-top: 4rem;

      &:hover,:focus{
          transform: translateX(-50%) translateY(-.3rem);
      }

      &:active{
          transform: translateX(-50%) translateY(-.1rem);
      }
    }

    &__textarea{
      resize: none;
      font-family: inherit;
      border: .2rem solid #4396da;
      border-radius: .4rem;
      display: block;
      width: 80%;
      height: 10rem;
      padding: 1rem;
      font-size: 1.5rem;
      outline: none;
      transition: all .2s;

      &:focus{
        border: .2rem solid darken(#4396da,10);
      }
    }

    &__question-title{
      border-bottom: .2rem solid;
      outline: none;
      transition: all .2s;
      margin-bottom: 1rem;

      &:focus{
        border-bottom: .2rem solid #248CEC;
      }
    }

    &__question-option{
      text-align: left;
      margin-bottom: 1rem;
      outline: none;
      border-bottom: 2px solid;
      box-sizing: border-box;
      transition: all .2s;
      margin-right: 1rem;

      &--correct{
        border-bottom: .3rem solid #00E676;
      }

      &--incorrect{
        border-bottom: .3rem solid #ff4444;
      }
    }

    &__icon{
      background:transparent;
      width: 2rem;
      height: 2rem;
      position: relative;
      top: .5rem;
      transition: all .2s;

      &--correct{
        fill: #00E676;
      }

      &--incorrect{
        fill: #ff4444;
      }
    }

    &__is-correct-btn{
      outline: none;

      &:hover .quiz-maker-main__icon,&:focus .quiz-maker-main__icon{
        &--correct{
          fill: darken(#00E676,5);
        }

        &--incorrect{
          fill: lighten(#ff4444,7);
        }
      }

      &:active .quiz-maker-main__icon{
        &--correct{
          fill: darken(#00E676,10);
        }

        &--incorrect{
          fill: lighten(#ff4444,12);
        }
      }
    }
  }

  &__nq-container{
    background-color: #248CEC;
    height: 5rem;
    width: 5rem;
    color: #ffffff;
    border-radius: 50%;
    font-size: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    flex-direction: column;
    position: fixed;
    bottom: 5%;
    right: 3%;
    transition: all .4s;
    transform: translateY(0);
    box-shadow: 3px 5px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    user-select: none;

    .quiz-maker__nq-btn{
      opacity: 0;
      font-size: 0;
      outline: none;
      border-radius: .3rem;
      transition: all .4s;
      font-family: 'wendy one';
      display: block;
      background: #4FAAFF;
      width: 100%;
      user-select: none;
    }

    &:focus,&:focus-within{
      border-radius: 1rem;
      width: 15rem;
      height: 20rem;
      font-size: 0;
      justify-content: flex-start;
      padding: 1rem;

      .quiz-maker__nq-btn{
        font-size: 2rem;
        margin: 1rem;
        padding: .3rem;
        opacity: 1;

        &:hover{
          background-color: darken(#4FAAFF,5);
        }

        &:focus{
          background-color: darken(#4FAAFF,7);
        }
      }
    }

  }
}
</style>