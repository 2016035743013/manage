<template>
  <div class="login">
    <img src="../../../assets/login/background.jpg" />
    <div class="login-panel">
      <div>
        <el-input v-model="username" placeholder="请输入用户名">
          <i slot="suffix" class="el-input__icon el-icon-user"></i>
        </el-input>
        <el-input v-model="password" type="password" placeholder="请输入密码">
          <i slot="suffix" class="el-input__icon el-icon-lock"></i>
        </el-input>
        <el-button @click="login" type="primary" style="width: 100%;">登录</el-button>
        <el-alert title="用户名：root，密码：root" type="info" :closable="false"></el-alert>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.username = this.username.trim();
      this.password = this.password.trim();
      if (this.username == "") {
        this.$alert("请输入用户名", "提示", {
          type: "warning",
          callback: action => {}
        });
        return;
      } else if (this.password == "") {
        this.$alert("请输入密码", "提示", {
          type: "warning",
          callback: action => {}
        });
        return;
      }
      Bmob.User.login(this.username, this.password)
        .then(res => {
        //   console.log(res);
            this.$store.commit('setUserInfo', res);
            this.$router.push("/");
        })
        .catch(err => {
        //   console.log(err);
            this.$alert('用户名或密码错误，请重新输入！！！','提示',{
                type: 'warning',
                callback: action => {}
            })
        });
      
    },
    setWinHeight() {
      let winHeight = this.$(window).height();
      this.$(".login").css({
        height: winHeight + "px"
      });
    },
    listenWinReisze() {
      this.$(window).resize(() => {
        this.setWinHeight();
      });
    }
  },
  mounted() {
    this.setWinHeight();
    this.listenWinReisze();
  }
};
</script>
<style scoped>
@import "../../../../static/css/pages/login/login.css";
</style>