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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="rulForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="role">
          <el-input v-model="rulForm.role" placeholder="请输入角色编码"></el-input>
        </el-form-item>
        <el-form-item label="系统角色" prop="isSystemRole">
          <el-radio v-model="rulForm.isSystemRole" label="是">是</el-radio>
          <el-radio v-model="rulForm.isSystemRole" label="否">否</el-radio>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="rulForm.remark" :rows="2"></el-input>
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
import { addRole, editRole } from "../../../../Api/rightManage/roleManageApi";
export default {
  name: "addOrEdit",
  data() {
    return {
      organization: [],
      rank: [],
      rulForm: {},
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色编码", trigger: "blur" }],
        isSystemRole: [
          { required: true, message: "请选择系统角色", trigger: "blur" }
        ]
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
            name: this.rulForm.name,
            role: this.rulForm.role,
            isSystemRole: this.rulForm.isSystemRole,
            remark: this.rulForm.remark
          };
          if (this.title == "添加角色") {
            addRole(data).then(res => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$emit("confirm", "add");
            });
          } else {
            data.objectId = this.tableCeilData.objectId;
            editRole(data).then(res => {
              this.$message({
                message: "修改员工信息成功",
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