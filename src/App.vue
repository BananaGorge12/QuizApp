<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {};
  },
  created(){
    this.getUser()
  },
  methods: {
    //gets user
    getUser() {
      this.$store.dispatch("loadUserDataFromDB").then(() => {
        this.user;
      });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
<style lang="scss">
.v-application--wrap {
  min-height: 0;
}

.u-error-message {
  color: #e53935;
  margin-top: 20px;
}
</style>