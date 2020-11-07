<template>
  <div class="login">
    <header class="header">
      <h1 class="header__title">Login</h1>
    </header>
    <main>
      <form action="#" @submit.prevent="login" class="form">
        <div class="form__field">
          <input v-model="email" placeholder=" " id="login-form-email" type="email" class="form__text">
          <label for="login-form-email">Email</label>
        </div>
        <div class="form__field">
          <input v-model="password" placeholder=" " id="login-form-password" type="password" class="form__text">
          <label for="login-form-password">Password</label>
        </div>
        <button class="form__btn">Login</button>
        <p v-if="feedback" class="form__feedback">{{ feedback }}</p>
      </form>
    </main>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback:null,
    };
  },
  created() {
    if(this.user){
      return this.$router.push({ name:'Home' })
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        return (this.feedback = "Please Fill Out All Fields.");
      }
      this.feedback = null;

      //login
      axios
        .post("/api/users/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.feedback = "Loging in!";
          location.reload();
        })
        .catch((err) => {
          this.feedback = err.response.data.error;
        });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
};
</script>
<style lang="scss">

</style>