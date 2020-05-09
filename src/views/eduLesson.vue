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
          :data="tableData"
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
          <el-table-column label="操作"> </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          date: "2016-05-02",
          name: "王小虎",
          subtitle: "上海市普陀区金沙江路 1518 弄",
          status: 0
        },
        {
          id: "2",
          date: "2016-05-04",
          name: "王小虎",
          subtitle: "上海市普陀区金沙江路 1517 弄",
          status: 1
        },
        {
          id: "3",
          date: "2016-05-01",
          name: "王小虎",
          subtitle: "上海市普陀区金沙江路 1519 弄",
          status: 0
        },
        {
          id: "4",
          date: "2016-05-03",
          name: "王小虎",
          subtitle: "上海市普陀区金沙江路 1516 弄",
          status: 1
        }
      ],
      currentRow: null
    };
  },
  create() {},
  methods: {
    handleCurrentChange() {
      console.log(123);
    },
    handlecreate() {
      this.$router.push({ name: "eduLessoncreate" });
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
