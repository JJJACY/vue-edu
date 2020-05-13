<template>
  <div class="container">
    <div class="basicinfo">
      <div class="basic-title">
        <p class="text">基本信息</p>
        <el-button type="primary" @click="handleedit">修改</el-button>
      </div>
      <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <div class="lesson-info">
          <div class="form-left">
            <div class="form-name">课程名称</div>
            <el-input v-model="sizeForm.name"></el-input>
          </div>
          <div class="form-right">
            <div class="form-name">副标题</div>
            <el-input v-model="sizeForm.subtitle"></el-input>
          </div>
        </div>
        <div class="form-item">
          <div class="form-name">课程提示</div>
          <el-input v-model="sizeForm.tip"></el-input>
        </div>
        <div class="form-item">
          <div class="form-name">课程描述</div>
          <el-input v-model="sizeForm.des"></el-input>
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
      <draggable v-model="Chapdata" class="chapters-list" v-show="hidden">
        <transition-group>
          <div v-for="item in Chapdata" :key="item.id" class="chapter-section">
            <div class="chapter-title">
              <i class="el-icon-s-flag"></i>
              <div class="title">{{ item.chap }}</div>
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
                    v-for="item in Jointdata"
                    :key="item.id"
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
                          <el-button @click="handleedit1()">编辑</el-button>
                          <el-button type="primary" @click="handledelete()"
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
// let id = 1000;
export default {
  data() {
    return {
      sizeForm: {
        name: "",
        subtitle: "",
        tip: "",
        des: "",
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
  created() {},
  methods: {
    handleAvatarSuccess(files) {
      console.log(123, files);
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
    handleedit() {
      console.log(123);
    },
    handleedit1() {
      console.log(444);
      this.dialogVisible = false;
    },
    handledelete() {
      console.log(123);
      this.dialogVisible = false;
    },
    handleClose(done) {
      console.log(done);
      this.dialogVisible = false;
    },
    handleCancel() {
      console.log(123);
      this.dialogFormVisible = false;
    },
    handleConfirm() {
      console.log(123);
      this.dialogFormVisible = false;
    },
    start: function(evt) {
      console.log(evt);
    },
    end(evt) {
      console.log(evt);
    },
    handleCreatechap() {
      this.hidden = true;
      // console.log(this.Chapdata)
      let chap = this.Chapdata;
      // console.log(chap)
      let tmp = chap.push({ id: 1, chap: "第一章" });
      // console.log(chap[0].id)
      console.log(chap.length);
      if (chap.length > 0) {
        for (let i = 0; i < chap.length; i++) {
          // console.log(chap[i].id)
          let code = chap[i].chap.split("")[1];
          let numbercode = code.replace(new RegExp(code, "g"), i + 1);
          // console.log(chap[i].chap,code,numbercode)
          numbercode++;
          console.log(numbercode);
          // console.log(chap[i].chap.split('')[1])
          return chap[i].id++;
        }
      }
      console.log(chap);
    },
    handlecreatejoint() {
      console.log(123);
      let joint = this.Jointdata;
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
