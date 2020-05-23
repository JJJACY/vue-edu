<template>
  <div class="container">
    <div class="basicinfo">
      <div class="basic-title">
        <p class="text">基本信息</p>
        <el-button type="primary" @click="handleZhiyeEdit">修改</el-button>
      </div>
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <div class="form-item">
          <div class="form-name">职业名称</div>
          <el-input v-model="sizeForm.name"></el-input>
        </div>
        <div class="form-item">
          <div class="form-name">职业描述</div>
          <el-input v-model="sizeForm.description"></el-input>
        </div>
        <div class="lesson-avatar">
          <div class="lesson-left">
            <div class="form-name">职业封面</div>
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              action=""
              :http-request="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="lesson-right">
            <div class="form-name">职业状态</div>
            <el-switch
              v-model="sizeForm.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </div>
        </div>
      </el-form>
    </div>
    <div class="chapters">
      <div class="basic-title">
        <p class="text">职业路径</p>
      </div>
      <draggable
        v-model="zhiyeData"
        class="chapters-list"
        @start="start"
        @end="end"
      >
        <transition-group>
          <div
            class="zhiyelist"
            v-for="(item, index) in zhiyeData"
            :key="index"
          >
            <div class="chapter-title">
              <i class="el-icon-s-flag"></i>
              <div class="title">{{ item.name }}</div>
              <el-dropdown trigger="click">
                <span class="dots el-dropdown-link">···</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="PathEdit()">编辑</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="PathDelete(item.id, index)">删除</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="drop-list">
                <el-dialog
                  title="修改职业路径"
                  :visible.sync="dialogFormVisible"
                >
                  <el-form :model="form">
                    <el-form-item
                      label="路径名称"
                      :label-width="formLabelWidth"
                    >
                      <el-input
                        v-model="form.name"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="路径描述"
                      :label-width="formLabelWidth"
                    >
                      <el-input
                        v-model="form.description"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="pathCancel">取 消</el-button>
                    <el-button type="primary" @click="pathConfirm(item.id)"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
              </div>
            </div>
            <div class="joint-list">
              <draggable
                v-model="item.courseAll"
                class="joint-list"
                group="people"
                @start="start"
                @end="end"
              >
                <transition-group class="dragspan">
                  <div
                    v-for="(item, index) in item.courseAll"
                    :key="index"
                    class="joint-section"
                  >
                    <div class="joint-title no-title-line">
                      <i class="el-icon-star-on"></i>
                      <div class="title">{{ item.course_id }}</div>
                      <el-dropdown trigger="click">
                        <span class="dots el-dropdown-link">···</span>
                        <el-dropdown-menu slot="dropdown">
                          <!-- <el-dropdown-item>
                            <div @click="CourseContent(item.id)">内容</div>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <div @click="CourseEdit(item.id)">编辑</div>
                          </el-dropdown-item> -->
                          <el-dropdown-item>
                            <div @click="CourseDelete(item.id, index)">
                              删除
                            </div>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </div>
            <div class="add-joint">
              <el-button
                type="info"
                icon="el-icon-plus"
                circle
                size="mini"
                class="add-button"
                @click="handleCreateclass(index)"
              ></el-button>
              <span class="add">添加关联课程</span>
            </div>
          </div>
        </transition-group>
      </draggable>
      <div class="add-chapter-button">
        <span class="button-text">添加路径</span>
        <el-button
          type="info"
          icon="el-icon-plus"
          circle
          class="chapter-button"
          size="mini"
          @click="handleCreatepath"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.min.js"></script>
