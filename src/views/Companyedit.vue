<template>
  <div class="container">
    <div class="header">
      <p class="header-text">基本信息</p>
    </div>
    <div class="clear"></div>
    <div class="body">
      <div class="lesson">
        <div class="lesson-name">
          <p class="name">企业全称 :</p>
          <el-input
            v-model="name"
            placeholder="请输入内容"
            clearable
            style="width: 80%;"
          ></el-input>
        </div>
        <div class="lesson-subtitle">
          <p class="subtitle">企业短称 :</p>
          <el-input
            v-model="short_name"
            placeholder="请输入内容"
            clearable
            style="width: 80%;"
          ></el-input>
        </div>
      </div>
      <div class="lesson">
        <div class="lesson-name">
          <p class="name">企业口号 :</p>
          <el-input
            v-model="slogan"
            placeholder="请输入内容"
            clearable
            style="width: 80%;"
          ></el-input>
        </div>
        <div class="lesson-subtitle">
          <p class="subtitle">社会编号 :</p>
          <el-input
            v-model="code"
            placeholder="请输入内容"
            clearable
            style="width: 80%;"
          ></el-input>
        </div>
      </div>
      <div class="lesson">
        <div class="lesson-name">
          <p class="name">联系人名称 :</p>
          <el-input
            v-model="contact_name"
            placeholder="请输入内容"
            clearable
            style="width: 80%;"
          ></el-input>
        </div>
        <div class="lesson-subtitle">
          <p class="subtitle">联系人电话 :</p>
          <el-input
            v-model="contact_phone"
            placeholder="请输入内容"
            clearable
            style="width: 80%;"
          ></el-input>
        </div>
      </div>
      <div class="lesson-tips">
        <p class="tips">企业介绍 :</p>
        <el-input v-model="introduction" placeholder="请输入内容"></el-input>
      </div>
      <div class="lesson-avatar">
        <p class="avatars">企业封面 :</p>
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action=""
            :http-request="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="image_url" :src="image_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="button">
        <el-button type="primary" plain class="submit-btn" @click="handleEdit"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu.js";
import companyService from "@/global/service/company.js";

export default {
  data() {
    return {
      name: "",
      short_name: "",
      slogan: "",
      code: "",
      introduction: "",
      contact_name: "",
      contact_phone: "",
      image_url: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      companyService.single(id).then(res => {
        this.name = res.data.name;
        this.short_name = res.data.short_name;
        this.slogan = res.data.slogan;
        this.code = res.data.code;
        this.introduction = res.data.introduction;
        this.contact_name = res.data.contact_name;
        this.contact_phone = res.data.contact_phone;
      });
    },
    handleAvatarSuccess(files) {
      qiniuService.upload(files.file).then(res => {
        this.image_url = res;
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
    handleEdit() {
      let id = this.$route.params.id;
      let name = this.name;
      let short_name = this.short_name;
      let slogan = this.slogan;
      let code = this.code;
      let introduction = this.introduction;
      let contact_name = this.contact_name;
      let contact_phone = this.contact_phone;
      let image_url = this.image_url;
      if (
        !name ||
        !short_name ||
        !slogan ||
        !code ||
        !introduction ||
        !contact_name ||
        !contact_phone ||
        !image_url
      ) {
        return this.$message.error("缺少参数！");
      }
      let params = {
        name: this.name,
        short_name: this.short_name,
        slogan: this.slogan,
        code: this.code,
        introduction: this.introduction,
        contact_name: this.contact_name,
        contact_phone: this.contact_phone,
        image_url: this.image_url
      };
      console.log(params);
      companyService.update(id, params).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
        this.$router.push({ name: "company" });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0 200px;
}
.header {
  float: left;
}
.header-text {
  position: relative;
  height: 26px;
  padding-left: 10px;
  line-height: 26px;
  text-align: left;
  font-size: 18px;
  color: #333;
  font-weight: 400;
  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 5px;
    left: 0px;
    width: 2px;
    height: 14px;
    background: #333;
  }
}
.clear {
  clear: both;
}

.lesson {
  display: flex;
  margin-top: 30px;
}
.lesson-name {
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: flex-start;
}
.name {
  margin-bottom: 10px;
  text-align: left;
}
.lesson-subtitle {
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: flex-end;
}
.subtitle {
  margin-bottom: 10px;
  text-align: left;
}
.lesson-tips {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 75%;
  justify-content: flex-start;
}
.tips {
  margin-bottom: 10px;
  text-align: left;
}
.lesson-des {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 75%;
  justify-content: flex-start;
}
.des {
  margin-bottom: 10px;
  text-align: left;
}

//图片上传
.lesson-avatar {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 75%;
  justify-content: flex-start;
}
.avatars {
  margin-bottom: 10px;
  text-align: left;
}
.upload {
  width: 178px;
  height: 178px;
  float: left;
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

.button {
  margin-top: 10px;
}
.submit-btn {
  float: left;
}
</style>
