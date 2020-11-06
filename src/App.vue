<template>
  <div id="app">
    <Navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  name: "App",
  components: {
    Navigation,
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
@import url('./sass/header.scss');
@import "./sass/form";

#app{
  position: relative;
}

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

.u-f40{
  font-size: 4rem !important;
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

//fonts
@font-face {
  font-family: 'wendy one';
  src: url('./fonts/WendyOne-Regular.ttf');
}

@font-face {
  font-family: roboto;
  src: url('./fonts/Roboto-Regular.ttf');
}


</style>