<template>
  <div class="managers-manage">
    <!-- <vuescroll> -->
      <div class="managers-action">
        <el-button type="primary" @click="addRole">添加</el-button>
        <el-button type="danger" @click="batDelRoel">批量删除</el-button>
      </div>
      <div class="managers-table">
        <el-table :data="tableData" @selection-change="handleSelectionChange" :fit="true" border>
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="username" label="登陆账号"></el-table-column>
          <el-table-column align="center" prop="nickname" label="昵称"></el-table-column>
          <el-table-column align="center" prop="phone" label="手机号码"></el-table-column>
          <el-table-column align="center" prop="email" label="电子邮箱"></el-table-column>
          <el-table-column align="center" label="更新时间" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.updatedAt }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                @click="handleDelete(scope.$index, scope.row)"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <addOrEdit
        :addOrEdit="addOrEdit"
        :title="title"
        @close="closePanel"
        @confirm="confirm"
        :tableCeilData="tableCeilData"
      />
    <!-- </vuescroll> -->
  </div>
</template>
<script>
import {
  getManagerData,
  delManager
} from "../../../../Api/rightManage/managersManageApi";
import addOrEdit from "./addOrEdit";
export default {
  name: "managersManage",
  components: {
    addOrEdit
  },
  data() {
    return {
      tableData: [],
      addOrEdit: false,
      title: "",
      tableCeilData: {},
      selectData: [] //复选框选中的数据
    };
  },
  methods: {
    closePanel() {
      this.addOrEdit = false;
    },
    confirm(type) {
      this.closePanel();
      if (type == "add") {
        this.getData();
      }
    },
    addRole() {
      this.title = "添加管理员";
      this.addOrEdit = true;
      this.tableCeilData = {};
    },
    batDelRoel() {
      let objectIdArr = this.selectData.map(val => {
        return val.objectId;
      });
      if (objectIdArr.length <= 0) {
        this.$message({
          message: "请选择要删除的选项",
          type: "warning"
        });
        return;
      }
      let promiseArr = [];
      this.$confirm("确认删除所选选项吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          delManager(objectIdArr).then(() => {
            this.getData();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
        })
        .catch(() => {});
    },
    // 多选框选中触发
    handleSelectionChange(selectData) {
      this.selectData = selectData;
    },
    handleEdit(index, data) {
      this.tableCeilData = data;
      this.title = "修改系统管理员信息";
      this.addOrEdit = true;
    },
    handleDelete(index, data) {
      this.$confirm("是否删除该系统管理员", "提示", {
        type: "warning"
      })
        .then(() => {
          delManager([data.objectId]).then(res => {
            this.getData();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
        })
        .catch(err => {
          this.$message({
            message: "取消删除"
          });
        });
    },
    getData() {
      getManagerData().then(res => {
        this.tableData = res;
        this.$nextTick(() => {
          this.loadingInstance.close();
        });
      });
    }
  },
  mounted() {
    this.getData();
    this.loadingInstance = this.$loading({
      fullscreen: true,
      background: "rgba(0,0,0,0.5)"
    });
  }
};
</script>
<style scoped>
@import "../../../../../static/css/pages/rightManage/managersManage/ManagersManage.css";
</style>