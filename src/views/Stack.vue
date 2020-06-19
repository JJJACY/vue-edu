<template>
  <div class="lesson-container">
    <el-button class="create-lesson" type="success" @click="handlecreate()"
      >创建</el-button
    >
    <div class="clearboth"></div>
    <template>
      <el-table :data="stackData" style="width: 100%">
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
        <!-- <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column> -->
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
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="pagination.total"
          :page-size="pagination.pageSize"
          :current-page.sync="pagination.nowPage"
          @current-change="handlechange"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
import stackService from "@/global/service/stack.js";
export default {
  data() {
    return {
      stackData: [],
      pagination: {
        pageSize: 10,
        total: 0,
        nowPage: 1
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      stackService.all().then(res => {
        if (res.code === 200) {
          this.stackData = res.data;
          this.pagination.total = res.total;
        }
      });
    },
    handleCurrentChange(val) {
      console.log(123, val);
      let id = val.id;
      console.log(id);
    },
    handlecreate() {
      this.$router.push({ name: "stackcreate" });
    },
    handleEdit(index, row) {
      let id = row.id;
      this.$router.push({ name: "stackedit", params: { id } });
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
        // this.getData();
      });
    },
    handlechange() {
      let nowPage = this.pagination.nowPage;
      stackService.pagina({ nowPage }).then(res => {
        if (res.code == 200) {
          this.stackData = res.data;
        }
      });
    }
    // handleprev(){
    //   console.log(this.pagination.nowPage)
    // },
    // hanlenext(){
    //   console.log(this.pagination.nowPage)
    // }
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
.block {
  margin-top: 20px;
}
</style>
