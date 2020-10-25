<template>
  <v-app class="login">
    <h1>Login</h1>
    <v-form class="login__form">
      <v-text-field v-model="email" label="E-mail" required></v-text-field>

      <v-text-field
        label="Password"
        required
        :type="show1 ? 'text' : 'password'"
        v-model="password"
      ></v-text-field>

      <v-btn @click="login" color="blue">login!</v-btn>

      <p class="body-2 u-error-message" v-if="feedback">{{ feedback }}</p>
    </v-form>
  </v-app>
</template>


<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      show1: 1,
      email: null,
      password: null,
      conut: 5,
      feedback: null,
    };
  },
  created(){
    if(this.token){
        this.$router.push({ name: "Home" })
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
          //count down
            this.conutDown();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    conutDown() {
      this.feedback = `Redirecting in ${this.conut}`;
      this.conut--;
      if (this.conut < 0) {
        return location.reload();
      }
      setTimeout(() => {
        this.conutDown();
      }, 1000);
    },
  },
  computed: {
    token() {
      return this.$store.state.token();
    },
  },
};
</script>
<style lang="scss">
.login {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 60px;

  &__form {
    width: 50%;
    margin: 50px auto;
  }
}
</style>