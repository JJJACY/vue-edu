<template>
  <div class="container">
    <div class="basicinfo">
      <div class="basic-title">
        <p class="text">基本信息</p>
        <el-button type="primary" @click="handleadEdit">修改</el-button>
      </div>
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <div class="form-item">
          <div class="form-name">广告名称:</div>
          <el-input v-model="sizeForm.name"></el-input>
        </div>
        <div class="form-item">
          <div class="form-name">slug:</div>
          <el-input v-model="sizeForm.slug"></el-input>
        </div>
        <div class="lesson-info">
          <div class="form-left">
            <div class="form-name">尺寸: 宽</div>
            <el-input v-model="sizeForm.width"></el-input>
          </div>
          <div class="form-right">
            <div class="form-name">尺寸: 高</div>
            <el-input v-model="sizeForm.height"></el-input>
          </div>
        </div>
      </el-form>
    </div>
    <div class="chapters">
      <div class="basic-title">
        <p class="text">广告-物料</p>
      </div>
      <!-- <draggable
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
      </draggable> -->
      <div class="joint-list">
        <draggable
          v-model="materialAll"
          group="people"
          @start="start"
          @end="end"
        >
          <transition-group class="dragspan">
            <div
              v-for="(item, index) in materialAll"
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
          @click="handlecreatematerial()"
        ></el-button>
        <span class="add">添加物料</span>
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
import advertiseService from "@/global/service/advertise.js";
import advertisematerService from "@/global/service/advertisematerial.js";
import materialService from "@/global/service/material.js";
// import chapterService from "@/global/service/chapter.js";
// import sectionService from "@/global/service/section.js";

export default {
  data() {
    return {
      sizeForm: {
        name: "",
        slug: "",
        width: "",
        height: ""
      },
      form: {
        name: ""
      },
      formLabelWidth: "120px",
      materialAll: [],
      materialname: null
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
      advertiseService.single(id).then(res => {
        if (res.code === 200) {
          this.sizeForm = res.data;
        }
      });
      advertisematerService.single(id).then(res => {
        if (res.code == 200) {
          res.data.forEach(data => {
            this.materialAll.push(data.name[0]);
          });
        }
      });
    },
    handleadEdit() {
      let id = this.$route.params.id;
      let name = this.sizeForm.name;
      let slug = this.sizeForm.slug;
      let width = this.sizeForm.width;
      let height = this.sizeForm.height;
      if (!name || !slug || !width || !height) {
        return this.$message.error("缺少参数！");
      }
      let params = {
        name: name,
        slug: slug,
        width: width,
        height: height
      };
      advertiseService.update(id, params).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
      });
    },
    start: function(evt) {
      console.log(evt);
    },
    end(evt) {
      console.log(evt);
      // let params = this.Chapdata;
      // params.map((arr, index) => {
      //   arr.sort = index;
      //   arr.sectionAll.map((data, index) => {
      //     data.chapter_id = arr.id;
      //     data.sort = index;
      //   });
      // });
      // chapterService.sort({ params }).then(res => {
      //   console.log(res);
      // });
    },
    //物料新增
    handlecreatematerial() {
      this.$prompt("请输入物料ID", "添加关联物料", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let advertises_id = this.$route.params.id;
          let material_id = Number(value);
          let sort = this.materialAll.length;
          let params = {
            advertises_id: advertises_id,
            material_id: material_id,
            sort,
            sort
          };

          advertisematerService.insert(params).then(res => {
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
        // sectionService.updatename(id, params).then(res => {
        //   this.$message({
        //     type: "success",
        //     message: res.message
        //   });
        // });
        // this.getData();
      });
    },
    JointDelete(id, index) {
      this.$confirm("此操作将永久删除该节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // sectionService.delete(id).then(res => {
        //   if (res.code === 200) {
        //     this.$message({
        //       type: "success",
        //       message: res.message
        //     });
        //   }
        // });
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
