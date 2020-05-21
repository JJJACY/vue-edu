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
                    <el-button type="text" @click="PathEdit(item.id)"
                      >编辑</el-button
                    >
                  </el-dropdown-item>
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
                        <el-button type="primary" @click="pathConfirm"
                          >确 定</el-button
                        >
                      </div>
                    </el-dialog>
                  </div>
                  <el-dropdown-item>
                    <div @click="ChapterDelete(item.id, index)">删除</div>
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
                    <el-button type="primary" @click="pathConfirm"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
              </div>
            </div>
            <div class="joint-list">
              <draggable v-model="Jointdata[index]" class="joint-list">
                <transition-group>
                  <div
                    v-for="(item, index) in Jointdata[index]"
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
                            <div @click="JointEdit(item.id)">编辑</div>
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

// import {formatTime} from "@/utils/formatDate.js"
import zhiyeService from "@/global/service/zhiye.js";

export default {
  data() {
    return {
      sizeForm: {
        name: "",
        description: "",
        status: ""
      },
      imageUrl: "",
      zhiyeData: [
        { name: "初级工程师" },
        { name: "中级工程师" },
        { name: "高级工程师" }
      ],
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
      console.log(id);
      zhiyeService.single(id).then(res => {
        console.log(res);
        this.sizeForm = res.data;
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
      console.log(123);
    },
    //章节新增
    handleCreatepath() {
      console.log(123);
    },
    handleCreateclass(index) {
      this.$prompt("请输入课程ID", "关联课程", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的ID是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    NumchangeChina(num) {
      let chinarr = new Array(
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      );
      var arr2 = new Array("", "十", "百", "千");
      if (!num || isNaN(num)) {
        return "零";
      }
      let english = num.toString().split("");
      let result = "";
      for (let x = 0; x < english.length; x++) {
        let des_x = english.length - 1 - x;
        result = arr2[x] + result;
        let arr1_index = english[des_x];
        result = chinarr[arr1_index] + result;
      }
      result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十");
      result = result.replace(/零+/g, "零");
      result = result.replace(/零+$/, "");
      result = result.replace(/^一十/g, "十");
      return result;
    },

    PathEdit() {
      this.dialogFormVisible = true;
    },
    pathCancel() {
      this.dialogFormVisible = false;
    },
    pathConfirm() {
      this.dialogFormVisible = false;
    },

    ChapterDelete(index, id) {
      console.log(id, index);
    },
    JointContent() {
      console.log("内容");
    },
    JointEdit() {
      console.log(444);
    },
    JointDelete() {
      console.log(123);
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
