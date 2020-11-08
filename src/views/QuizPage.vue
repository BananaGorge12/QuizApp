<template>
  <div class="quiz-page">
    <header class="header">
      <h1 class="header__title">{{ quiz.name }}</h1>
    </header> 
    <main class="quiz-page-main">
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
            <td>click</td>
          </tr>
          <tr v-if="students.length <= 0">
            <h3>No Students Added Yet..</h3>
          </tr>
        </tbody>
      </table>
      <div class="quiz-page-main__btn-row">
        <button class="quiz-page-main__btn" @click="popupData = { func:'add',title:'Add New User',placeholder:'Email',btn:'Add',YorN:false }">New Student</button>
        <button class="quiz-page-main__btn" @click="sendToTest">Edit Quiz</button>
        <button class="quiz-page-main__btn">Test Quiz</button>
        <button class="quiz-page-main__btn" @click="popupData = { func:'delete',title:'Are You Sure You Want To Delete This Quiz?',YorN:true,btn:'delete'}">Delete Quiz</button>
      </div>
      <p v-if="feedback" class="feedback">{{feedback}}</p>
    </main>
    <!-- popup -->
    <div v-if="popupData" class="form-popup">
      <div class="form-popup__overlay"></div>
      <div class="form-popup__content">
        <h3 class="form-popup__title">{{popupData.title}}</h3>
        <input v-if="!popupData.YorN" v-model="popupInput" class="form-popup__input" :placeholder="popupData.placeholder" type="text">
        <button v-if="popupData.YorN" @click="popupData = null" class="form-popup__btn">Cancel</button>
        <button @click="popupFunc(popupData.func)" class="form-popup__btn">{{popupData.btn}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "quizPage",
  data() {
    return {
      popupInput:null,
      popupData:false,
      quiz:false,
      students: [],
      feedback:null,
    };
  },
  created(){
    if(!this.storeQuizzes){
      this.$router.push({ name:'Home' })
    }

    this.quiz = this.storeQuizzes.filter(quiz => quiz._id == this.$route.params.id)[0]

    this.students = this.quiz.students
  },
  methods: {
      //sets user score
      setStudentsScore(){
        this.quiz.answers.forEach(answer => {
            this.students.forEach(student => {
               if(student.email === answer.email){
                  student.score = answer.score
               }
            })
        })
      },
      //redirect to other views
      sendToEdit(){this.$router.push({name:'editQuiz',params:{id:this.quiz._id}})},
      sendToTest(){this.$router.push({name:'takeQuiz',params:{id:this.quiz._id}})},
      //redirect to correct delete function
      deleteData(){
        if(this.deleteDataPopupName == 'quiz'){
          this.deleteQuiz()
        }else if(this.deleteDataPopupName == 'student'){
          this.unassignStudent()
        }
      },
      popupFunc(expr){
        switch(expr){
          case 'add':
            this.addNewStudent()
            break;
          case 'delete':
            this.deleteQuiz()
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
        const correctAnswers = this.quiz.questions[index].options.filter(option => option.correct)
        return correctAnswers
      },
      //checks if answer is correct
      isAnswerCorrect(answer,index){
        const correctAnswers = this.quiz.questions[index].options.filter(option => option.correct)

        let isStudentCorrect = false

        correctAnswers.forEach(correctAnswer => {
          if(correctAnswer.title == answer){
            isStudentCorrect = true
          }
        })

        return isStudentCorrect
      },
      //remove user from quiz
      unassignStudent(){
        //gets student id
        const sid = this.students.filter(student => student.email == this.selectedStudentData.email)[0].id

        axios.delete(`/api/quiz/${this.$route.params.id}/students?sid=${sid}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }).then(res => {
            this.students = this.students.filter(student => student.id != res.data._id)
            this.feedback = null
        }).catch(err => {
            console.error(err.response.data)
            this.feedback = err.response.data
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

      &:nth-last-of-type(odd){
        background-color: #f3f3f3;
      }

      &:last-child{
        border-bottom: .1rem solid #dddddd;
      }
    }
  }
}
</style>