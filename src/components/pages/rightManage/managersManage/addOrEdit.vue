  <template>
  <div class="addOrEdit" v-if="addOrEdit">
    <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="addOrEdit"
      width="400px"
      :show-close="false"
    >
      <el-form :model="rulForm" :rules="rules" ref="rulForm" label-width="100px">
        <el-form-item label="登陆账号" prop="username">
          <el-input v-model="rulForm.username"></el-input>
        </el-form-item>
        <el-form-item v-if="title=='添加管理员'" label="登陆密码" prop="password">
          <el-input v-model="rulForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="rulForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobilePhoneNumber">
          <el-input v-model="rulForm.mobilePhoneNumber" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="rulForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closePanel">取消</el-button>
        <el-button type="primary" @click="confirm('rulForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addOrEditManager } from "../../../../Api/rightManage/managersManageApi";
export default {
  name: "addOrEdit",
  data() {
    return {
      rulForm: {},
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请选择昵称", trigger: "blur" }
        ],
        mobilePhoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }]
      }
    };
  },
  props: [
    "addOrEdit", //添加和编辑弹窗的显示和隐藏
    "title",
    "tableCeilData"
  ],
  watch: {
    tableCeilData(val) {
      this.rulForm = val;
    }
  },
  methods: {
    closePanel() {
      this.$emit("close");
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            username: this.rulForm.username,
            nickname: this.rulForm.nickname,
            mobilePhoneNumber: this.rulForm.mobilePhoneNumber,
            email: this.rulForm.email,
          };
          if (this.title == "添加管理员") {
            data.password = this.rulForm.password;
            addOrEditManager(data).then(res => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$emit("confirm", "add");
            }).catch(err => {
              this.$message({
                type: 'warning',
                message: err.error
              })
            });
          } else {
            data.id = this.tableCeilData.objectId;
            addOrEditManager(data).then(res => {
              this.$message({
                message: "修改管理员信息成功",
                type: "success"
              });
              this.$emit("confirm", "edit");
            });
          }
        } else {
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
@import "../../../../../static/css/pages/organizationManage/positionManage/addOrEdit.css";
</style>