<template>
  <div class="quiz-page">
    <header class="header">
      <h1 class="header__title">{{ quiz.name }}</h1>
    </header> 
    <main class="quiz-page-main">
      <!-- table with students -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Score</th><th/>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student,index) in students" :key="index">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.score}}</td>
            <td>
              <svg @click="studentPopup = true; setStudentData(index)" class="icon icon-eye">
                <symbol id="icon-eye" viewBox="0 0 32 32">
                  <path d="M16 6c-8.837 0-16 10-16 10s7.163 10 16 10 16-10 16-10-7.163-10-16-10zM16 22c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6zM16 12c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"></path>
                </symbol>
                <use xlink:href="#icon-eye"></use>
              </svg>
            </td>
          </tr>
          <tr v-if="students.length <= 0">
            <h3>No Students Added Yet..</h3>
          </tr>
        </tbody>
      </table>
      <!-- actios buttons -->
      <div class="quiz-page-main__btn-row">
        <button class="quiz-page-main__btn" @click="popupData = { func:'add',title:'Add New User',placeholder:'Email',btn:'Add',YorN:false }">New Student</button>
        <button class="quiz-page-main__btn">Add Class</button>
        <button class="quiz-page-main__btn" @click="sendToEdit">Edit Quiz</button>
        <button class="quiz-page-main__btn" @click="sendToTest">Test Quiz</button>
        <button class="quiz-page-main__btn" @click="popupData = { func:'delete',title:'Are You Sure You Want To Delete This Quiz?',YorN:true,btn:'Delete'}">Delete Quiz</button>
      </div>
      <p v-if="feedback" class="feedback">{{feedback}}</p>
    </main>
    <!-- popup -->
    <div v-if="popupData" class="form-popup">
      <div class="form-popup__overlay"></div>
      <div class="form-popup__content">
        <svg class="form-popup__icon icon-cross" @click="popupData = null">
          <symbol id="icon-cross" viewBox="0 0 32 32">
            <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
          </symbol>
          <use xlink:href="#icon-cross"></use>
        </svg>
        <h3 class="form-popup__title">{{popupData.title}}</h3>
        <input v-if="!popupData.YorN" v-model="popupInput" class="form-popup__input" :placeholder="popupData.placeholder" type="text">
        <button @click="popupFunc(popupData.func)" :class="{ 'form-popup__btn--red':popupData.func == 'delete'||'removeStudent' }" class="form-popup__btn">{{popupData.btn}}</button>
      </div>
    </div>
    <!-- student results -->
    <div class="student" :class="{ 'student--active':studentPopup }">
      <div class="student__bar">
        <button class="student__bar-btn" @click="saveStudentData">Save</button>
        <svg @click="studentPopup = false" class="student__close-btn icon-cross">
          <symbol id="icon-cross" viewBox="0 0 32 32">
            <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
          </symbol>
          <use xlink:href="#icon-cross"></use>
        </svg>
      </div>
      <Loader v-if="popupLoader" />
      <!-- user name and email -->
      <h1 v-if="!popupLoader" class="student__title">{{studentData.name}}</h1>
      <h1 v-if="!popupLoader" class="student__title">{{studentData.email}}</h1>
      <!-- student's score -->
      <h1 v-if="!popupLoader && studentData.score" class="student__title"><span contenteditable>{{studentData.score}}</span>/100</h1>
      <!-- if student has not answered the quiz -->
      <h2 v-else-if="!popupLoader" class="student__title">Student has not answered this quiz yet.</h2>
      <ul v-if="!popupLoader" class="student__answers">
        <li class="student__answer-li" v-for="(question,index) in studentData.answers" :key="index">
          <!-- question name -->
          <h2 class="student__que-title">{{ question.title }}</h2>
          <!-- question answer -->
          <ul class="u-indent" :class="{ 'u-center':'correct' in studentData && !getCorrectAnswer(index) }">
            <!-- student's answer -->
            <li class="student__answer">{{studentData.name}}'s answer: "{{question.answer}}"</li>
            <li v-if="getCorrectAnswer(index) && !getCorrectAnswer(index).more" class="student__answer">Answer: {{getCorrectAnswer(index)}}</li>
            <!-- if more then 1 correct answer -->
            <div v-else-if="getCorrectAnswer(index).more">
              <h3>Answers:</h3>
              <ul>
                <li v-for="(option,optionIndex) in getCorrectAnswer(index).answer" :key="optionIndex">{{ option.title }}</li>
              </ul>
            </div>
            <!-- manual grading for text questions -->
            <div v-else-if="!getCorrectAnswer(index)" :class="{ 'student__manual--chosen':'correct' in question }" class="student__manual">
              <div v-if="!question.correct" class="student__btn-warpper">
                <!-- checkmark btn -->
                <svg @click="manualGrade('correct',index)" class="student__grade-btn student__grade-btn--checkmark icon icon-checkmark">
                  <symbol id="icon-checkmark" viewBox="0 0 32 32">
                    <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
                  </symbol>
                  <use xlink:href="#icon-checkmark"></use>
                </svg>
                <!-- X btn -->
                <svg @click="manualGrade('incorrect',index)" class="student__grade-btn student__grade-btn--times icon icon-cross">
                  <symbol id="icon-cross" viewBox="0 0 32 32">
                    <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                  </symbol>
                  <use xlink:href="#icon-cross"></use>
                </svg>
              </div>
                <!-- after selected btn -->
              <svg :class="{ 'student__grade-btn student__grade-btn--times':question.correct == 'false','student__grade-btn--checkmark':question.correct == 'true' }" @click="manualGrade('toggle',index)" v-if="'correct' in question" class="icon student__grade-btn">
                <symbol id="icon-cross" viewBox="0 0 32 32">
                    <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                </symbol>
                <symbol id="icon-checkmark" viewBox="0 0 32 32">
                  <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
                </symbol>
                <use v-if="question.correct == 'true'" xlink:href="#icon-checkmark"></use>
                <use v-else-if="question.correct == 'false'" xlink:href="#icon-cross"></use>
              </svg>
            </div>
          </ul>
        </li>
      </ul>
      <div class="student__bottom-btn-wrapper">
        <button class="quiz-page-main__btn" @click="saveStudentData">Save</button>
        <button class="quiz-page-main__btn" @click="popupData = { func:'removeStudent',title:'Are You Sure You Want To Remove This Studnet?',YorN:true,btn:'Remove'}">Remove</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Loader from '../components/Loader'
