<template>
    <v-app class="navbar">
      <v-bottom-navigation :value="value" color="primary" horizontal grow>
        <v-btn to="/">
          <span>Home</span>

          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn to="/login">
          <span>Login</span>

          <v-icon>mdi-login</v-icon>
        </v-btn>

        <v-btn to="/signup">
          <span>Signup</span>

          <v-icon>mdi-login</v-icon>
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
};
</script>