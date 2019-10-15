<template>
  <div class="role-manage">
    <!-- <vuescroll> -->
    <div class="role-action">
      <el-button type="primary" @click="addRole">添加</el-button>
      <el-button type="danger" @click="batDelRoel">批量删除</el-button>
    </div>
    <div class="role-table">
      <el-table :data="tableData" @selection-change="handleSelectionChange" :fit="true" border>
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="角色名称"></el-table-column>
        <el-table-column align="center" prop="role" label="角色编码"></el-table-column>
        <el-table-column align="center" prop="isSystemRole" label="系统角色"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" label="更新时间" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.updatedAt | updateTime }}</span>
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
import addOrEdit from "./addOrEdit";
import {
  getRoleData,
  delRole
} from "../../../../Api/rightManage/roleManageApi";
import { isSuperAuth } from "../../../../tools/tools";
export default {
  name: "roleManage",
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
      if (!isSuperAuth(this)) {
        return;
      }
      this.title = "添加角色";
      this.addOrEdit = true;
      this.tableCeilData = {};
    },
    batDelRoel() {
      if (!isSuperAuth(this)) {
        return;
      }
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
          delRole(objectIdArr).then(() => {
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
      if (!isSuperAuth(this)) {
        return;
      }
      this.tableCeilData = data;
      this.title = "修改角色信息";
      this.addOrEdit = true;
    },
    handleDelete(index, data) {
      if (!isSuperAuth(this)) {
        return;
      }
      this.$confirm("是否删除该角色", "提示", {
        type: "warning"
      })
        .then(() => {
          delRole([data.objectId]).then(res => {
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
      getRoleData().then(res => {
        this.tableData = res;
        this.$nextTick(() => {
          this.loadingInstance.close();
        });
      });
    }
  },
  mounted() {
    this.loadingInstance = this.$loading({
      fullscreen: true,
      background: "rgba(0,0,0,0.5)"
    });
    this.getData();
  }
};
</script>
<style scoped>
@import "../../../../../static/css/pages/rightManage/roleManage/RoleManage.css";
</style>