<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {};
  },
  methods: {
    //gets user
    async getUser() {
      await this.$store.dispatch("loadUserDataFromDB");
    },
    //gets quizzes
    async getQuizzes() {
      await this.$store.dispatch("loadQuizzesFromDB");
    },
  },
  asyncComputed: {
    async quizzes() {
      await this.getQuizzes()
      return this.$store.state.quizzes;
    },
    async user() {
      await this.getUser();
      return this.$store.state.user;
    },
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}

.v-application--wrap {
  min-height: 0;
}

.u-error-message {
  color: #e53935;
  margin-top: 20px;
}

.u-link{
  color: #2196F3;
  cursor: pointer;

  &:hover{
    text-decoration: underline;
  }
}

.u-ma-b{
  margin-bottom: 20px;
}

.u-bold{
  font-weight: 900 !important;
}

.u-loading{
  cursor: progress;
}

.u-indent{
  padding-left: 20px;
}

.u-pointer{
  cursor: pointer;
}

.u-no-margin{
  margin: 0 !important;
}

</style>