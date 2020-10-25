<template>
  <v-app class="navbar">
    <v-bottom-navigation :value="value" color="primary" horizontal grow>
      <v-btn to="/">
        <span>Home</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn v-if="!user" to="/login">
        <span>Login</span>

        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn v-if="!user" to="/signup">
        <span>Signup</span>

        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn v-if="user" to="/profile">
        <span>Profile</span>

        <v-icon>mdi-card-account-details</v-icon>
      </v-btn>

      <v-btn @click="logout" v-if="user">
        <span>Logout</span>

        <v-icon>mdi-logout</v-icon>
      </v-btn>

    </v-bottom-navigation>
  </v-app>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      value: 1,
    };
  },
  methods:{
    logout(){
      localStorage.removeItem('token')
      location.reload()
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>