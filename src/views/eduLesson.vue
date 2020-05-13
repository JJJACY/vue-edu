<template>
  <div class="lesson-container">
    <el-button class="create-lesson" type="success" @click="handlecreate()"
      >创建课程</el-button
    >
    <div class="clearboth"></div>
    <!-- <div class="lesson-table">
      <template slot-scope="scope">
        <el-table
          ref="singleTable"
          :data="lessonData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column property="id" label="ID" width="120">{{scope.row.id}}
          </el-table-column>
          <el-table-column property="name" label="名称" width="120">
          </el-table-column>
          <el-table-column property="subtitle" label="副标题" width="120">
          </el-table-column>
          <el-table-column property="status" label="状态" width="120">
          </el-table-column>
          <el-table-column label="操作">
            <el-button type="primary" size="mini" @click="handleedit()"
              >编辑</el-button
            >
            <el-button type="warning" size="mini" @click="handledelete()"
              >删除</el-button
            >
          </el-table-column>
        </el-table>
      </template>
    </div> -->
    <template>
      <el-table :data="lessonData" style="width: 100%">
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
        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.short_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.status }}</el-tag>
            </div>
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
import lessonService from "@/global/service/lesson.js";
export default {
  data() {
    return {
      lessonData: [],
      currentRow: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      lessonService.all().then(res => {
        if (res.code === 200) {
          if (res.data) {
            res.data.forEach(arr => {
              switch (arr.status) {
                case 0:
                  arr.status = "未完成";
                  break;
                case 1:
                  arr.status = "已完成";
                  break;
                default:
                  arr.status = "状态错误";
              }
              this.lessonData = res.data;
            });
          }
        }
      });
    },
    handleCurrentChange(val) {
      console.log(123, val);
      let id = val.id;
      console.log(id);
    },
    handlecreate() {
      this.$router.push({ name: "eduLessoncreate" });
    },
    handleEdit() {
      this.$router.push({ name: "eduLessonedit" });
    },
    handleDelete(index, row) {
      let id = row.id;
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        lessonService.delete(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.message
            });
          }
        });
        this.lessonData.splice(index, 1);
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
