<template>
  <div class="home-container">
    <div class="header">
      <p class="maintitle">project</p>
      <p class="subtitle">project description</p>
    </div>
    <div class="container">
      <div class="basicinfo">
        <div class="basic-title">
          <p class="text">版本</p>
        </div>
        <div class="joint-list">
          <draggable
            v-model="Versiondata"
            group="people"
            @start="start"
            @end="versionend"
          >
            <transition-group class="dragspan">
              <div
                v-for="(item, index) in Versiondata"
                :key="index"
                :class="{ active: index == isactive }"
                class="joint-section"
              >
                <div class="joint-title" @click="chooseversion(item.id, index)">
                  <i class="el-icon-s-flag"></i>
                  <div class="title">{{ item.name }}</div>
                  <el-dropdown trigger="click">
                    <span class="dots el-dropdown-link">···</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <div @click="versionEdit(item.id)">
                          编辑
                        </div>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div @click="versionDelete(item.id)">删除</div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </transition-group>
          </draggable>
          <div class="add-version-button">
            <span class="add">添加版本</span>
            <el-button
              type="info"
              icon="el-icon-plus"
              circle
              size="mini"
              class="add-button"
              @click="handlecreateversion()"
            ></el-button>
          </div>
        </div>
      </div>
      <div class="chapters">
        <div class="basic-title">
          <p class="text">课程故事</p>
        </div>
        <draggable
          v-model="Storydata"
          class="chapters-list"
          @start="start"
          @end="end"
        >
          <transition-group>
            <div
              v-for="(item, index) in Storydata"
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
                      <div @click="storyEdit(item.id)">编辑</div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div @click="storyDelete(item.id, index)">删除</div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="joint-list">
                <draggable
                  v-model="item.taskAll"
                  group="people"
                  @start="start"
                  @end="end"
                >
                  <transition-group class="dragspan">
                    <div
                      v-for="(item, index) in item.taskAll"
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
                              <div @click="taskContent(item.id)">内容</div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <div @click="storyDelete(item.id, index)">
                                删除
                              </div>
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
                              <el-form label-position="left" label-width="80px">
                                <el-form-item label="名称" class="form-name">
                                  <el-input
                                    v-model="Taskname"
                                    size="680px"
                                  ></el-input>
                                </el-form-item>
                              </el-form>
                              <div class="task-list">
                                <div class="task-item">
                                  <p class="task-title">任务难度</p>
                                  <div class="task-choose">
                                    <el-select
                                      v-model="value1"
                                      placeholder="请选择"
                                    >
                                      <el-option
                                        v-for="item in level"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                      >
                                      </el-option>
                                    </el-select>
                                  </div>
                                </div>
                                <div class="task-item">
                                  <p class="task-title">任务平台</p>
                                  <div class="task-choose">
                                    <el-select
                                      v-model="value2"
                                      placeholder="请选择"
                                    >
                                      <el-option
                                        v-for="item in platform"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                      >
                                      </el-option>
                                    </el-select>
                                  </div>
                                </div>
                              </div>
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
                                @click="keeptask"
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
                  @click="handlecreatetask(index)"
                ></el-button>
                <span class="add">添加任务</span>
              </div>
            </div>
          </transition-group>
        </draggable>
        <div class="add-chapter-button">
          <span class="button-text">添加故事</span>
          <el-button
            type="info"
            icon="el-icon-plus"
            circle
            class="chapter-button"
            size="mini"
            @click="handleCreatestory()"
          ></el-button>
        </div>
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
import versionService from "@/global/service/version.js";
import storyService from "@/global/service/story.js";
import taskService from "@/global/service/task.js";

