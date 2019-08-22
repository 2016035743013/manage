<template>
  <div class="position-manage">
    <vuescroll>
    <div class="position-action">
      <el-select v-model="rank" @change="selectHandle">
        <el-option v-for="(item, index) in selectItems" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-button type="primary" @click="addPosition">添加</el-button>
      <el-button type="danger" @click="batDelPosition">批量删除</el-button>
    </div>
    <div class="position-table">
      <el-table :data="tableData" @selection-change="handleSelectionChange" :fit="true" border>
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="岗位名称"></el-table-column>
        <el-table-column align="center" prop="code" label="岗位编码"></el-table-column>
        <el-table-column align="center" prop="rank" label="岗位分类"></el-table-column>
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
  getPositionData,
  delPosition,
  batDelPosition
} from "../../../../Api/organizationManageApi/positionManageApi";
import addOrEdit from "./addOrEdit";
import { Loading } from "element-ui";
export default {
  name: "positionManage",
  data() {
    return {
      selectItems: ["", "高层", "中层", "基层", "其他"],
      rank: "", //岗位分类
      keyword: "", //关键字
      tableData: [], //表格数据
      tableCeilData: {}, //当行数据
      addOrEdit: false,
      title: "",
      selectData: [], //复选框选中的数据
    };
  },
  methods: {
    handleEdit(index, data) {
      this.tableCeilData = data;
      this.title = "编辑岗位";
      this.addOrEdit = true;
    },
    handleDelete(index, data) {
      this.$confirm("是否删除该岗位", "提示", {
        type: "warning"
      })
        .then(() => {
          delPosition(data.objectId).then(res => {
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
    // 添加岗位
    addPosition() {
      this.tableCeilData = {};
      this.title = "添加岗位";
      this.addOrEdit = true;
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
    // 多选框选中触发
    handleSelectionChange(selectData) {
      this.selectData = selectData;
    },
    selectHandle() {
      this.getData(this.rank);
    },
    getData(rank) {
      getPositionData(rank).then(res => {
        this.tableData = res;
        this.$nextTick(() => {
          this.loadingInstance.close();
        });
      });
    },
    batDelPosition() {
      let objectIdArr = this.selectData.map(val => {
        return val.objectId;
      });
      // console.log(objectIdArr);
      if(objectIdArr.length <= 0) {
        this.$message({
          message: '请选择要删除的选项',
          type: 'warning'
        })
        return;
      }
      let promiseArr = [];
      this.$confirm("确认删除所选选项吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          for (let i = 0; i < objectIdArr.length; i++) {
            promiseArr.push(delPosition(objectIdArr[i]));
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
    }
  },
  mounted() {
    this.loadingInstance = Loading.service({
      fullscreen: true,
      background: "rgba(0,0,0,0.5)"
    });
    this.getData("");
  },
  components: {
    addOrEdit
  }
};
</script>
<style scoped>
@import "../../../../../static/css/pages/organizationManage/positionManage/PositionManage.css";
</style>