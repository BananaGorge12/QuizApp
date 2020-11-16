<template>
    <div v-if="quiz" class="take-quiz">
        <header class="header">
            <h1 class="header__title">{{ quiz.name }}</h1>
        </header>
        <form :style="bgImgStyle" @submit.prevent="turnInQuiz" class="quiz-main">
            <ul>
                <li class="quiz__question" v-for="(question,index) in quiz.questions" :key="index">
                    <div v-if="question.type == 'text'" class="quiz__text-question">
                        <h3 class="quiz__title">{{ question.title }}</h3>
                        <input type="text" v-model="question.studentAnswer" class="quiz__answer-input" placeholder="Answer">
                    </div>
                    <div v-if="question.type == 'multi'" class="quiz__muli-choice">
                        <h3 class="quiz__title">{{ question.title }}</h3>
                        <ul class="u-no-list-style">
                            <li class="quiz__multi-choice-option" v-for="(option,index) in question.options" :key="index">
                                <input v-model="question.studentAnswer" :value="option.title" class="quiz__radio-input" type="radio" :id="`${question.nameId}+${index}`" :name="`${question.title}+${question.nameId}`">    
                                <label :for="`${question.nameId}+${index}`" class="quiz__multi-choice-option-label">
                                    <span class="quiz__radio-btn"></span>
                                    <span>{{ option.title }}</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div v-if="question.type == 'video'" class="quiz__video">
                        <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${getVideoId(question.url)}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div v-else-if="question.type == 'paragraph'" class="quiz__paragraph">
                        <p>{{ question.text }}</p>
                    </div>
                </li>
            </ul>
            <button class="quiz__submit form__btn">Submit</button>
            <p v-if="feedback" class="feedback">{{feedback}}</p>
        </form>
    </div>
    <notFound v-else />
</template>
<script>
import notFound from './404'
import axios from 'axios'
import uniqid from 'uniqid'
export default {
    name:'takeQuiz',
    components:{
        notFound
    },
    data(){
        return{
            quiz:null,
            currentName:null,
            feedback: null,
            finished:false,
            score:null,
            loading:false,
            currentId:null,
            bgImgStyle:`background-image: url('/api/quiz/${this.$route.params.id}/background?token=${localStorage.getItem('token')}');`,
        }
    },
    async created(){
        this.setQuiz()
    },
    methods:{
        setQuiz(){
            //checks if user is a students
            if(this.assignedQuizzes){
                this.assignedQuizzes.forEach(quiz => {
                    if(quiz._id == this.$route.params.id){
                        return this.quiz = quiz
                    }
                })
            }

            //checks if user is owner
            if(this.quizzes){
                this.quizzes.forEach(quiz => {
                    if(quiz._id == this.$route.params.id){
                        return this.quiz = quiz
                    }
                })
            }

            //if user is not owner or studnet kicks him
            if(!this.quiz){
                console.log(this.$route.query.token)
                if(this.$route.query.token){
                    axios.get(`/api/quiz/${this.$route.params.id}`,{
                        headers: {
                          'Authorization': `Bearer ${this.$route.query.token}`
                        }
                    }).then(res => {
                        this.quiz = res.data
                    }).catch(() => {
                        return this.$router.push({ name: "Home" });
                    })

                }else{
                    return this.$router.push({ name: "Home" });
                }

            }

            //adds an id to each multi choice question
            this.quiz.questions.forEach(question => {
                if(question.type == 'multi'){
                    question.nameId = uniqid()
                }
            })

        },
        getVideoId(url){
            const id = new URLSearchParams(url).entries().next().value[1]
            return id
        },
        turnInQuiz(){
            //tells vue user finished the quiz
            this.finished = true

            //checks quiz
            const score = this.checkQuiz()
            this.score = score.text

            //stops function if user is owner
            if(this.user._id == this.quiz.owner){return}

            //genarate results object
            const result = this.generateResultsObject(score.autoPoints)
            
            //sends to db
            axios.post(`/api/quiz/${this.$route.params.id}/answer`,result,{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.error(err.response.data)
                this.feedback = err.response.data.error
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
                if(question.type != 'video' && question.type != 'paragraph'){
                    results.answers.push({
                        title:question.title,
                        answer:question.studentAnswer,
                    })
                }
            })
            
            return results
        },
        //calc quiz result
        checkQuiz(){
            let correctAnswers = 0
            let manulAnswers = 0
            let numberOfQuestions = 0

            this.quiz.questions.forEach(question => {
                if(question.type == 'multi'){
                    numberOfQuestions++
                    //gets corrects answers
                    const correctOptions = question.options.filter(option => option.correct)
                    //checks answers
                    if(correctOptions.every(option => option.title == question.studentAnswer)){
                        correctAnswers++
                    }
                }
                else if(question.type == 'text'){
                    if(!question.answer){
                        manulAnswers++
                    }else if(question.answer == question.studentAnswer){
                        correctAnswers++
                    }

                    numberOfQuestions++
                }
            })

            const scorePerQuestion = 100/numberOfQuestions
            let score = `${Math.round(correctAnswers * scorePerQuestion)}/100. ${Math.round(manulAnswers * scorePerQuestion)} points left for manual grading`

            return {
                text:score,
                autoPoints:Math.round(correctAnswers * scorePerQuestion)
            }
        },
        getCorrectAnswer(question){
            const correctAnswer = question.options.filter(option => option.correct)
            return correctAnswer[0].title
        }
    },
    computed:{
        user(){
            return this.$store.state.user
        },
        quizzes(){
            return this.$store.state.quizzes
        },
        assignedQuizzes(){
            return this.$store.state.assignedQuizzes
        }
    },
}
</script>
<style lang="scss">

</style>