<template>
  <div class="container">
    <div class="basicinfo">
      <div class="basic-title">
        <p class="text">基本信息</p>
        <el-button type="primary" @click="handleCourseEdit">修改</el-button>
      </div>
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <div class="lesson-info">
          <div class="form-left">
            <div class="form-name">课程名称</div>
            <el-input v-model="sizeForm.name"></el-input>
          </div>
          <div class="form-right">
            <div class="form-name">副标题</div>
            <el-input v-model="sizeForm.short_name"></el-input>
          </div>
        </div>
        <div class="form-item">
          <div class="form-name">课程提示</div>
          <el-input v-model="sizeForm.tips"></el-input>
        </div>
        <div class="form-item">
          <div class="form-name">课程描述</div>
          <el-input v-model="sizeForm.description"></el-input>
        </div>
        <div class="lesson-avatar">
          <div class="lesson-left">
            <div class="form-name">课程封面</div>
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
            <div class="form-name">课程状态</div>
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
        <p class="text">课程章节</p>
      </div>
      <draggable
        v-model="Chapdata"
        class="chapters-list"
        v-show="hidden"
        @start="start"
        @end="end"
      >
        <transition-group>
          <div
            v-for="(item, index) in Chapdata"
            :key="index"
            class="chapter-section"
          >
            <div class="chapter-title">
              <i class="el-icon-s-flag"></i>
              <div class="title">{{ item.name }}</div>
              <el-dropdown trigger="click">
                <span class="dots el-dropdown-link">···</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <div @click="ChapterEdit(item.id)">编辑</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="ChapterDelete(item.id, index)">删除</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="joint-list">
              <draggable
                v-model="item.sectionAll"
                v-show="hidden"
                group="people"
                @start="start"
                @end="end"
              >
                <transition-group class="dragspan">
                  <div
                    v-for="(item, index) in item.sectionAll"
                    :key="index"
                    class="joint-section"
                  >
                    <div class="joint-title no-title-line">
                      <i class="el-icon-star-on"></i>
                      <div class="title">{{ item.name }}</div>
                      <el-dropdown trigger="click">
                        <span class="dots el-dropdown-link">···</span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <div @click="JointContent(item.id)">内容</div>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <div @click="JointEdit(item.id)">
                              编辑
                            </div>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <div @click="JointDelete(item.id, index)">删除</div>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <div class="chouti">
                        <el-drawer
                          size="540px"
                          :visible.sync="drawer"
                          :direction="direction"
                          :before-close="handleClose"
                        >
                          <div class="main-drawer">
                            <p class="drawer-joint-title">小节名称</p>
                            <p class="drawer-joint-name">{{ secname }}</p>
                            <el-form label-position="left" label-width="80px">
                              <el-form-item
                                label="视频地址"
                                class="form-video_url"
                              >
                                <el-input
                                  v-model="video_url"
                                  size="300px"
                                ></el-input>
                              </el-form-item>
                            </el-form>
                            <p class="quill-task">课任务内容</p>
                            <div class="quill">
                              <quill-editor
                                class="quill-editor"
                                v-model="article.content"
                                ref="myQuillEditor"
                                :options="editorOption"
                              >
                              </quill-editor>
                            </div>
                          </div>
                          <div class="keep-btn">
                            <el-button
                              type="primary"
                              class="storysubmit"
                              @click="keepJoint"
                              >保存</el-button
                            >
                          </div>
                        </el-drawer>
                      </div>
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
                @click="handlecreatejoint(index)"
              ></el-button>
              <span class="add">添加节</span>
            </div>
          </div>
        </transition-group>
      </draggable>
      <div class="add-chapter-button">
        <span class="button-text">添加章</span>
        <el-button
          type="info"
          icon="el-icon-plus"
          circle
          class="chapter-button"
          size="mini"
          @click="handleCreatechap()"
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link"]
];

import draggable from "vuedraggable";
import qiniuService from "@/global/service/qiniu.js";
import lessonService from "@/global/service/lesson.js";
import chapterService from "@/global/service/chapter.js";
import sectionService from "@/global/service/section.js";
// import {formatTime} from "@/utils/formatDate.js"

