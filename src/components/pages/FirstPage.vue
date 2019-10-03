<template>
  <div class="firstpage">
    <vuescroll :ops='ops'>
      <div class="content">
        <div class="content-bar">亲爱的{{userInfo.nickname}}，您好！ 欢迎使用后台管理模板。当前时间为： {{curTime}}</div>
        <div class="content-canshu">
          <div class="canshu-item" v-for="(item, index) in canshu" :key="index" @click="turnToGithub(index)">
            <div class="item-left">
              <i class="iconfont" :class="[item.icon]"></i>
            </div>
            <div class="item-right">
              <span>{{item.title}}</span>
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
        <div class="content-chars">
          <ve-line :data="chartData" ></ve-line>
          <ve-histogram :data="lineData" :settings="chartSettings"></ve-histogram>
        </div>
      </div>
    </vuescroll>
  </div>
</template>
<script>
export default {
  name: "firstpage",
  data() {
    this.chartSettings = {
      axisSite: { right: ["下单率"] },
      yAxisType: ["KMB", "percent"],
      yAxisName: ["数值", "比率"]
    };
    return {
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
      },
      curTime: "",
      canshu: [
        {
          icon: "icon-git",
          title: "Github",
          text: "模板下载链接"
        },
        {
          icon: "icon-yonghu",
          title: "用户",
          text: "2"
        },
        {
          icon: "icon-guanzhu11",
          title: "关注数",
          text: "1"
        },
        {
          icon: "icon-dianzanshou",
          title: "点赞数",
          text: "0"
        }
      ],
      chartData: {
        columns: ["日期", "访问用户", "下单用户"],
        rows: [
          { 日期: "2018-05-22", 访问用户: 32371, 下单用户: 19810 },
          { 日期: "2018-05-23", 访问用户: 12328, 下单用户: 4398 },
          { 日期: "2018-05-24", 访问用户: 92381, 下单用户: 52910 }
        ]
      },
      lineData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "2018-05-22", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "2018-05-23", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "2018-05-24", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "2018-05-25", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "2018-05-26", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "2018-05-27", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    getCurTime() {
      setTimeout(() => {
        this.curTime = new Date().toLocaleString();
        this.getCurTime();
      }, 1000);
    },
    turnToGithub(index) {
        if(index == 0) {
            window.open('https://github.com/2016035743013/manage', 'blank')
        }
    }
  },
  created() {
    this.loadingInstance = this.$loading({
      fullscreen: true,
      background: "rgba(0,0,0,0.5)"
    });
  },
  mounted() {
    this.getCurTime();
    this.$nextTick(() => {
      this.loadingInstance.close();
    });
  }
};
</script>
<style scoped>
@import "../../../static/css/pages/FirstPage.css";
</style>