<template>
  <v-app class="home">
    <h1>Home</h1>
    <h3>Your Quizzes</h3>
    <ul>
      <li class="u-pointer" v-for="(quiz, index) in quizzes" :key="index" @click="openDialog(quiz._id)">
        <span>{{ quiz.name }}</span>
      </li>
    </ul>
    <!-- logout popup -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="h1">What do you want to do?</v-card-title>
          <v-card-text>Click "Take" to take the Quiz. Click "Edit" to edit the quiz. Click "Close" to cancel.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="goToTake(quizId)">Take</v-btn>
            <v-btn color="blue darken-1" text @click="goToEdit(quizId)">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- End of popup -->
  </v-app>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      quizzes: null,
      dialog: false,
      quizId:null,
    };
  },
  methods:{
    openDialog(id){
      this.quizId = id
      this.dialog = true
    },
    goToEdit(id){
      this.$router.push({name:'editQuiz',params:{id}})
    },
    goToTake(id){
      this.$router.push({name:'takeQuiz',params:{id}})
    }
  },
  created() {
    //waits for data to come
    const checkForData = setInterval(() => {
      if (this.storeQuizzes) {
        this.quizzes = this.storeQuizzes;
        clearInterval(checkForData);
      }
    }, 100);
  },
  computed: {
    storeQuizzes() {
      return this.$store.state.quizzes;
    },
  },
};
</script>
<style lang="scss">
.home {
  width: 70%;
  margin: 0 auto;
}
</style>