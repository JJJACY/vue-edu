<template>
  <div class="lesson-container">
    <el-button class="create-lesson" type="success" @click="handlecreate()"
      >添加角色</el-button
    >
    <div class="clearboth"></div>
    <template>
      <el-table :data="roleData" style="width: 100%">
        <el-table-column label="ID" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.description }}</span>
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
import roleService from "@/global/service/role.js";
export default {
  data() {
    return {
      roleData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      roleService.all().then(res => {
        if (res.code === 200) {
          this.roleData = res.data;
        }
      });
    },
    handleCurrentChange(val) {
      let id = val.id;
      console.log(id);
    },
    handlecreate() {
      this.$router.push({ name: "playercreate" });
    },
    handleEdit(index, row) {
      let id = row.id;
      console.log(id);
      this.$router.push({ name: "playeredit", params: { id } });
    },
    handleDelete(index, row) {
      let id = row.id;
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        roleService.delete(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.message
            });
          }
        });
        this.roleData.splice(index, 1);
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
