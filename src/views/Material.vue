<template>
  <div class="lesson-container">
    <el-button class="create-lesson" type="success" @click="handlecreate()"
      >创建物料</el-button
    >
    <div class="clearboth"></div>
    <template>
      <el-table :data="materialData" style="width: 100%">
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
        <el-table-column label="内容" width="500">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.image_url"
              fit="contain"
            ></el-image>
            <span style="margin-left: 10px">{{ scope.row.image_url }}</span>
          </template>
        </el-table-column>
        <el-table-column label="跳转链接" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.link }}</span>
          </template>
        </el-table-column>
        <el-table-column label="打开窗口" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.target }}</span>
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
import materialService from "@/global/service/material.js";
export default {
  data() {
    return {
      materialData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      materialService.all().then(res => {
        if (res.code == 200) {
          this.materialData = res.data;
          res.data.forEach(data => {
            switch (data.target) {
              case "_self":
                data.target = "原窗口";
                break;
              case "_blank":
                data.target = "新窗口";
                break;
              default:
                break;
            }
          });
        }
      });
    },
    handleCurrentChange(val) {
      console.log(123, val);
      let id = val.id;
      console.log(id);
    },
    handlecreate() {
      this.$router.push({ name: "materialcreate" });
    },
    handleEdit(index, row) {
      let id = row.id;
      console.log(id);
      this.$router.push({ name: "materialedit", params: { id } });
    },
    handleDelete(index, row) {
      let id = row.id;
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        materialService.delete(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.message
            });
          }
        });
        this.materialData.splice(index, 1);
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