export default {
  data() {
    return {
      task_id: null,
      value1: "",
      value2: " ",
      article: {
        content: ""
      },
      dialogVisible: false,
      dialogFormVisible: false,
      form: {
        name: ""
      },
      formLabelWidth: "120px",
      Versiondata: [],
      Storydata: [],
      isactive: 0,
      version_id: null,
      drawer: false,
      direction: "rtl",
      Taskname: "",
      level: [
        { value: "1", label: "入门" },
        { value: "2", label: "初级" },
        { value: "3", label: "中级" },
        { value: "4", label: "高级" }
      ],
      platform: [
        { value: "1", label: "API" },
        { value: "2", label: "前台" },
        { value: "3", label: "后台" },
        { value: "4", label: "小程序" }
      ],
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      }
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
      versionService.all(id).then(res => {
        if (res.code === 200) {
          this.Versiondata = res.data;
        }
      });
    },
    handleCourseEdit() {
      console.log(123);
    },
    start: function(evt) {
      console.log(evt);
    },
    end: function(evt) {
      console.log(evt);
    },
    versionend(evt) {
      console.log(evt);
      let params = this.Versiondata;
      params.map((arr, index) => {
        arr.sort = index;
      });
      versionService.sort({ params }).then(res => {
        console.log(res);
      });
    },
    //版本故事任务新增
    handlecreateversion() {
      let project_id = this.$route.params.id;
      this.$prompt("请输入版本的名称", "新版本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let name = value;
          let created_at = new Date();
          let sort = this.Versiondata.length;
          let params = {
            project_id: project_id,
            name: name,
            created_at: created_at,
            sort: sort
          };
          console.log(params);
          versionService.insert(params).then(res => {
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
    versionEdit(id) {
      console.log(id);
      this.$prompt("请输入版本的名称", "编辑版本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let name = value;
          let updated_at = new Date();
          let params = {
            name: name,
            updated_at: updated_at
          };
          versionService.update(id, params).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "修改成功"
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
    versionDelete(id) {
      this.$confirm("此操作将永久删除该版本, 是否继续?", "删除版本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        versionService.delete(id).then(res => {
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
    chooseversion(id, index) {
      let version_id = id;
      this.version_id = version_id;
      this.isactive = index;
      storyService.all(version_id).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.Storydata = res.data;
        }
      });
    },
    handleCreatestory() {
      if (this.version_id == "") {
        this.$message({
          type: "warning",
          message: "请先选择版本信息"
        });
      }
      let version_id = this.version_id;
      let project_id = this.$route.params.id;
      this.$prompt("请输入故事的名称", "新故事", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let name = value;
          let created_at = new Date();
          let sort = this.Storydata.length;
          let params = {
            version_id: version_id,
            project_id: project_id,
            name: name,
            sort: sort,
            created_at: created_at
          };
          console.log(params);
          storyService.insert(params).then(res => {
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
    handlecreatetask(index) {
      let project_id = this.$route.params.id;
      let version_id = this.Storydata[index].version_id;
      this.$prompt("请输入任务的名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let story_id = this.Storydata[index].id;
          let name = value;
          let created_at = new Date();
          let sort = this.Storydata[index].taskAll.length;
          let params = {
            project_id: project_id,
            version_id: version_id,
            story_id: story_id,
            name: name,
            created_at: created_at,
            sort: sort
          };
          taskService.insert(params).then(res => {
            console.log(res);
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
    storyEdit(id) {
      console.log(id);
      this.$prompt("请输入故事的名称", "编辑故事", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        let name = value;
        if (!name) {
          this.$message({
            type: "warning",
            message: "请输入故事名！"
          });
        }
        let params = {
          name: name
        };
        storyService.update(id, params).then(res => {
          this.$message({
            type: "success",
            message: res.message
          });
        });
      });
    },
    storyDelete(id, index) {
      if (this.Storydata[index].taskAll.length > 0) {
        this.$message({
          type: "warning",
          message: "请先删除故事中的任务"
        });
      } else {
        this.$confirm("此操作将永久删除该故事, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          storyService.delete(id).then(res => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message
              });
            }
          });
        });
      }
    },
    taskContent(id) {
      this.drawer = true;
      taskService.single(id).then(res => {
        if (res.code === 200) {
          this.Taskname = res.data.name;
          this.task_id = res.data.id;
        }
      });
    },
    keeptask() {
      let id = this.task_id;
      let name = this.Taskname;
      let level = this.value1;
      let platform = this.value2;
      let content = this.article.content;
      let updated_at = new Date();
      let params = {
        name: name,
        level: level,
        platform: platform,
        content: content,
        updated_at: updated_at
      };
      taskService.update(id, params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
      });
      this.drawer = true;
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
.active {
  background: lightblue;
}
.quill {
  width: 85%;
  margin: 0 auto;
}
.form-name {
  width: 480px;
  margin: 0 auto;
}
.task-list {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 30px;
  margin-top: 30px;
}
.task-title {
  margin-bottom: 10px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  font-size: 16px;
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
.keep-btn {
  margin-top: 20px;
  padding: 0 40px;
}
.storysubmit {
  float: left;
}

.header {
  height: 96px;
  width: 100%;
  border-bottom: 2px solid #000;
  margin-bottom: 40px;
}
.maintitle {
  height: 56px;
  line-height: 56px;
  text-align: left;
  font-size: 30px;
  color: #000;
}
.subtitle {
  height: 24px;
  line-height: 24px;
  text-align: left;
  font-size: 16px;
  color: #000;
}

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
  margin-bottom: 40px;
}
.text {
  position: relative;
  height: 40px;
  padding-left: 10px;
  line-height: 40px;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}
.lesson-info {
  display: flex;
  flex-direction: row;
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
  border: 2px solid #333;
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
  border-bottom: 1px solid #fff;
}
.el-icon-star-on {
  margin: 5px 5px 0 5px;
}
.add-joint {
  display: flex;
  flex-direction: row-reverse;
  height: 40px;
  background: #fff;
  line-height: 40px;
}
.add {
  line-height: 44px;
}
.add-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin: 12px 20px 0 5px;
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
.add-version-button {
  display: flex;
  flex-direction: row;
  place-content: flex-end;
  height: 48px;
  line-height: 48px;
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
