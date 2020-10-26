<template>
  <v-app class="signup">
    <h1>Signup</h1>
    <v-form class="signup__form">
      <v-text-field v-model="name" label="Name" required></v-text-field>

      <v-text-field
        v-model="email"
        label="E-mail"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        counter
        @click:append="show1 = !show1"
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
      //vuetifiy rules
      rules: {
        required: (value) => !!value || "Required.",
        emailMatch: () => `The email and password you entered don't match`,
      },
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
        .then(res => {
          this.feedback = "User created!";
          localStorage.setItem('token',res.data.token)
          location.reload()
        })
        .catch((err) => {
          this.feedback = err;
        });
    },
  },
  created(){
    if(this.user){
      this.$router.push({name:'Home'})
    }
  },
  computed:{
    user(){
      return this.$store.state.token()
    }
  }
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