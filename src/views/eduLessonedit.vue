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
      <div class="chapters-list" :data="Chapdata">
        <div class="chapters-item">
          <div class="chapters-chap">
            <i class="el-icon-s-flag"></i>
            <p class="chapters-num">{{ Chapdata[0].chap }}</p>
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
          <div class="chapters-chap-num">
            <p class="chapters-joint">{{ Chapdata[0].joint }}</p>
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
          <div class="chapters-item-button">
            <el-button
              type="info"
              icon="el-icon-plus"
              circle
              size="mini"
              class="add-button"
              @click="handlecreatechap"
            ></el-button>
            <span class="add">添加节</span>
          </div>
        </div>
        <!-- <div class="chapters-item">
          <div class="chapters-chap">
            <i class="el-icon-s-flag"></i>
            <p class="chapters-num">第二章</p>
            <div class="dots">···</div>
          </div>
          <div class="chapters-chap-num">
            <p class="chapters-joint">第一节</p>
            <div class="dot">···</div>
          </div>
          <div class="chapters-item-button">
            <el-button type="info" icon="el-icon-plus" circle size="mini" class="add-button"></el-button>
            <span class="add">添加节</span>
          </div>
        </div> -->
      </div>
      <div class="chapters-list list-button">
        <div class="chapters-item-button">
          <el-button
            type="info"
            icon="el-icon-plus"
            circle
            class="add-button"
            size="mini"
          ></el-button>
          <span class="add">添加章</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      Chapdata: [
        {
          chap: "第一章",
          joint: "一级"
        }
      ]
    };
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
    handlecreatechap() {
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
.chapters-item {
  border: 2px solid #333;
  margin-bottom: 10px;
}
.chapters-chap {
  display: flex;
  flex-direction: row;
  padding: 10px;
  background: #fff;
}
.el-icon-s-flag {
  margin-top: 3px;
}
.chapters-num {
  flex: 1;
  text-align: left;
  margin-left: 5px;
}
.chapters-chap-num {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
}
.chapters-joint {
  margin-left: 26px;
}
.dots {
  margin-right: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
}
.dot {
  margin-right: 15px;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  cursor: pointer;
}
.chapters-item-button {
  display: flex;
  flex-direction: row-reverse;

  padding-right: 20px;
  height: 40px;
  background: #fff;
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
  // position: relative;
  // &:after{
  //   content: '+';
  //   display: inline-block;
  //   margin-left: 5px;
  //   width: 20px;
  //   height: 20px;
  //   line-height: 20px;
  //   text-align: center;
  //   border-radius: 50%;
  //   background: #333;
  //   color: #fff;
  // }
}
.list-button {
  margin-top: 0;
  border: 2px solid #333;
}
</style>
