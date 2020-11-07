<template>
    <v-app v-if="quiz" class="take-quiz" :class="{'.u-loading':loading}">
        <h1 class="take-quiz__quiz-name">{{quiz.name}}</h1>
        <form @submit.prevent="turnInQuiz" action="#">
            <ul>
                <li class="take-quiz__question" v-for="(question,index) in quiz.questions" :key="index">
                    <h3>{{question.title}}</h3>
                    <v-radio-group v-for="(option,index) in question.options" :key="index" v-model="question.selected">
                      <v-radio
                        class="u-no-margin"
                        :label="option.title"
                        :value="option.title"
                      ></v-radio>
                    </v-radio-group>
                </li>
            </ul>
            <input class="take-quiz__btn" type="submit">
        </form>
        <h4 class="take-quiz__score" v-if="score">{{score}}</h4>
        <p class="u-error-message" v-if="feedback">{{feedback}}</p>
    </v-app>
    <h1 v-else>loading</h1>
</template>
<script>
import axios from 'axios'
export default {
    name:'takeQuiz',
    data(){
        return{
            quiz:null,
            currentName:null,
            feedback: null,
            finished:false,
            score:null,
            loading:false,
        }
    },
    async created(){
        await this.loadQuiz()
        this.validiteUser()
    },
    methods:{
        validiteUser(){
            let isUserAllowed = false
            
            //if owner tries to take the test
            if(this.user._id == this.quiz.owner){
                return isUserAllowed = true
            }

            this.quiz.students.forEach(student => {
                if(student.id == this.user._id){
                    isUserAllowed = true
                }
            })

            if(!isUserAllowed){
                this.$router.push({ name: "Home" });
            }
        },
        turnInQuiz(){
            //tells vue user finished the quiz
            this.finished = true

            //checks quiz
            const score = this.checkQuiz()
            this.score = `${score}/100`

            //stops function if user is owner
            if(this.user._id == this.quiz.owner){return}

            //genarate results object
            const result = this.generateResultsObject(score)
            
            axios.post(`/api/quiz/${this.$route.params.id}/answer`,result,{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log(res)
            }).catch(err => {
                this.feedback = err.response.data
            })
        },

        generateResultsObject(score){
            //constactor for results
            const results = {
                name:this.user.name,
                email:this.user.email,
                score,
                answers:[]
            } 

            //puts answers in object
            this.quiz.questions.forEach(question => {
                results.answers.push({
                    title:question.title,
                    answer:question.selected,
                })
            })
            
            return results
        },
        //calc quiz result
        checkQuiz(){
            let correctAnswers = 0

            this.quiz.questions.forEach(question => {
                //gets corrects answers
                const correctOptions = question.options.filter(option => option.correct)
                //checks answers
                if(correctOptions.every(option => option.title == question.selected)){
                    correctAnswers++
                }
            })

            const score = correctAnswers * (100/this.quiz.questions.length)
            return Math.round(score)
        },

        async loadQuiz(){
            await axios.get(`/api/quiz/${this.$route.params.id}`).then(res => {
                this.quiz = res.data
            }).catch(err => {
                console.error(err)
            })
        },
        getCorrectAnswer(question){
            const correctAnswer = question.options.filter(option => option.correct)
            return correctAnswer[0].title
        }
    },
    computed:{
        user(){
            return this.$store.state.user
        }
    },
}
</script>
<style lang="scss">
.take-quiz {
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
    margin: 50px auto 20px;
    width: 50%;
    background-color: #2196F3;
    color: white;
    padding: 10px 25px;
    border-radius: 10px;
    width: 300px;
    display: block;
    outline: none;

    &:hover{
        background-color: #1976D2;
    }

    &:active{
        background-color: #1565C0;
    }
  }

  &__score{
      font-size: 22px;
      font-weight: 500;
  }

  &__input {
    outline: none;
    margin-bottom: 10px;
  }

  &__question {
    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }

  &__correct-btn {
    cursor: pointer;
  }

  &__option{
      margin-left: 10px;

      &--correct{
          color: #00C853;
      }

      &--incorrect{
          color: #D50000;
      }
  }
}
</style>