<template>
  <v-app class="new-quiz">
    <h1>Quiz Maker</h1>
    <h2><input type="text" class="new-quiz__quiz-name" v-model="quizName"></h2>
    <ul>
      <li
        v-for="(question, index) in questions"
        :key="index"
        class="new-quiz__question"
      >
        <h3>
          <input
            class="new-quiz__title-input"
            type="text"
            v-model="question.title"
          />
        </h3>
        <ol>
          <li v-for="(option, index) in question.options" :key="index">
            <input
              type="text"
              :class="{
                'new-quiz__input--green': option.correct,
                'new-quiz__input--red': !option.correct,
              }"
              class="new-quiz__input"
              v-model="option.title"
            />
            <v-icon
              class="new-quiz__correct-btn"
              @click="option.correct = false"
              v-if="option.correct"
              color="green"
              >mdi-checkbox-marked-circle</v-icon
            >
            <v-icon
              class="new-quiz__correct-btn"
              @click="option.correct = true"
              v-else
              color="red"
              >mdi-checkbox-marked-circle</v-icon
            >
          </li>
        </ol>
      </li>
    </ul>
    <v-btn @click="addNewQuestion" class="new-quiz__btn" color="blue"
      >New Question</v-btn
    >
    <v-btn
      @click="saveQuiz"
      class="new-quiz__btn"
      color="green"
      v-if="questions.length > 0"
      >Save</v-btn
    >
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "newQuiz",
  data() {
    return {
      questions: [],
      quizName:'New Quiz'
    };
  },
  created() {
      if(!localStorage.getItem('token')){
          this.$router.push({name:'Home'})
      }
  },
  methods: {
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
      }).then(() => {
          this.$router.push({name:'Home'})
      }).catch(err => {
          alert(`An error has happend :(. Message:${err}`)
      })
    },
  },
};
</script>
<style lang="scss">
.new-quiz {
  width: 70%;
  margin: 0 auto;

  ul {
    list-style: square;
  }

  * {
    margin: 0 auto;
  }

  h1,h2{
    margin-bottom: 20px;
  }

  &__quiz-name{
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