<template>
  <v-app class="profile container">
    <h1>Profile</h1>

    <h3 class="h3">Name:</h3>
    <p v-if="!edit" class="subtitle-1">{{ name }}</p>
    <input class="profile__input" v-model="name" v-else />

    <h3 class="h3">Email:</h3>
    <p v-if="!edit" class="subtitle-1">{{ email }}</p>
    <input class="profile__input" v-model="email" v-else />

    <h3 v-if="edit" class="h3">New Password:</h3>
    <input v-if="edit" v-model="password" class="profile__input" />

    <v-btn
      v-if="!edit"
      class="profile__btn"
      elevation="2"
      color="green accent-3"
      width="100"
      @click="edit = true"
      >Edit</v-btn
    >
    <v-btn
      v-else
      class="profile__btn"
      elevation="2"
      color="red accent-4"
      width="100"
      @click="edit = false"
      >Cancel</v-btn
    >
    <v-btn
      v-if="edit"
      class="profile__btn"
      elevation="2"
      color="blue"
      width="100"
      @click="updateUser"
      >Save</v-btn
    >
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      edit: false,
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    //updates user
    updateUser() {
      const newUser = {};
      if (this.name) newUser.name = this.name;
      if (this.email) newUser.email = this.email;
      if (this.password) newUser.password = this.password;
      console.log(newUser);

      axios
        .patch("/api/users/me", newUser, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
      if(!localStorage.getItem('token')){
          this.$router.push({name:'Home'})
      }
    //checks for valid user data
    const checkForUser = setInterval(() => {
      if(this.user){
        this.name = this.user.name
        this.email = this.user.email
        clearInterval(checkForUser)
      }
    },100)
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
};
</script>
<style lang="scss">
.profile {
  width: 50%;
  margin: 0 auto;

  h1 {
    margin-bottom: 10px;
  }

  &__input {
    border-bottom: 3px solid #1976d2;
    outline: none;
    transition: all 0.2s linear;
    margin-bottom: 5px;
    box-sizing: border-box !important;
    width: 60%;
    margin-bottom: 10px;

    &:focus {
      border-bottom: 3px solid #00bfa5;
    }
  }

  &__btn {
    margin: 10px 0;
  }
}
</style>