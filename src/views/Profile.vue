<template>
  <div class="profile">
    <header class="header">
      <h1 class="header__title">Profile</h1>
    </header>
    <form @submit.prevent="updateUser" class="form">
      <div class="form__field">
        <input v-model="name" class="form__text" id="profile-name" type="name">
        <label for="profile-name">Name</label>
      </div>
      <div class="form__field">
        <input v-model="email" class="form__text" id="profile-email" type="name">
        <label for="profile-email">Email</label>
      </div>
      <div class="form__field">
        <input v-model="password" class="form__text" id="profile-password" type="name">
        <label for="profile-password">Password</label>
      </div>
      <button class="form__btn">Save</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      edit: false,
      name: null,
      email:null,
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
      
      location.reload()
    },
  },
  created() {
    if(!this.user){
      return this.$router.push({ name:'Home' })
    }
    this.name = this.user.name
    this.email = this.user.email
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