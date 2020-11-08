<template>
  <div v-if="user" class="home">
    <header class="header">
      <h1 class="header__title u-f40">Wellcome Back {{user.name}}!</h1>
    </header>
    <h2 class="home-main__title">Your Quizzes</h2>
    <main class="home-main">
      <router-link v-for="quiz in quizzes" :key="quiz._id" :to="{ name:'takeQuiz',params:{id:quiz._id} }" class="home-main__card">
        <h2>{{quiz.name}}</h2>
        <div class="home-main__preview-cover"></div>
        <iframe class="home-main__preview" :src="`/quiz/${quiz._id}/take`" frameborder="0"></iframe>
      </router-link>
    </main>
  </div>
  <Wellcome v-else />
</template>
<script>
import Wellcome from '../components/Wellcome'
export default {
  name: "Home",
  components:{
    Wellcome
  },
  data() {
    return {
      Myquizzes: null,
      dialog: false,
      quizId:null,
    };
  },
  created(){
  
  },
  methods:{
    goToQuizPage(id){this.$router.push({name:'quizPage',params:{id}})},
    goToAssignedQuiz(id){this.$router.push({name:'takeQuiz',params:{id}})},
  },
  computed: {
    quizzes() {
      return this.$store.state.quizzes;
    },
    user(){
      return this.$store.state.user
    }
  },
};
</script>
<style lang="scss">
.home-main{
  display: flex;
  flex-wrap: wrap;

  &__title{
    text-align: center;
    display: block;
    font-family: 'wendy one';
    letter-spacing: .1rem;
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  &__card{
    height: 15rem;
    width: 15rem;
    background: #eeeeee;
    position: relative;
    box-shadow: 3px 6px 5px rgba(0, 0, 0, 0.25);
    margin: 1rem;
    text-align: center;
    font-family: 'wendy one';
    border-radius: .3rem;
    letter-spacing: .1rem;
    color: currentColor;
    text-decoration: none;
    padding: .4rem;
    transition: all .2s;

    &:hover,&:focus{
      transform: translateY(-.5rem);
    }
  }

  &__preview{
    background: #ffffff;
    z-index: 2;
  }

  &__preview-cover{
    z-index: 3;
  }

  &__preview,&__preview-cover{
    width: 140rem;
    height: 100rem;
    transform: scale(0.1);
    position: absolute;
    top: -280%;
    left: -416.8%;
    user-select: none;
    border-radius: 2rem;
    cursor: pointer;
  }

}
</style>