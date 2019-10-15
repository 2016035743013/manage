<template>
  <div class="header">
    <div class="header-left">
      <i class="el-icon-s-fold" v-if="fold" @click="toggle" ></i>
      <i class="el-icon-s-unfold" v-else @click="toggle"></i>
      <span>后台管理模板</span>
    </div>
    <div class="header-right">
      <div class="full-screen-icon">
        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
          <i class="el-icon-rank" @click="handleFullScreen"></i>
        </el-tooltip>
      </div>
      <div class="user-header">
        <img src="../../assets/header/head.jpg" alt />
      </div>
      <el-dropdown @command="choseItem">
        <div class="slide-list el-dropdown-link">
          {{userInfo.nickname}}
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      :close-on-click-modal="false"
      :visible.sync="resetPwd"
      width="400px"
      :show-close="false"
    >
      <el-form :model="rulForm" :rules="rules" ref="formName" label-width="100px">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="rulForm.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="rulForm.newPwd" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closePanel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import bus from "../../tools/bus";
import { updatePwd } from "../../Api/login";
export default {
  name: "managerHeader",
  data() {
    return {
      fullscreen: false,
      resetPwd: false,
      rulForm: {},
      fold: true,
      rules: {
        oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }]
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    }
  },
  methods: {
    toggle() {
      bus.$emit("openOrClose");
      this.fold = ! this.fold
    },
    closePanel() {
      this.resetPwd = false;
    },
    confirm() {
      this.$refs["formName"].validate(valid => {
        if (valid) {
          let data = {
            oldPwd: this.rulForm.oldPwd,
            newPwd: this.rulForm.newPwd,
            objectId: this.userInfo.objectId
          };
          updatePwd(data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.closePanel();
            } else {
              this.$message({
                type: 'success',
                message: res.msg
              })
            }
          
          });
        } else {
          return false;
        }
      });
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    choseItem(val) {
      // console.log(val);
      if (val == "logout") {
        // console.log("logout");
        window.sessionStorage.removeItem("activePath");
        window.sessionStorage.removeItem("routes");
        window.sessionStorage.removeItem('manager');
        this.$store.state.routes = [];
        this.$store.state.activePath = "/";
        this.$router.push("/login");
      } else if (val == "updatePwd") {
        this.rulForm = {};
        this.resetPwd = true;
      }
    }
  }
};
</script>
<style scoped>
@import "../../../static/css/common/Header.css";
</style>