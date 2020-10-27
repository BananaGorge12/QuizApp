<template>
  <v-app v-if="quiz" class="edit-quiz">
    <h1>Quiz Editor</h1>
    <h2>
      <input type="text" class="edit-quiz__quiz-name" v-model="quiz.name" />
    </h2>
    <ul>
      <li
        v-for="(question, index) in quiz.questions"
        :key="index"
        class="edit-quiz__question"
      >
        <h3>
          <v-icon @click="deleteQuestion(index)" >mdi-trash-can</v-icon>
          <input
            class="edit-quiz__title-input"
            type="text"
            v-model="question.title"
          />
        </h3>
        <ol>
          <li v-for="(option, index) in question.options" :key="index">
            <input
              type="text"
              :class="{
                'edit-quiz__input--green': option.correct,
                'edit-quiz__input--red': !option.correct,
              }"
              class="edit-quiz__input"
              v-model="option.title"
            />
            <v-icon
              class="edit-quiz__correct-btn"
              @click="option.correct = false"
              v-if="option.correct"
              color="green"
              >mdi-checkbox-marked-circle</v-icon
            >
            <v-icon
              class="edit-quiz__correct-btn"
              @click="option.correct = true"
              v-else
              color="red"
              >mdi-checkbox-marked-circle</v-icon
            >
          </li>
        </ol>
      </li>
    </ul>
    <v-btn @click="addNewQuestion" class="edit-quiz__btn" color="blue"
      >New Question</v-btn
    >
    <v-btn
      @click="saveQuiz"
      class="edit-quiz__btn"
      color="green"
      v-if="quiz.questions.length > 0"
      >Save</v-btn
    >
  </v-app>
  <h1 v-else>loading</h1>
</template>
<script>
import axios from "axios";
export default {
  name: "editQuiz",
  data() {
    return {
      quiz:false,
    };
  },
  created() {
    if (!localStorage.getItem("token")) {
      this.$router.push({ name: "Home" });
    }

    //waits for data to come
    const checkForData = setInterval(() => {
      if (this.storeQuizzes) {
          this.quiz = this.storeQuizzes;
        //gets correct quiz to edit
        this.quiz = this.quiz.filter(quiz => quiz._id == this.$route.params.id)
        this.quiz = this.quiz[0]
        clearInterval(checkForData);
      }
    }, 100);
  },
  methods: {
    deleteQuestion(questionIndex){
      let index = 0
      this.quiz.questions = this.quiz.questions.filter(() => {
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
        title: `Question ${this.quiz.questions.length + 1}`,
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
      this.quiz.questions.push(newQuestion);
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
      }
  }
};
</script>
<style lang="scss">
.edit-quiz {
  width: 70%;
  margin: 0 auto;

  ul {
    list-style: square;
  }

  * {
    margin: 0 auto;
  }

  h1,
  h2 {
    margin-bottom: 20px;
  }

  &__quiz-name {
    text-align: center;
  }

  &__btn {
    margin: 50px auto 0;
    width: 50%;
  }

  &__input {
    outline: none;
    transition: all 0.2s linear;
    margin-bottom: 10px;
    width: 400px;

    &--green {
      border-bottom: 3px solid #00e676;
    }

    &--red {
      border-bottom: 3px solid #ff1744;
    }
  }

  &__title-input {
    margin-bottom: 20px;
    outline: none;
    box-sizing: border-box;
    &:focus {
      border: solid 2px #2196f3;
      border-radius: 30px;
    }
  }

  &__question {
    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }

  &__correct-btn {
    cursor: pointer;
  }
}
</style>