export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      secname: "",
      section_id: null,
      video_url: "",
      article: {
        content: ""
      },
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      },
      sizeForm: {
        name: "",
        short_name: "",
        tips: "",
        description: "",
        status: ""
      },
      imageUrl: "",
      dialogVisible: false,
      dialogFormVisible: false,
      form: {
        name: ""
      },
      formLabelWidth: "120px",
      hidden: false,
      Chapdata: [],
      sectionAll: []
    };
  },
  components: {
    draggable,
    "quill-editor": quillEditor
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      lessonService.index(id).then(res => {
        if (res.code === 200) {
          this.hidden = true;
          this.Chapdata = res.data;
        }
      });

      lessonService.single(id).then(res => {
        if (res.code === 200) {
          this.sizeForm = res.data;
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
    handleCourseEdit() {
      console.log(123);
    },
    start: function(evt) {
      console.log(evt);
    },
    end(evt) {
      console.log(evt);
      let params = this.Chapdata;
      params.map((arr, index) => {
        arr.sort = index;
        arr.sectionAll.map((data, index) => {
          data.chapter_id = arr.id;
          data.sort = index;
        });
      });
      chapterService.sort({ params }).then(res => {
        console.log(res);
      });
    },
    //章节新增
    handleCreatechap() {
      let course_id = this.$route.params.id;
      this.$prompt("请输入章的名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let name = value;
          let created_at = new Date();
          console.log(this.Chapdata);
          let sort = this.Chapdata.length - 1;
          let params = {
            course_id: course_id,
            name: name,
            sort: sort,
            created_at: created_at
          };
          chapterService.insert(params).then(res => {
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
    handlecreatejoint(index) {
      this.$prompt("请输入节的名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let chapter_id = this.Chapdata[index].id;
          let name = value;
          let created_at = new Date();
          let sort = this.Chapdata[index].sectionAll.length;
          let params = {
            chapter_id: chapter_id,
            name: name,
            created_at: created_at,
            sort: sort
          };
          sectionService.insert(params).then(res => {
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
    ChapterEdit(id) {
      this.$prompt("请输入章的名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        let name = value;
        if (!name) {
          this.$message({
            type: "warning",
            message: "请输入章名！"
          });
        }
        let params = {
          name: name
        };
        chapterService.update(id, params).then(res => {
          this.$message({
            type: "success",
            message: res.message
          });
        });
        this.getData();
      });
    },
    ChapterDelete(id, index) {
      if (this.Chapdata[index].sectionAll.length > 0) {
        this.$message({
          type: "warning",
          message: "请先删除章中小节"
        });
      } else {
        this.$confirm("此操作将永久删除该章, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          chapterService.delete(id).then(res => {
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
      // this.$confirm("此操作将永久删除该章, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {

      //   chpaterService.delete(id).then(res => {
      //     if (res.code === 200) {
      //       this.$message({
      //         type: "success",
      //         message: res.message
      //       });
      //     }
      //   });
      //   this.getData();
      // });
    },
    JointContent(id) {
      this.drawer = true;
      sectionService.single(id).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.secname = res.data.name;
          this.section_id = res.data.id;
        }
      });
    },
    keepJoint() {
      let id = this.section_id;
      let video_url = this.video_url;
      let content = this.article.content;
      let updated_at = new Date();
      let params = {
        video_url: video_url,
        content: content,
        updated_at: updated_at
      };
      sectionService.update(id, params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
      });
    },
    JointEdit(id) {
      this.$prompt("请输入节的名称", "编辑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        let name = value;
        if (!name) {
          this.$message({
            type: "warning",
            message: "请输入节名！"
          });
        }
        let params = {
          name: name
        };
        sectionService.updatename(id, params).then(res => {
          this.$message({
            type: "success",
            message: res.message
          });
        });
        this.getData();
      });
    },
    JointDelete(id, index) {
      this.$confirm("此操作将永久删除该节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        sectionService.delete(id).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.message
            });
          }
        });
        this.getData();
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
.chapter-section {
  display: flex;
  flex-direction: column;
  border: 2px solid #333;
  margin-bottom: 10px;
}
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
  width: 100%;
}
.el-icon-s-flag {
  margin: 5px 5px 0 5px;
}
.joint-list {
  flex: 1;
}
.dragspan {
  display: block;
  width: 100%;
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

//抽屉
.quill {
  width: 85%;
  margin: 0 auto;
}
.quill {
  height: 400px;
}
.quill-task {
  text-align: left;
  margin-bottom: 10px;
  padding-left: 40px;
}
.quill-editor {
  height: 300px;
}
.ql-editor .ql-blank {
  height: 300px;
}
.drawer-joint-title {
  text-align: left;
  padding: 0 40px;
  margin: 20px 0;
  font-size: 16px;
}
.drawer-joint-name {
  text-align: left;
  padding: 0 40px;
  margin: 20px 0;
  font-size: 16px;
  font-weight: 500;
}
.form-video_url {
  padding: 0 40px;
}
.keep-btn {
  margin-top: 40px;
  padding: 0 40px;
}
.storysubmit {
  float: left;
}
</style>