<!-- CDNJS :: Sortable (https://cdnjs.com/) -->
<script src="//cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js"></script>
<!-- CDNJS :: Vue.Draggable (https://cdnjs.com/) -->
<script src="//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js"></script>
<script>
import draggable from "vuedraggable";
import qiniuService from "@/global/service/qiniu.js";

import zhiyeService from "@/global/service/zhiye.js";
import zhiyepathService from "@/global/service/zhiyepath.js";
import zhiyecourseService from "@/global/service/zhiyecourse.js";

export default {
  data() {
    return {
      sizeForm: {
        name: "",
        description: "",
        status: ""
      },
      imageUrl: "",
      zhiyeData: [],
      Jointdata: [],
      dialogFormVisible: false,
      form: {
        name: "",
        description: ""
      },
      formLabelWidth: "120px",
      hidden: false
    };
  },
  components: {
    draggable
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      zhiyeService.single(id).then(res => {
        this.sizeForm = res.data;
      });

      zhiyeService.index(id).then(res => {
        if (res.code === 200) {
          this.zhiyeData = res.data;
        }
      });
    },
    handleAvatarSuccess(files) {
      qiniuService.upload(files.file).then(res => {
        console.log(res);
        this.imageUrl = res;
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleZhiyeEdit() {
      console.log(123);
    },
    start: function(evt) {
      console.log(evt);
    },
    end(evt) {
      let params = this.zhiyeData;
      params.map((arr, index) => {
        arr.sort = index;
        arr.courseAll.map((data, index) => {
          data.zhiye_id = arr.id;
          data.sort = index;
        });
      });
      zhiyepathService.sort({ params }).then(res => {
        console.log(res);
      });
    },
    //路径新增
    handleCreatepath() {
      let zhiye_id = this.$route.params.id;
      this.$prompt("请输入路径名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let name = value;
          let created_at = new Date();
          let sort = this.zhiyeData.length;
          let params = {
            zhiye_id: zhiye_id,
            name: name,
            sort: sort,
            created_at: created_at
          };
          console.log(params);
          zhiyepathService.insert(params).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "新增成功"
              });
            }
          });
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleCreateclass(index) {
      let zhiye_id = this.$route.params.id;
      let path_id = this.zhiyeData[index].id;
      this.$prompt("请输入课程ID", "关联课程", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let course_id = value;
          let sort = this.zhiyeData[index].courseAll.length;
          let params = {
            zhiye_id: zhiye_id,
            path_id: path_id,
            course_id: course_id,
            sort: sort
          };
          zhiyecourseService.insert(params).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
            }
          });
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    PathEdit() {
      this.dialogFormVisible = true;
    },
    pathCancel() {
      this.dialogFormVisible = false;
    },
    pathConfirm(id) {
      this.dialogFormVisible = false;
      let name = this.form.name;
      let description = this.form.description;
      if (!name || !description) {
        this.$message({
          type: "warning",
          message: "缺少参数"
        });
      }
      let params = {
        name: name,
        description: description
      };
      zhiyepathService.update(id, params).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
      });
      this.getData();
    },

    PathDelete(id, index) {
      if (this.zhiyeData[index].courseAll.length > 0) {
        this.$message({
          type: "warning",
          message: "请先删除职业路径中的课程"
        });
      } else {
        this.$confirm("此操作将永久删除该路径, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          zhiyepathService.delete(id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
            }
          });
          this.getData();
        });
      }
    },

    CourseDelete(id, index) {
      console.log(id, index);
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        zhiyecourseService.delete(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.message
            });
          }
        });
        this.getData();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: row;
}
.basicinfo {
  width: 48%;
  margin-right: 2%;
}
.basic-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.text {
  position: relative;
  height: 40px;
  padding-left: 10px;
  line-height: 40px;
  font-size: 18px;
  color: #333;
  font-weight: 400;
  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 12px;
    left: 0px;
    width: 2px;
    height: 14px;
    background: #333;
  }
}
.lesson-info {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.form-name {
  text-align: left;
  margin-bottom: 10px;
}
.form-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 10px;
}
.form-left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 10px;
}
.form-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
}
.lesson-avatar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.lesson-left {
  margin-top: 20px;
  width: 50%;
}
//图片上传
.upload {
  width: 178px;
  height: 178px;
  float: left;
}
.avatar-uploader {
  width: 178px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #fff;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.lesson-right {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 50%;
}

//右边
.chapters {
  width: 48%;
  margin-left: 2%;
}
.chapters-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.dragspan {
  display: block;
  width: 100%;
}
.zhiyelist {
  border: 2px solid #fcfcfc;
  margin-bottom: 20px;
}
// .chapter-section {
//   border: 2px solid #333;
//   margin-bottom: 10px;
// }
.chapter-title {
  display: flex;
  flex-direction: row;
  height: 30px;
  line-height: 30px;
  background: #fff;
}
.title {
  flex: 1;
  text-align: left;
}
.el-icon-s-flag {
  margin: 5px 5px 0 5px;
}
.joint-title {
  display: flex;
  flex-direction: row;
  height: 30px;
  line-height: 30px;
  background: #cccccc;
  border-bottom: 1px solid #fff;
}
.el-icon-star-on {
  margin: 5px 5px 0 5px;
}
.add-joint {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 20px;
  height: 40px;
  background: #fff;
  line-height: 40px;
}
.add {
  line-height: 40px;
}
.add-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin: 10px 0 0 5px;
}
.dots {
  margin-right: 5px;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
}
.dot {
  margin-right: 5px;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
}
.add-chapter-button {
  display: flex;
  flex-direction: row;
  place-content: flex-end;
  height: 48px;
  line-height: 48px;
  border: 2px solid #333;
}
.chapter-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin: 14px 20px 0 5px;
}
</style>
