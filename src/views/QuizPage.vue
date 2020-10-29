<template>
  <v-app v-if="quiz" class="quiz-page">
    <h1 class="quiz-page__title">{{quiz.name}}</h1>
    <v-data-table :headers="headers" :items="students" item-key="name" class="elevation-1">
      <template v-slot:[`item.viewResultsButtons`]="{ item }">
        <v-icon class="u-pointer" @click="viewResults(item)">mdi-eye</v-icon>
      </template>
    </v-data-table>
    <v-row no-gutters align="center">
      <v-btn class="flex-grow-1" color="blue lighten-1" @click="formDialog = true">Add New Student</v-btn>
      <v-btn class="flex-grow-1" color="yellow lighten-1" @click="sendToEdit">Edit Quiz</v-btn>
      <v-btn class="flex-grow-1" color="green lighten-1" @click="sendToTest">Test Quiz</v-btn>
      <v-btn class="flex-grow-1" color="red lighten-1" @click="deleteDataPopup = true; deleteDataPopupName = 'quiz'">Delete Quiz</v-btn>
    </v-row>
    <p v-if="feedback">{{feedback}}</p>
    <!-- start of form popup -->
    <v-dialog v-model="formDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Student</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="newStudentEmail" label="Email" required></v-text-field>
              </v-col>
            </v-row>
            <p class="u-error-message" v-if="popupFeedback">{{popupFeedback}}</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="formDialog = false; popupFeedback = null">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addNewStudent">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end of from popup. start of delete quiz popup -->
      <v-dialog v-model="deleteDataPopup" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this {{deleteDataPopupName}}?</v-card-title>
        <v-card-text>By deleting the {{deleteDataPopupName}} you or your student won't be able to access this quiz, and all recored of it will be removed for ever(a long time!).</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteDataPopup = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteData">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end of delete quiz popup. start of student results popup -->
      <v-dialog v-model="studentResultsPopup" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="studentResultsPopup = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
          </v-toolbar>
          <!-- start of context -->
        <div v-if="selectedStudentData" class="quiz-page__student-results">
          <h1 class="u-ma-b">Student: <span class="u-bold">{{selectedStudentData.name}}</span></h1>
          <div v-if="selectedStudentData.answers" class="quiz-page__student-results-data">
                <h2 class="u-ma-b">Score: <span class="u-bold">{{selectedStudentData.score}}</span></h2>
                <h2 class="u-ma-b">Answers:</h2>
                <ul>
                  <li class="u-ma-b" v-for="(question,index) in selectedStudentData.answers" :key="index">
                    <h3>Question: {{question.title}}</h3>
                    <h3 class="u-indent">Student Answer: "{{question.answer}}"</h3>
                    <h3 class="u-indent">Correct: {{isAnswerCorrect(question.answer,index)}}</h3>
                    <h3 v-if="getCorrectAnswer(index).length < 2" class="u-indent">Correct Answer: "{{getCorrectAnswer(index)[0].title}}"</h3>
                    <h3 class="u-indent" v-else>
                      <span>Correct Answers</span>
                      <ul>
                        <li v-for="(answer,indexTwo) in getCorrectAnswer(index)" :key="indexTwo">"{{ answer.title }}"</li>
                      </ul>
                    </h3>
                  </li>
                </ul>
          </div>
          <h2 class="u-ma-b" v-else>Student didnt take the quiz</h2>
          <v-btn color="red" @click="deleteDataPopup = true; deleteDataPopupName = 'student'">Delete User</v-btn>
        </div>
        <h1 v-else>No User Selected</h1>
        </v-card>
    </v-dialog>
    <!-- end of student results popup -->
  </v-app>
  <h1 v-else>loading..</h1>
</template>
<script>
import axios from 'axios'
export default {
  name: "quizPage",
  data() {
    return {
      //remove
      selectedStudentData:null,
      quiz:false,
      formDialog:false,
      deleteDataPopup:false,
      deleteDataPopupName:null,
      studentResultsPopup:false,
      newStudentEmail:null,
      popupFeedback:null,
      students: [],
      feedback:null,
      headers:[
        { text: 'Student', align: 'start', sortable: false, value: 'name',},
        { text: 'Email', value: 'email' },
        { text: 'Score', value: 'score' },
        { text: 'View', value: 'viewResultsButtons' },
      ]
    };
  },
  async created() {
    await this.getQuizzesData()
    // this.setStudentsScore()
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
            this.deleteDataPopup = false
            this.studentResultsPopup = false
        }).catch(err => {
            console.error(err.response.data)
            this.feedback = err.response.data
            this.deleteDataPopup = false
            this.studentResultsPopup = false
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
        if(!this.newStudentEmail){
          return this.popupFeedback = 'Please Enter An Email'
        }
        this.feedback = null

        axios.post(`/api/quiz/${encodeURIComponent(this.$route.params.id)}/students`,{email:this.newStudentEmail},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(res => {
            this.students.push(res.data)
            this.newStudentEmail = null
            this.popupFeedback = null
            this.formDialog = false
        }).catch(err => {
            console.error(err.response.data)
            this.popupFeedback = err.response.data
            this.newStudentEmail = null
        })
      },
      getQuizzesData(){
        return new Promise((resolve) => {
          let timesLooped = 0
          //waits for data to come
          const checkForData = setInterval(() => {
            if (this.storeQuizzes) {

                this.quiz = this.storeQuizzes;

                //gets correct quiz to edit
                this.quiz = this.quiz.filter(quiz => quiz._id == this.$route.params.id)
                this.quiz = this.quiz[0]

                //adds students to table
                this.quiz.students.forEach(student => {
                  this.students.push(student)
                })

                this.setStudentsScore()

                clearInterval(checkForData);
                resolve()
            }

            if(timesLooped > 100){
                this.$router.push({ name: "Home" });
            }

            timesLooped++
          }, 100);
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
    .quiz-page {
      width: 70%;
      margin: 0 auto;
      text-align: center;

      &__title{
          margin-bottom: 40px;
      }

      &__student-results *{
        font-weight: 500;
      }
    }
</style>