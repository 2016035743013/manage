<template>
  <div class="Home">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="auto">
          <Aside />
        </el-aside>
        <el-main>
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from "./common/Header";
import Aside from "./common/Aside";
import Main from "./common/Main";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    Header,
    Aside,
    Main
  },
  mounted() {
      
  }
};
</script>
<style scoped>
@import "../../static/css/Home.css";
</style>