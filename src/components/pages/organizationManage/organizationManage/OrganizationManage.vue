<template>
  <div class="organization">
    <vuescroll>
      <div class="organization-action">
        <el-button type="primary" @click="addOrganization">添加</el-button>
        <el-button type="danger" @click="batDelOrganization">批量删除</el-button>
      </div>
      <div class="organizaiton-table">
        <el-table :data="tableData" @selection-change="handleSelectionChange" :fit="true" border>
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="name" label="机构名称"></el-table-column>
          <el-table-column align="center" prop="type" label="机构类型"></el-table-column>
          <el-table-column align="center" label="更新时间" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.updatedAt }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" :show-overflow-tooltip="true" label="备注信息"></el-table-column>
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
    </vuescroll>
  </div>
</template>
<script>
import {
  getOrganizationData,
  delOrganization
} from "../../../../Api/organizationManageApi/organizationManageApi";
import addOrEdit from "./addOrEdit";
import { Loading } from "element-ui";
export default {
  name: "organizationManage",
  data() {
    return {
      tableData: [],
      tableCeilData: {},
      title: "",
      addOrEdit: false,
      selectData: [] //复选框选中的数据
    };
  },
  methods: {
    addOrganization() {
      this.tableCeilData = {};
      this.title = "添加机构";
      this.addOrEdit = true;
    },
    batDelOrganization() {
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
          for (let i = 0; i < objectIdArr.length; i++) {
            promiseArr.push(delOrganization(objectIdArr[i]));
          }
          Promise.all(promiseArr).then(() => {
            this.getData();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
        })
        .catch(() => {});
    },
    handleSelectionChange(data) {
      this.selectData = data;
    },
    handleEdit(index, data) {
      this.title = "修改机构";
      this.tableCeilData = data;
      this.addOrEdit = true;
    },
    handleDelete(index, data) {
      this.$confirm("是否删除该机构", "提示", {
        type: "warning"
      })
        .then(() => {
          delOrganization(data.objectId).then(res => {
            this.getData();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
        })
        .catch(() => {
          this.$message({
            message: "取消删除"
          });
        });
    },
    closePanel() {
      this.addOrEdit = false;
    },
    confirm(type) {
      this.closePanel();
      if (type == "add") {
        this.getData();
      }
    },
    getData() {
      getOrganizationData().then(res => {
        this.tableData = res;
        this.$nextTick(() => {
          this.loadingInstance.close();
        });
      });
    }
  },
  components: {
    addOrEdit
  },
  mounted() {
    this.loadingInstance = Loading.service({
      fullscreen: true,
      background: "rgba(0,0,0,0.5)"
    });
    this.getData();
  }
};
</script>
<style scoped>
@import "../../../../../static/css/pages/organizationManage/organizationManage/OrganizationManage.css";
</style>