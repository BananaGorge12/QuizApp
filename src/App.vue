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
@import './sass/base';
@import './sass/header';
@import './sass/form';
@import './sass/quiz';
@import './sass/new-class';
@import './sass/animations';
@import './sass/fonts';
</style>