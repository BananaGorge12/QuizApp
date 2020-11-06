<template>
  <div v-if="user" class="home">
    <header class="header">
      <h1 class="header__title u-f40">Wellcome Back {{user.name}}!</h1>
    </header>
    <main class="home-main">
      <div class="home-main__card">
        <h2>quiz 1</h2>
      </div>
      <div class="home-main__card">
        <h2>quiz 2</h2>
      </div>
      <div class="home-main__card">
        <h2>quiz 3</h2>
      </div>
      <div class="home-main__card">
        <h2>quiz 4</h2>
      </div>
      <div class="home-main__card">
        <h2>quiz 5</h2>
      </div>
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
.home-main{
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap;

  &__card{
    height: 20rem;
    width: 15rem;
    background: orangered;
    position: relative;
    margin: 1rem;
  }

  &__preview{
    z-index: 100;
    width: 100rem;
    height: 50rem;
    position: absolute;
    top: -97%;
    left:-283%;
    background: #ffffff;
    transform: scale(.14);
  }

}
</style>