<template>
    <div v-if="quiz" class="take-quiz">
        <header class="header">
            <h1 class="header__title">{{ quiz.name }}</h1>
        </header>
        <form class="quiz-main">
            <ul>
                <li v-for="(question,index) in quiz.questions" :key="index">
                    <div v-if="question.type == 'text'" class="quiz__text-question">
                        <h3 class="quiz__title">{{ question.title }}</h3>
                        <input type="text" v-model="question.studentAnswer" class="quiz__answer-input" placeholder="Answer">
                    </div>
                    <div v-if="question.type == 'multi'" class="quiz__muli-choice">
                        <h3 class="quiz__title">{{ question.title }}</h3>
                        {{newId()}}
                        <ul class="u-no-list-style">
                            <li class="quiz__multi-choice-option" v-for="(option,index) in question.options" :key="index">
                                <input v-model="question.studentAnswer" class="quiz__radio-input" type="radio" :id="`${option.title}+${index}`" :name="currentId">    
                                <label :for="`${option.title}+${index}`" class="quiz__multi-choice-option-label">
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
        }
    },
    async created(){
        await this.loadQuiz()
        this.validiteUser()
    },
    methods:{
        newId(){
            const id = uniqid()
            
            this.currentId = id
            return null
        },
        getVideoId(url){
            const id = new URLSearchParams(url).entries().next().value[1]
            return id
        },
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

</style>