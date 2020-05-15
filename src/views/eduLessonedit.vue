<template>
  <div class="container">
    <div class="basicinfo">
      <div class="basic-title">
        <p class="text">基本信息</p>
        <el-button type="primary" @click="handleChapterEdit">修改</el-button>
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
              <div class="dots" @click="dialogFormVisible = true">···</div>
              <el-dialog title="第一章" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item
                    label="请编辑章节名称"
                    :label-width="formLabelWidth"
                  >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="handleCancel()">取 消</el-button>
                  <el-button type="primary" @click="handleConfirm()"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
            </div>
            <div class="joint-list">
              <draggable v-model="Jointdata" class="joint-list">
                <transition-group>
                  <div
                    v-for="(item, index) in Jointdata"
                    :key="index"
                    class="joint-section"
                  >
                    <div class="joint-title no-title-line">
                      <i class="el-icon-star-on"></i>
                      <div class="title title-text">{{ item.joint }}</div>
                      <el-button
                        type="text"
                        class="dot"
                        style=" padding: 0;"
                        @click="dialogVisible = true"
                        >···</el-button
                      >
                      <el-dialog
                        :visible.sync="dialogVisible"
                        :before-close="handleClose"
                      >
                        <span slot="footer" class="dialog-footer">
                          <el-button @click="handleJointEdit()">编辑</el-button>
                          <el-button type="primary" @click="handleJointDelete()"
                            >删除</el-button
                          >
                        </span>
                      </el-dialog>
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
                @click="handlecreatejoint"
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
          @click="handleCreatechap"
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
import lessonService from "@/global/service/lesson.js";
import chapterService from "@/global/service/chapter.js";

export default {
  data() {
    return {
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
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      hidden: false,
      Chapdata: [
        // { id: 1,
        //   chap: '第一章',
        // },
        // {
        //   id: 2,
        //   chap: '第二章'
        // },
        // {
        //   id: 3,
        //   chap: '第三章',
        // }
      ],
      Jointdata: [
        // {
        //   joint: '第一节 ',
        // },
        // {
        //    joint: '第二节 ',
        // }
      ]
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
      lessonService.single(id).then(res => {
        if (res.code === 200) {
          this.sizeForm = res.data;
        }
      });

      chapterService.all().then(res => {
        console.log(res.data);
        if (res.code === 200) {
          this.Chapdata = res.data;
          this.hidden = true;
        } else {
          this.hidden = false;
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
    handleChapterEdit() {
      console.log(123);
    },
    handleClose(done) {
      console.log(done);
      this.dialogVisible = false;
    },
    start: function(evt) {
      console.log(evt);
    },
    end(evt) {
      // let id = this.$route.params.id;
      for (let i = 0; i < this.Chapdata.length; i++) {
        this.Chapdata[i].sort = i + 1;
      }
      let params = this.Chapdata;
      console.log(params);
      chapterService.sort({ params }).then(res => {
        console.log(res);
      });
      this.getData;
    },
    //章节新增
    handleCreatechap() {
      this.hidden = true;
      let tmp = this.Chapdata.push({ id: 1, chap: "第一章" });
      let code = [];
      if (this.Chapdata.length > 0) {
        for (let z = 0; z < this.Chapdata.length; z++) {
          code.push(z);
        }
      }
      let chaps = this.Chapdata[code.length - 1].chap;
      let Chinese = this.NumchangeChina(this.Chapdata.length); //数字转中文

      let name = chaps.replace(/一/, Chinese); //替换数字为中文

      let course_id = this.$route.params.id;
      let sort = code.length;
      let params = {
        name: name,
        course_id: course_id,
        sort: sort
      };
      console.log(params);
      chapterService.insert(params).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
        this.getData();
      });

      // this.Chapdata.splice(code.length - 1, 1, {
      //   id: code.length,
      //   name: name
      // });
    },
    handlecreatejoint() {
      console.log(123);
      // let tmp = this.Jointdata.push({ joint: "第一节" });
      // let code = [];
      // if (this.Jointdata.length > 0) {
      //   for (let z = 0; z < this.Jointdata.length; z++) {
      //     code.push(z);
      //   }
      // }
      // let joints = this.Jointdata[code.length - 1].joint;
      // let jointnum = this.NumchangeChina(this.Jointdata.length);
      // let newjoint = joints.replace(/一/, jointnum);
      // this.Jointdata.splice(code.length - 1, 1, { joint: newjoint });
      // console.log(this.Jointdata);
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
    handleConfirm() {
      console.log("确认");
      this.dialogFormVisible = false;
    },
    handleCancel() {
      console.log("取消");
      this.dialogFormVisible = false;
    },
    handleJointEdit() {
      console.log(444);
      this.dialogVisible = false;
    },
    handleJointDelete() {
      console.log(123);
      this.dialogVisible = false;
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
