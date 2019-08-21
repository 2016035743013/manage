<template>
  <div class="main">
    <div class="tags">
      <div class="tags-container">
        <el-tabs
          v-model="activePath"
          closable
          @tab-click="tabClick"
          @tab-remove="removeCard"
          type="card"
        >
          <el-tab-pane
            v-for="(item) in cards"
            :key="item.name"
            :label="item.name"
            :name="item.path"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div class="tags-action">
        <el-dropdown @command="tagsAction">
          <el-button size="small" type="primary">
            页面操作
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main-content">
        <transition
          name="custom-classes-transition"
          enter-active-class="animated bounceInUp"
          leave-active-class="animated bounceOutUp"
        >
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "manageMain",
  data() {
    return {
      activePath: this.$store.getters.getActivePath,
      ops: {
        bar: {
          background: "#545C64"
        }
      }
    };
  },
  watch: {
    $route(val) {
      this.activePath = this.$store.getters.getActivePath;
    }
  },
  computed: {
    cards() {
      return this.$store.getters.getRoutes;
    }
  },
  methods: {
    removeCard(path) {
      this.$store.commit("delRoutesItem", { path: path, flag: "one" });
      if (this.$store.getters.getRoutes.length <= 0) {
        this.$router.push("/");
        this.$store.commit("setActivePath", "/");
      } else {
        this.$router.push(this.$store.state.activePath);
      }
    },
    // 关闭标签的操作
    tagsAction(action) {
      if (this.$store.getters.getRoutes.length == 0) {
        this.$message("没有可以关闭的窗口了");
        return;
      }
      if (action == "closeOthers") {
        this.$store.commit("delRoutesItem", {
          path: this.$store.state.activePath,
          flag: "other"
        });
      } else {
        this.$store.state.routes = [];
        window.localStorage.removeItem("routes");
        this.$router.push("/");
        this.$store.commit("setActivePath", "/");
      }
    },
    // 点击选项卡
    tabClick(tab, event) {
      this.$store.commit("setActivePath", tab.paneName);
      this.activePath = tab.paneName;
      this.$router.push(tab.paneName);
    },
    listenWinResize() {
      this.$(window).resize(() => {
        this.setAsideHeight();
      });
    },
    setAsideHeight() {
      let winHeight = this.$(window).height();
      this.$(".main-content").css({
        height: winHeight - 60 - 40 + "px"
      });
    }
  },
  mounted() {
    this.setAsideHeight();
    this.listenWinResize();
  }
};
</script>
<style scoped>
@import "../../../static/css/common/Main.css";
</style>