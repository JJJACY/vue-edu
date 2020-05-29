<template>
  <div class="lesson-container">
    <el-button class="create-lesson" type="success" @click="handlecreate()"
      >创建</el-button
    >
    <div class="clearboth"></div>
    <template>
      <el-table :data="skillData" style="width: 100%">
        <el-table-column label="ID" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.stem }}</span>
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
import skillService from "@/global/service/skill.js";
export default {
  data() {
    return {
      skillData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      skillService.all().then(res => {
        if (res.code === 200) {
          this.skillData = res.data;
        }
      });
    },
    handleCurrentChange(val) {
      let id = val.id;
      console.log(id);
    },
    handlecreate() {
      this.$router.push({ name: "skillcreate" });
    },
    handleEdit(index, row) {
      let id = row.id;
      this.$router.push({ name: "skilledit", params: { id } });
    },
    handleDelete(index, row) {
      let id = row.id;
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        skillService.delete(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.message
            });
          }
        });
        this.skillData.splice(index, 1);
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
