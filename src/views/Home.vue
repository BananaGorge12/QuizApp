<template>
  <v-app class="home">
    <h1>Home</h1>
    <v-row>
      <v-row class="flex-column">
        <h3>Your Quizzes</h3>
        <ul v-if="Myquizzes && Myquizzes.length > 0">
          <li class="u-link" v-for="(quiz, index) in Myquizzes" :key="index" @click="goToQuizPage(quiz._id)">
            <span>{{ quiz.name }}</span>
          </li>
        </ul>
        <ul v-else><li>You dont have any quizzes.</li></ul>
      </v-row>
      <v-row class="flex-column">
        <h3>Your Assigned Quizzes</h3>
        <ul v-if="user && user.assignedQuizzes.length > 0">
          <li class="u-link" v-for="(quiz, index) in user.assignedQuizzes" :key="index" @click="goToAssignedQuiz(quiz.id)">
            <span>{{ quiz.name }}</span>
          </li>
        </ul>
        <ul v-else><li>You dont have any Assigned quizzes.</li></ul>
      </v-row>
    </v-row>
  </v-app>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      Myquizzes: null,
      dialog: false,
      quizId:null,
    };
  },
  methods:{
    goToQuizPage(id){this.$router.push({name:'quizPage',params:{id}})},
    goToAssignedQuiz(id){this.$router.push({name:'takeQuiz',params:{id}})},
    loadData(){
      return new Promise((resolve) => {
        const checkForData = setInterval(() => {
          if (this.storeQuizzes) {
            this.Myquizzes = this.storeQuizzes;
          }
          if(this.user && this.storeQuizzes){
            resolve()
            clearInterval(checkForData);
        }
      }, 100);
      })
    }
  },
  async created() {
    //waits for data to come
    await this.loadData()

  },
  computed: {
    storeQuizzes() {
      return this.$store.state.quizzes;
    },
    user(){
      return this.$store.state.user
    }
  },
};
</script>
<style lang="scss">
.home {
  width: 70%;
  margin: 0 auto;
}
</style>