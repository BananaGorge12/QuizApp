<template>
  <v-app v-if="quiz" class="quiz-page">
    <h1 class="quiz-page__title">{{quiz.name}}</h1>
    <v-data-table :headers="headers" :items="students" item-key="name" class="elevation-1">
      <template v-slot:[`item.viewResultesButtons`]="{ item }">
        <v-icon class="u-pointer" @click="viewResuts(item)">mdi-eye</v-icon>
      </template>
    </v-data-table>
    <v-row no-gutters align="center">
      <v-btn class="flex-grow-1" color="blue lighten-1" @click="formDialog = true">Add New Student</v-btn>
      <v-btn class="flex-grow-1" color="yellow lighten-1" @click="sendToEdit">Edit Quiz</v-btn>
      <v-btn class="flex-grow-1" color="green lighten-1" @click="sendToTest">Test Quiz</v-btn>
      <v-btn class="flex-grow-1" color="red lighten-1" @click="deleteQuizPopup = true">Delete Quiz</v-btn>
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
      <v-dialog v-model="deleteQuizPopup" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this quiz?</v-card-title>
        <v-card-text>By deleting the quiz you or your student won't be able to access this quiz, and all recored of it will be removed for ever(a long time!).</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteQuizPopup = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteQuiz">Delete</v-btn>
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
          <v-subheader>User Controls</v-subheader>
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
      singleSelect: false,
      selected: [],
      quiz:false,
      formDialog:false,
      deleteQuizPopup:false,
      studentResultsPopup:false,
      newStudentEmail:null,
      popupFeedback:null,
      students: [],
      feedback:null,
      headers:[
        { text: 'Student', align: 'start', sortable: false, value: 'name',},
        { text: 'Email', value: 'email' },
        { text: 'Score', value: 'score' },
        { text: 'View', value: 'viewResultesButtons' },
      ]
    };
  },
  created() {
    this.getQuizzesData()
  },
  methods: {
      sendToEdit(){this.$router.push({name:'editQuiz',params:{id:this.quiz._id}})},
      sendToTest(){this.$router.push({name:'takeQuiz',params:{id:this.quiz._id}})},
      //view resultes
      viewResuts(student){
        student
        this.studentResultsPopup = true
      },
      //deletes quiz
      deleteQuiz(){
        axios.delete(`/api/quiz/${this.$route.params.id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(() => {
          this.$router.push({name:'Home'})
        }).catch(err => {
          this.feedback = err.response.data
          this.deleteQuizPopup = false
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

            clearInterval(checkForData);
        }

        if(timesLooped > 100){
            this.$router.push({ name: "Home" });
        }

        timesLooped++
    }, 100);
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
    }
</style>