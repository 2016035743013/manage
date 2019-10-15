  <template>
  <div class="addOrEdit" v-if="addOrEdit">
    <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :visible.sync="addOrEdit"
      width="800px"
      :show-close="false"
      top="10"
    >
      <el-form :model="rulForm" :rules="rules" ref="rulForm" label-width="100px" :inline="true">
        <el-form-item label="登陆账号" prop="username">
          <el-input v-model="rulForm.username"></el-input>
        </el-form-item>
        <el-form-item v-if="title=='添加管理员'" label="登陆密码" prop="password">
          <el-input v-model="rulForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="rulForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="rulForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="rulForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <br />
        <el-form-item label="数据权限">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <br />
          <el-checkbox-group v-model="checkOrganization" @change="handleCheckedChange">
            <el-checkbox :label="item" v-for="(item, index) in organization" :key="index">{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="系统管理员">
          <el-radio v-model="superAuth" label="1">是</el-radio>
          <el-radio v-model="superAuth" label="0">否</el-radio>
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
import {
  addManager,
  editManager
} from "../../../../Api/rightManage/managersManageApi";
import { getOrganizationData } from "../../../../Api/organizationManageApi/organizationManageApi";
import {execPhoneEmail} from '../../../../tools/tools'
export default {
  name: "addOrEdit",
  data() {
    return {
      rulForm: {},
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickname: [{ required: true, message: "请选择昵称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }]
      },
      organization: [],
      checkAll: false, //全选
      isIndeterminate: false, //用以表示 checkbox 的不确定状态，一般用于实现全选的效果,
      checkOrganization: [], // 被选中的数据权限
      superAuth: "0" //是否设置为系统管理员，0代表不是，1代表是的。
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
      this.checkOrganization = [];
      this.superAuth = "0";
      this.handleCheckedChange();
      if (val.auth) {
        this.checkOrganization = val.auth.split(",");
        this.superAuth = val.superAuth;
        this.handleCheckedChange();
      }
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
            phone: this.rulForm.phone,
            email: this.rulForm.email,
            auth: this.checkOrganization.join(","),
            superAuth: this.superAuth
          };

          // 检测邮箱和手机号
          if (!execPhoneEmail(this.rulForm.phone, this.rulForm.email, this)) {
            return;
          }

          if (this.title === "添加管理员") {
            data.password = this.rulForm.password;
            addManager(data)
              .then(res => {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.$emit("confirm", "add");
              })
              .catch(err => {
                this.$message({
                  type: "warning",
                  message: err.error
                });
              });
          } else {
            data.objectId = this.tableCeilData.objectId;
            editManager(data).then(res => {
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
    },
    
    //数据的是否全选
    handleCheckAllChange(val) {
      console.log(val);
      this.isIndeterminate = false;
      this.checkOrganization = val ? this.organization : [];
    },
    // 选中单个选项的事件触发
    handleCheckedChange() {
      this.isIndeterminate =
        this.checkOrganization.length < this.organization.length &&
        this.checkOrganization.length > 0;
      this.checkAll =
        this.checkOrganization.length === this.organization.length;
    },
    getData() {
      getOrganizationData().then(res => {
        this.organization = [];
        res.map((val, index) => {
          this.organization[index] = val.name;
        });
      });
    }
  },
  created() {
    this.getData();
  },
  mounted() {}
};
</script>
<style scoped>
@import "../../../../../static/css/pages/organizationManage/positionManage/addOrEdit.css";
</style>