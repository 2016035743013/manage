<template>
  <div class="staff-manage">
    <!-- <vuescroll> -->
    <div class="staff-action">
      <el-select ref="select" v-model="organizationVal" @change="selectHandle">
        <el-option v-for="(item, index) in organization" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-input @input="listenInput" style="width: 200px;" v-model="keyword" placeholder="请输入员工姓名"></el-input>
      <el-button type="success" @click="search">搜索</el-button>
      <el-button type="primary" @click="addStaff">添加</el-button>
      <el-button type="danger" @click="batDelStaff">批量删除</el-button>
    </div>
    <div class="staff-table">
      <el-table :data="tableData" @selection-change="handleSelectionChange" :fit="true" border>
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="rank" label="职位"></el-table-column>
        <el-table-column align="center" prop="organization" label="部门"></el-table-column>
        <el-table-column align="center" prop="phone" label="电话"></el-table-column>
        <el-table-column align="center" prop="email" label="邮箱" :show-overflow-tooltip="true"></el-table-column>
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
      <el-pagination
        @current-change="getCurPage"
        background
        layout="prev, pager, next"
        :total="count"
        style="margin-top: 10px;"
      ></el-pagination>
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
  getStaffData,
  addOrEditStaff,
  delStaff,
  getCount
} from "../../../../Api/organizationManageApi/staffManageApi";
import { getOrganizationData } from "../../../../Api/organizationManageApi/organizationManageApi";
import { isSuperAuth } from "../../../../tools/tools";
import addOrEdit from "./addOrEdit";
import { mapState } from "vuex";
export default {
  name: "staffManage",
  data() {
    return {
      organization: [],
      organizationVal: "",
      keyword: "",
      tableData: [], //表格数据
      tableCeilData: {}, //当行数据
      addOrEdit: false,
      title: "",
      selectData: [], //复选框选中的数据
      count: 0, //
      pageNum: 0
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    handleEdit(index, data) {
      this.tableCeilData = data;
      this.title = "修改员工信息";
      this.addOrEdit = true;
    },
    handleDelete(index, data) {
      this.$confirm("是否删除该员工", "提示", {
        type: "warning"
      })
        .then(() => {
          delStaff([data.objectId]).then(res => {
            this.getData(this.organizationVal, "");
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
    // 添加岗位
    addStaff() {
      this.tableCeilData = {};
      this.title = "添加员工";
      this.addOrEdit = true;
    },
    closePanel() {
      this.addOrEdit = false;
    },
    confirm(type) {
      this.closePanel();
      if (type == "add") {
        this.getData(this.organizationVal, "");
      }
    },
    // 多选框选中触发
    handleSelectionChange(selectData) {
      this.selectData = selectData;
    },
    selectHandle() {
      this.pageNum = 0;
      this.getData(this.organizationVal, "");
    },
    getData(organization, keyword) {
      getStaffData(this.organizationVal, keyword, this.pageNum).then(res => {
        this.tableData = res.data;
        if (res.count.length == 0) {
          this.count = 0;
        } else {
          this.count = res.count[0].count;
        }
        this.$nextTick(() => {
          this.loadingInstance.close();
        });
      });
    },
    batDelStaff() {
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
          delStaff(objectIdArr).then(() => {
            this.getData("", "");
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
        })
        .catch(() => {});
    },
    search() {
      if (this.keyword == "") {
        this.$message({
          message: "请输入搜索关键字",
          type: "warning"
        });
        return;
      }
      this.pageNum = 0;
      this.getData(this.organizationVal, this.keyword);
    },
    listenInput() {
      if (this.keyword == "") {
        this.getData(this.organizationVal, "");
      }
    },
    getCurPage(val) {
      this.pageNum = val - 1;
      this.getData("", "");
    }
  },
  created() {
    if (this.userInfo.superAuth === "0") {
      this.organization = [];
      this.organization = this.userInfo.auth.split(",");
      this.organizationVal = this.organization[0];
    } else {
      getOrganizationData().then(res => {
        this.organization = [];
        res.map((val, index) => {
          this.organization[index] = val.name;
        });
        this.organization.unshift("");
      });
    }
    this.getData("", "");
  },
  mounted() {
    this.loadingInstance = this.$loading({
      fullscreen: true,
      background: "rgba(0,0,0,0.5)"
    });
  },
  components: {
    addOrEdit
  }
};
</script>
<style scoped>
@import "../../../../../static/css/pages/organizationManage/staffManage/StaffManage.css";
</style>