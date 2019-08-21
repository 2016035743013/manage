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
        <el-form-item label="岗位名称" prop="name">
          <el-input v-model="rulForm.name"></el-input>
        </el-form-item>
        <el-form-item label="岗位编码" prop="code">
          <el-input v-model="rulForm.code"></el-input>
        </el-form-item>
        <el-form-item label="岗位分类" prop="rank">
          <el-select v-model="rulForm.rank" placeholder="请选择">
            <el-option v-for="item in rank" :key="item" :label="item" :value="item"></el-option>
          </el-select>
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
import {
  addPosition,
  editPosition
} from "../../../../Api/organizationManageApi/positionManageApi";
export default {
  name: "addOrEdit",
  data() {
    return {
      rank: ["高层", "中层", "基层", "其他"],
      rulForm: {},
      rules: {
        name: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入岗位编码", trigger: "blur" }],
        rank: [{ required: true, message: "请输入岗位类型", trigger: "blur" }]
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
            code: this.rulForm.code,
            rank: this.rulForm.rank,
            remark: this.rulForm.remark
          };
          if (this.title == "添加岗位") {
            addPosition(data).then(res => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$emit("confirm", "add");
            });
          } else {
            data.id = this.tableCeilData.objectId;
            editPosition(data).then(res => {
              // console.log(res);
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$emit("confirm", "edit");
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
@import "../../../../../static/css/pages/organizationManage/positionManage/addOrEdit.css";
</style>