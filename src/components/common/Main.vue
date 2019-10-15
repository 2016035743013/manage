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
            <el-dropdown-item command="refreshOne">刷新当前页面</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main-content" >
      <vuescroll :ops="ops" ref="vuescroll"  v-if="reload">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </vuescroll>
    </div>
  </div>
</template>
<script>
export default {
  name: "manageMain",
  data() {
    return {
      activePath: this.$store.getters.getActivePath,
      reload: true,
      ops: {
        bar: {
          background: "#545C64"
        },
        vuescroll: {
          mode: "native",
          sizeStrategy: "number",
          detectResize: true
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: "right"
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
      if (action == 'refreshOne') {
        this.reload = false;
        this.$nextTick().then(() => {
          this.reload = true;
        })
      } else {
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
          window.sessionStorage.removeItem("routes");
          this.$router.push("/");
          this.$store.commit("setActivePath", "/");
        }
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
    const that = this;
  }
};
</script>
<style scoped>
@import "../../../static/css/common/Main.css";
/* .fade-enter-active {
  animation: sport 0.5s;
}
.fade-leave-active {
  animation: sport 0.5s reverse;
}
@keyframes sport {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
} */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-leave-to {
  transform: translateX(100%);
}
.fade-enter {
  transform: translateX(-100%);
}
.fade-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

</style>