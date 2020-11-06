<template>
  <div class="signup">
    <header class="header">
      <h1 class="header__title">Signup</h1>
    </header>
    <main>
      <form action="#" @submit.prevent="signup" class="form">
        <div class="form__field">
          <input v-model="name" placeholder=" " id="signup-form-name" type="name" class="form__text">
          <label class="label" for="signup-form-name">Name</label>
        </div>
        <div class="form__field">
          <input v-model="email" placeholder=" " id="signup-form-email" type="email" class="form__text">
          <label for="signup-form-email">Email</label>
        </div>
        <div class="form__field">
          <input v-model="password" placeholder=" " id="signup-form-password" type="password" class="form__text">
          <label for="signup-form-password">Password</label>
        </div>
        <div class="form__field">
          <input v-model="passwordV" placeholder=" " id="signup-form-password2" type="password" class="form__text">
          <label for="signup-form-password2">Password</label>
        </div>
        <button class="form__btn">Sign Up</button>
        <p v-if="feedback" class="form__feedback">{{ feedback }}</p>
      </form>
    </main>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      name:null,
      email:null,
      password:null,
      passwordV:null,
      feedback:null,
    };
  },
  methods: {
    signup() {
      if (!this.name || !this.email || !this.password || !this.passwordV) {
        return this.feedback = "Please Fill Out All Fields."
      }

      if(this.password != this.passwordV){
        return this.feedback = "Password Fields Don't Match"
      }

      //resets feedback
      this.feedback = null;

      //sign user up
      axios
        .post("/api/users/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(res => {
          this.feedback = "User created!";
          localStorage.setItem('token',res.data.token)
          location.reload()
        })
        .catch((err) => {
          this.feedback = err.response.data;
        });
    },
  },
  created(){
    let timesLooped = 0
    const loop = setInterval(() => {
      if (this.user) {
        clearInterval(loop)
        this.$router.push({ name: "Home" });
      }

      else if(timesLooped > 100){
        clearInterval(loop)
      }

      timesLooped++
    }, 100);
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  }
};
</script>
<style lang="scss">

</style>