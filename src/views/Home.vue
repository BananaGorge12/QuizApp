<template>
  <v-app class="home">
    <h1>Home</h1>
    <h3>Your Quizzes</h3>
    <ul v-if="Myquizzes.length > 0">
      <li class="u-link" v-for="(quiz, index) in Myquizzes" :key="index" @click="goToQuizPage(quiz._id)">
        <span>{{ quiz.name }}</span>
      </li>
    </ul>
    <ul v-else><li>You dont have any quizzes.</li></ul>
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
    goToQuizPage(id){
      this.$router.push({name:'quizPage',params:{id}})
    },
  },
  created() {
    //waits for data to come
    const checkForData = setInterval(() => {
      if (this.storeQuizzes) {
        this.Myquizzes = this.storeQuizzes;
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