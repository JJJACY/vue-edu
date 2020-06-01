<template>
  <div class="lesson-container">
    <el-button class="create-lesson" type="success" @click="handlecreate()"
      >创建广告</el-button
    >
    <div class="clearboth"></div>
    <template>
      <el-table :data="advertiseData" style="width: 100%">
        <el-table-column label="ID" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="slug" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.slug }}</span>
          </template>
        </el-table-column>
        <el-table-column label="尺寸：宽" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.width }}</span>
          </template>
        </el-table-column>
        <el-table-column label="尺寸：高" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.height }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" class="handle">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import advertiseService from "@/global/service/advertise.js";
export default {
  data() {
    return {
      advertiseData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      advertiseService.all().then(res => {
        this.advertiseData = res.data;
      });
    },
    handleCurrentChange(val) {
      console.log(123, val);
      let id = val.id;
      console.log(id);
    },
    handlecreate() {
      this.$router.push({ name: "advertisecreate" });
    },
    handleEdit(index, row) {
      let id = row.id;
      this.$router.push({ name: "advertiseedit", params: { id } });
    },
    handleDelete(index, row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        advertiseService.delete(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.message
            });
          }
        });
        this.advertiseData.splice(index, 1);
        this.getData();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.lesson-container {
  padding: 10px;
}
.create-lesson {
  float: left;
}
.clearboth {
  margin-bottom: 20px;
  clear: both;
}
</style>
