<template>
  <div class="lesson-container">
    <el-button class="create-lesson" type="success" @click="handlecreate()"
      >创建项目</el-button
    >
    <div class="clearboth"></div>
    <template>
      <el-table :data="projectData" style="width: 100%">
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
        <el-table-column label="操作">
          <template class="use" slot-scope="scope">
            <el-dropdown trigger="click" class="dot">
              <span class="el-dropdown-link">... </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div @click="handleContent(scope.$index, scope.row)">
                    内容
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="handleEdit(scope.$index, scope.row)">编辑</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="handleDelete(scope.$index, scope.row)">删除</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import projectService from "@/global/service/project.js";
export default {
  data() {
    return {
      projectData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      projectService.all().then(res => {
        if (res.code === 200) {
          this.projectData = res.data;
        }
      });
    },
    handleCurrentChange(val) {
      console.log(123, val);
      let id = val.id;
      console.log(id);
    },
    handlecreate() {
      this.$router.push({ name: "projectcreate" });
    },
    handleContent(index, row) {
      let id = row.id;
      this.$router.push({ name: "projectdetail", params: { id } });
    },
    handleEdit(index, row) {
      let id = row.id;
      this.$router.push({ name: "projectedit", params: { id } });
    },
    handleDelete(index, row) {
      let id = row.id;
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // lessonService.delete(id).then(res => {
        //   if (res.code === 200) {
        //     this.$message({
        //       type: "success",
        //       message: res.message
        //     });
        //   }
        // });
        // this.lessonData.splice(index, 1);
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
.dot {
  width: 30px;
  text-align: center;
  font-size: 25px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
