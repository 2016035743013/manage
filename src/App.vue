<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "./components/Home";
export default {
  name: "App",
  components: {
    Home
  },
  mounted() {
    // console.log();
    if( !window.localStorage.getItem('bmob')) {
      this.$router.push('/login');
    }
  }
};
</script>

<style>
@import "//at.alicdn.com/t/font_1362757_e8u8ijaadr9.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