export default {
  name: "quizPage",
  components:{
    Loader
  },
  data() {
    return {
      popupInput:null,
      popupData:false,
      quiz:false,
      students: [],
      feedback:null,
      studentData:true,
      studentPopup:false,
      popupLoader:false,
    };
  },
  created(){
    //checks if user is allowed
    if(!this.storeQuizzes){
      return this.$router.push({ name:'Home' })
    }

    this.quiz = this.storeQuizzes.filter(quiz => quiz._id == this.$route.params.id)[0]

    if(!this.quiz){
      return this.$router.push({ name:'Home' })
    }

    this.students = this.quiz.students
  },
  methods: {
      saveStudentData(){
        const newStudentData = {...this.studentData}
        const studnetId = this.students.filter(student => student.email == this.studentData.email)[0].id
        const studentNameAndEmail = { name:this.studentData.name,email:this.studentData.email }
        
        delete newStudentData.email
        delete newStudentData.name

        this.popupLoader = true

        axios.patch(`/api/${this.$route.params.id}/answer?sid=${studnetId}`,newStudentData,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }).then(res => {
            this.studentData = {
              ...res.data,
              ...studentNameAndEmail
            }
            this.popupLoader = false
        }).catch(err => {
            this.feedback = err.response.data.error
            this.popupLoader = false
        })
      },
      //sets student data by index
      setStudentData(index){
        let selectedStudentData = this.quiz.answers[index]

        if(!selectedStudentData){
          selectedStudentData = this.students[index]
        }

        this.studentData = selectedStudentData
        // console.log(selectedStudentData)
      },
      //for manual grading
      manualGrade(type,index){
        const scorePerQuetions = Math.round(100/this.studentData.answers.length)

        if(type == 'correct'){
          this.studentData.score += scorePerQuetions
          this.studentData.answers[index].correct = 'true'
        }
        else if(type == 'incorrect'){
          this.studentData.answers[index].correct = 'false'
        }
        else if(type == 'toggle'){
          if(this.studentData.answers[index].correct == 'false'){
            this.studentData.score += scorePerQuetions
            this.studentData.answers[index].correct = 'true'
          }else{
            this.studentData.score -= scorePerQuetions
            this.studentData.answers[index].correct = 'false'
          }
        }

        this.$forceUpdate();
      },
      //redirect to other views
      sendToEdit(){this.$router.push({name:'editQuiz',params:{id:this.quiz._id}})},
      sendToTest(){this.$router.push({name:'takeQuiz',params:{id:this.quiz._id}})},
      popupFunc(expr){
        switch(expr){
          case 'add':
            this.addNewStudent()
            break;
          case 'delete':
            this.deleteQuiz()
            break;
          case 'removeStudent':
            this.unassignStudent()
            break;

        }
      },
      //view Results
      viewResults(student){
        const StudentData = this.quiz.answers.filter(answer => answer.email === student.email)
        this.studentResultsPopup = true

        if(StudentData.length <= 0){
          return this.selectedStudentData = student
        }

        this.selectedStudentData = StudentData[0]
      },
      //gets correct answer by index
      getCorrectAnswer(index){
        const question = this.quiz.questions[index]


        const checkText = () => {
          if(!question.answer){
            return false
          }return question.answer
        }

        const checkMulti = () => {
          const correctAnswers = question.options.filter(option => option.correct)

          if(correctAnswers.length > 1){
            return { more:true,answer:correctAnswers }
          }

          return correctAnswers[0].title
        }

        //redirects to correct checking mehtod
        switch(question.type){
          case 'text':
            return checkText()
          case 'multi':
            return checkMulti()
        }


        return true
      },
      //remove user from quiz
      unassignStudent(){
        //gets student id
        const studnetId = this.students.filter(student => student.email == this.studentData.email)[0].id

        axios.delete(`/api/quiz/${this.$route.params.id}/students?sid=${studnetId}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }).then(res => {
            this.students = this.students.filter(student => student.id != res.data._id)
            this.studentPopup = false
            this.feedback = null
            this.popupData = null
        }).catch(err => {
            console.error(err.response.data)
            this.studentPopup = false
            this.feedback = err.response.data
            this.popupData = null
        })
      },
      //deletes quiz
      deleteQuiz(){
        axios.delete(`/api/quiz/${this.$route.params.id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(res => {
          this.$store.commit('removeQuiz',res.data._id)
          this.$router.push({name:'Home'})
        }).catch(err => {
          this.feedback = err.response.data
          this.deleteDataPopup = false
        })
      },
      //adds new student to quiz
      addNewStudent(){
        if(!this.popupInput){
          this.popupData = null
          return this.feedback = 'Please Enter An Email'
        }
        this.feedback = null

        axios.post(`/api/quiz/${encodeURIComponent(this.$route.params.id)}/students`,{email:this.popupInput},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(res => {
            this.students.push(res.data)
            this.feedback = null
            this.popupInput = null
            this.popupData = null
        }).catch(err => {
            this.feedback = err.response.data.error
            this.popupData = null
            this.popupInput = null
        })

      }
  },
  computed:{
    storeQuizzes(){
      return this.$store.state.quizzes
    },  
  }
};
</script>
<style lang="scss">
@import '../sass/form-popup';
@import '../sass/student-results';
.quiz-page{
  &-main{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: roboto;

    &__btn-row{
      width: 50%;
      display: flex;
      justify-content: space-around;
    }

    &__btn{
      background-color: #0085FF;
      font-family: 'wendy one';
      padding: .8rem 1.2rem;
      border-radius: .3rem;
      color: #ffffff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      outline: none;
      transition: all .2s;

      &:hover,&:focus{
        background-color: darken(#0085FF,5);
      }

      &:active{
        background-color: darken(#0085FF,10);
      }

      &:last-child{
        background-color: #F44336;

        &:hover,&:focus{
          background-color: darken(#F44336,5);
        }

        &:active{
          background-color: darken(#F44336,10);
        }
      }
    }

    table{
      border-collapse: collapse;
      font-size: 1.2rem;
      width: 50%;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      margin-bottom: 2rem;

      thead tr{
        background-color: #0085FF;
        color: #ffffff;
        text-align: left;
        font-weight: bold;
      }
    }

    th,td{
      padding: 1.2rem 1.5rem;
    }

    tbody tr{
      border-bottom: .1rem solid #dddddd;
      background: #ffffff;

      h3{
        background: none;
        width: 200%; 
        padding: 1rem;
      }

      svg{
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        fill: #979797;
      }

      &:nth-last-of-type(even){
        background-color: #f3f3f3;
      }

      &:last-child{
        border-bottom: .1rem solid #dddddd;
      }
    }
  }
}
</style>