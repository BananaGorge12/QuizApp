<template>
  <v-app class="login">
    <h1>Login</h1>
    <v-form class="login__form">
      <v-text-field v-model="email" label="E-mail" required></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
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
      //vuetifiy rules
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  created() {
    if (this.token) {
      this.$router.push({ name: "Home" });
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
          location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
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