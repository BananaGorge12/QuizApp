<template>
  <v-app class="navbar">
    <v-bottom-navigation class="d-flex justify-space-around align-center" color="primary" :value="value" horizontal grow>
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
      <v-btn v-if="user" to="/new-quiz">
        <span>New Quiz</span>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn id="navbar__logout" @click="dialog = true" v-if="user">
        <span>Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <!-- logout popup -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Are You Sure That You Want To Logout?</v-card-title>
          <v-card-text>When you logout you won't be able to access your account until you log back in.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="logout">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- End of popup -->
  </v-app>
</template>
<script>
import axios from 'axios'
export default {
  name: "Navbar",
  data() {
    return {
      value: 1,
      dialog: false,
    };
  },
  methods: {
    //loges user out
    logout() {
      axios.post('/api/users/logout',{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,}
      }).then(() => {
        localStorage.removeItem("token");
        location.reload();
      }).catch(err => {
        console.log(err)
      })
    },
  },
  computed: {
    //gets user data
    user() {
      return this.$store.state.user;
    },
  },
};
</script>