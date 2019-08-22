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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="rulForm.name"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="organization">
          <el-select v-model="rulForm.rank" placeholder="请选择">
            <el-option v-for="item in rank" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位分类" prop="organization">
          <el-select v-model="rulForm.organization" placeholder="请选择">
            <el-option v-for="item in organization" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="rulForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="rulForm.email"></el-input>
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
import { getOrganizationData } from "../../../../Api/organizationManageApi/organizationManageApi";
import { addOrEditStaff } from "../../../../Api/organizationManageApi/staffManageApi";
import {
  getPositionData
} from "../../../../Api/organizationManageApi/positionManageApi";
export default {
  name: "addOrEdit",
  data() {
    return {
      organization: [],
      rank: [],
      rulForm: {},
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        organization: [
          { required: true, message: "请选择部门", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
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
            organization: this.rulForm.organization,
            email: this.rulForm.email,
            phone: this.rulForm.phone,
            rank: this.rulForm.rank,
          };
          if (this.title == "添加员工") {
            addOrEditStaff(data).then(res => {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$emit("confirm", "add");
            });
          } else {
            data.id = this.tableCeilData.objectId;
            addOrEditStaff(data).then(res => {
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
    },
    getData() {
      getOrganizationData().then(res => {
        this.organization = [];
        res.map((val, index) => {
          this.organization[index] = val.name;
        });
      });
      getPositionData('').then(res => {
        this.rank = [];
        res.map((val, index) => {
          this.rank[index] = val.name;
        })
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style scoped>
@import "../../../../../static/css/pages/organizationManage/positionManage/addOrEdit.css";
</style>