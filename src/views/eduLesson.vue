<template>
  <div class="lesson-container">
    <el-button class="create-lesson" type="success" @click="handlecreate()"
      >创建课程</el-button
    >
    <div class="clearboth"></div>
    <div class="lesson-table">
      <template>
        <el-table
          ref="singleTable"
          :data="lessonData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column property="id" label="ID" width="120">
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
    </div>
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
    console.log(123);
    lessonService.all().then(res => {
      console.log(res);
      if (res.code === 200) {
        console.log(res.data);
        if (res.data) {
          res.data.forEach(arr => {
            console.log(arr.status, 222);
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
            console.log(arr.status);
          });
        }
      }
    });
  },
  methods: {
    handleCurrentChange() {
      console.log(123);
    },
    handlecreate() {
      this.$router.push({ name: "eduLessoncreate" });
    },
    handleedit() {
      this.$router.push({ name: "eduLessonedit" });
    },
    handledelete() {
      console.log("删除了");
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
