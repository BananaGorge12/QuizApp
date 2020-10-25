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
};
</script>
<style lang="scss">
  .v-application--wrap{
    min-height: 0;
  }

  .u-error-message{color: #E53935; margin-top: 20px;}
</style>