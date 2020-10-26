<template>
  <v-app class="home">
    <h1>Home</h1>
    <h3>Your Quizzes</h3>
    <ul>
        <li v-for="(quiz,index) in quizzes" :key="index"><router-link :to="{name:'editQuiz',params:{id:quiz._id}}">{{quiz.name}}</router-link></li>
    </ul>
  </v-app>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
        quizzes:null
    };
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