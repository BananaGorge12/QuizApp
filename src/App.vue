<template>
  <div v-if="isBrowserOk" id="app">
    <Navigation />
    <router-view></router-view>
  </div>
  <OldBrowser v-else />
</template>

<script>
import Navigation from "./components/Navigation";
import OldBrowser from './components/OldBrowser'
import { detect  } from 'detect-browser'
export default {
  name: "App",
  components: {
    Navigation,
    OldBrowser,
  },
  data() {
    return {
      isBrowserOk:true,
    };
  },
  created(){
    //browser check
    const browser = detect()
  
    if(browser.name == 'ie'){
      this.isBrowserOk = false
    }
  }
};
</script>
<style lang="scss">
@import './sass/header';
@import "./sass/form";
@import "./sass/quiz";
@import "./sass/animations";
@import './sass/fonts';

#app{
  position: relative;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body{
  overflow-x: hidden;
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
  background: none;
}

a{
  text-decoration: none;
}

.feedback{
  margin-top: 2rem;
  font-family: 'wendy one', roboto;
  font-size: 1.2rem;
}

.u-no-scroll{
  overflow: hidden;
}

.u-f40{
  font-size: 4rem !important;
}

.u-f20{
  font-size: 2rem;
}

.u-no-bold{
  font-weight: 400;
}

.u-indent{
  padding-left: 4rem;
}

.u-no-margin{
  margin: 0 !important;
}

.u-no-list-style{
  list-style: none;
}

.u-margin-bottom{
  margin-bottom: 1.3rem;
}

.u-center{
  display: flex;
  align-items: center;
}
</style>