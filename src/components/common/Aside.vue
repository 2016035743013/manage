<template>
  <div class="aside">
    <el-menu
      :default-active="activePath"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#242F42"
      text-color="#fff"
      active-text-color="#67C23A"
      router
      unique-opened
    >
      <template v-for="(item, index) in lists">
        <template v-if="item.sub">
          <el-submenu :key="index" :index="index + ''">
            <template slot="title">
              <i :class="[item.icon]"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(item2, index2) in item.sub"
                :index="item2.path"
                :key="index2"
                @click="handleSelect(item2)"
              >{{item2.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="index" @click="handleSelect(item)">
            <i :class="[item.icon]"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import https from "../../tools/https";
import bus from "../../tools/bus";
import vuescroll from 'vuescroll'
export default {
  name: "managerAside",
  data() {
    return {
      isCollapse: false,
      lists: [] //导航栏标签
    };
  },
  computed: {
    activePath() {
      return this.$store.getters.getActivePath;
    }
  },
  methods: {
    // 监听屏幕的改变来设置导航的高度
    listenWinResize() {
      this.$(window).resize(() => {
        this.setAsideHeight();
      });
    },
    // 设置导航的高度
    setAsideHeight() {
      let winHeight = this.$(window).height();
      this.$(".aside").css({
        height: winHeight - 60 + "px"
      });
    },
    // 导航
    handleSelect(obj) {
      // console.log(obj);
      this.$store.commit('addToRoutes', obj);
    }
  },
  mounted() {
    this.setAsideHeight();
    this.listenWinResize();

    // 监听导航栏的折叠
    bus.$on("openOrClose", () => {
      this.isCollapse = !this.isCollapse;
    });

    // 获取导航模块的数据
    this.$.getJSON("/static/JSON/aside.json", data => {
      this.lists = data;
    });
  }
};
</script>
<style scoped>
@import "../../../static/css/common/Aside.css";
</style>