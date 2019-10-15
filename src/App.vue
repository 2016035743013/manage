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
    if (!window.sessionStorage.getItem("manager")) {
      this.$router.push("/login");
    }
    // console.log();
    let routes = window.sessionStorage.getItem("routes");
    let activePath = window.sessionStorage.getItem('activePath');
    let userInfo = window.sessionStorage.getItem('manager');
    if (routes) {
      this.$store.commit("setRoutes", JSON.parse(routes));
    }
    if (activePath) {
      this.$store.commit('setActivePath', activePath);
    }
    if (userInfo) {
      this.$store.commit('setUserInfo', JSON.parse(userInfo));
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
