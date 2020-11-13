<template>
  <div v-if="user" class="home">
    <header class="header">
      <h1 class="header__title u-f40">Wellcome Back {{user.name}}!</h1>
    </header>
    <h2 v-if="quizzes.length > 0" class="home-main__title">Your Quizzes</h2>
    <section v-if="quizzes.length > 0" class="home-main">
      <router-link v-for="quiz in quizzes" :key="quiz._id" :to="{ name:'quizPage',params:{id:quiz._id} }" class="home-main__card">
        <h2 class="home-main__card-title">{{quiz.name}}</h2>
        <img draggable="false" v-if="quiz.img" :src="`data:image/png;base64, ${quiz.img}`" class="home-main__preview">
        <Loader class="loader__card" v-else />
      </router-link>
    </section>
    <h2 v-if="assignedQuizzes.length > 0" class="home-main__title">Your Assigned Quizzes</h2>
    <section v-if="assignedQuizzes.length > 0" class="home-main">
      <router-link v-for="quiz in assignedQuizzes" :key="quiz._id" :to="{ name:'takeQuiz',params:{id:quiz._id} }" class="home-main__card">
        <h2 class="home-main__card-title">{{quiz.name}}</h2>
        <img draggable="false" v-if="quiz.img" :src="`data:image/png;base64, ${quiz.img}`" class="home-main__preview">
        <Loader class="loader__card" v-else />
      </router-link>
    </section>
    <h2 v-if="assignedQuizzes.length <= 0 && quizzes.length <= 0" class="home-main__title">No Quizzes... yet!</h2>
  </div>
  <Wellcome v-else />
</template>
<script>
import Wellcome from '../components/Wellcome'
import Loader from '../components/Loader'
import axios from 'axios'
export default {
  name: "Home",
  components:{
    Wellcome,
    Loader,
  },
  data() {
    return {
      Myquizzes: null,
      dialog: false,
      quizId:null,
    };
  },
  created(){
     this.getPreviewImg()
  },
  methods:{
    goToQuizPage(id){this.$router.push({name:'quizPage',params:{id}})},
    goToAssignedQuiz(id){this.$router.push({name:'takeQuiz',params:{id}})},
    //gets preview img
    async getPreviewImg(){
      await this.quizzes.forEach(async quiz => {
        await axios.get(`/api/preview/quiz/${quiz._id}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(res => {
          quiz.img = res.data
        }).catch(err => {
          console.error(err.response)
        })

        this.$forceUpdate()
      })

      await this.assignedQuizzes.forEach(async quiz => {
        await axios.get(`/api/preview/quiz/${quiz._id}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(res => {
          quiz.img = res.data
        }).catch(err => {
          console.error(err.response)
        })

        this.$forceUpdate()
      })

    },
  },
  computed: {
    quizzes() {
      return this.$store.state.quizzes;
    },
    assignedQuizzes(){
      return this.$store.state.assignedQuizzes
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
    height: 16rem;
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
    outline: none;

    &:hover,&:focus{
      transform: translateY(-.5rem);
    }
  }

  &__card-title{
    margin-bottom: 1rem;
  }

}
</style>