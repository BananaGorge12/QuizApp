<template>
  <div class="quiz-maker">
    <header class="header">
      <h1 class="header__title u-f40">THE QUIZ MAKER!</h1>
    </header>
    <form @submit.prevent class="quiz-main quiz-maker-main">
      <ul>
        <li v-for="(question,index) in questions" :key="index">
          <input v-bind="question.title" class="quiz-maker-main__question-title">
          <ul class="quiz-main__list u-indent">
            <li v-for="(option,index) in question.options" :key="index">
              <input class="quiz-maker-main__question-option" type="text">
            </li>
          </ul>
        </li>
      </ul>
    </form>
    <button class="quiz-maker__nq-btn" @click="addNewQuestion">+</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "newQuiz",
  data() {
    return {
      questions: [
        {
          title: `Question 1`,
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
        }
      ],
      quizName:'New Quiz'
    };
  },
  created() {
    if(!this.user){
      return this.$router.push({ name:'Home' })
    }
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
    addNewQuestion() {
      const newQuestion = {
        title: `Question ${this.questions.length + 1}`,
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
  .quiz-maker{

    &-main{
      font-size: 2rem;

      &__question-title{
        border-bottom: 1px solid;
        outline: none;
        transition: all .2s;
        margin-bottom: 1rem;

        &:focus{
          border-bottom: 2px solid #248CEC;
        }
      }

      &__question-option{
        text-align: left;
        margin-bottom: 1rem;
        outline: none;
        border-bottom: 2px solid;
        box-sizing: border-box;
        transition: all .2s;

        &:focus{
          border-bottom: 2px solid #248CEC;
        }
      }
    }

    &__nq-btn{
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
      position: fixed;
      top: 85%;
      right: 3%;
      transition: all .2s;
      transform: translateY(0);
      box-shadow: 3px 5px 4px rgba(0, 0, 0, 0.25);

      &:hover,:focus{
        background-color: darken(#248CEC,5);
        transform: translateY(-.6rem);
        box-shadow: 4px 5px 4px rgba(0, 0, 0, 0.25);
      }

      &:active{
        background-color: darken(#248CEC,10);
        transform: translateY(-.3rem);
        box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
      }
    }
  }
</style>