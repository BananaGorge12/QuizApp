<template>
  <v-app class="signup">
    <h1>Signup</h1>
    <v-form class="signup__form">
      <v-text-field v-model="name" label="Name" required></v-text-field>

      <v-text-field v-model="email" label="E-mail" required></v-text-field>

      <v-text-field
        label="Password"
        required
        :type="show1 ? 'text' : 'password'"
        v-model="password"
      ></v-text-field>

      <v-btn @click="signup" color="blue">Signup!</v-btn>

      <p class="body-2 u-error-message" v-if="feedback">{{ feedback }}</p>
    </v-form>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      show1: false,
      feedback: null,
      email: null,
      password: null,
      name: null,
      conut: 5,
    };
  },
  methods: {
    signup() {
      if (!this.name || !this.email || !this.password) {
        return (this.feedback = "Please Fill Out All Fields.");
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
        .then(() => {
          this.feedback = "User created!";

          //count down
          this.conutDown();
        })
        .catch((err) => {
          this.feedback = err;
        });
    },
    conutDown() {
      this.feedback = `Redirecting in ${this.conut}`;
      this.conut--;
      if (this.conut < 0) {
        return this.$router.push({ name: "Home" });
      }
      setTimeout(() => {this.conutDown();},1000)
    },
  },
};
</script>
<style lang="scss">
.signup {
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