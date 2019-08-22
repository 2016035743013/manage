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
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="rulForm.name"></el-input>
        </el-form-item>
        <el-form-item label="机构类型" prop="type">
          <el-input v-model="rulForm.type"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="rulForm.remark" type="textarea" :rows="2"></el-input>
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
import { addEditOrganization } from "../../../../Api/organizationManageApi/organizationManageApi";
export default {
  name: "addOrEdit",
  data() {
    return {
      rulForm: {},
      rules: {
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
        type: [{ required: true, message: "请输入机构类型", trigger: "blur" }],
      }
    };
  },

  watch: {
    tableCeilData(val) {
      this.rulForm = val;
    }
  },
  props: [
    "addOrEdit", //添加和编辑弹窗的显示和隐藏
    "title",
    "tableCeilData"
  ],
  methods: {
    closePanel() {
      this.$emit("close");
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            name: this.rulForm.name,
            type: this.rulForm.type,
            remark: this.rulForm.remark
          };
          if (this.title == "添加机构") {
            addEditOrganization(data).then(res => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$emit("confirm", "add");
            });
          } else {
            data.id = this.tableCeilData.objectId;
            addEditOrganization(data).then(res => {
              this.$message({
                message: "修改成功",
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
  }
};
</script>
<style scoped>
</style>