<template>
  <div id="app">
    <Navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  name: "App",
  components: {
    Navigation,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
@import url('./sass/header.scss');
@import "./sass/form";
@import "./sass/quiz";

#app{
  position: relative;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

input{
  border: none;
  font-size:inherit;
  font-family: inherit;
}

button{
  border: none;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
}

.u-f40{
  font-size: 4rem !important;
}

.u-indent{
  padding-left: 4rem;
}

.u-no-margin{
  margin: 0 !important;
}

//fonts
@font-face {
  font-family: 'wendy one';
  src: url('./fonts/WendyOne-Regular.ttf');
}

@font-face {
  font-family: roboto;
  src: url('./fonts/Roboto-Regular.ttf');
}


</style>