<template>
  <div class="container">
    <div class="header">
      <p class="header-text">基本信息</p>
      <button class="edit-btn" size="medium" plain @click="handleEdit">
        修改
      </button>
    </div>
    <div class="clear"></div>
    <div class="body">
      <div class="lesson-tips">
        <p class="tips">物料名称 :</p>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <div class="lesson-des">
        <p class="des">跳转链接 :</p>
        <el-input v-model="link" placeholder="请输入内容"></el-input>
      </div>
      <div class="lesson-tips">
        <p class="tips">打开窗口 :</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="lesson-avatar">
        <p class="avatars">物料图片 :</p>
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
    </div>
  </div>
</template>

<script>
import qiniuService from "@/global/service/qiniu.js";
import materialService from "@/global/service/material.js";

export default {
  data() {
    return {
      name: "",
      link: "",
      image_url: "",
      value: "",
      options: [
        { value: "_self", label: "原窗口" },
        { value: "_blank", label: "新窗口" }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      materialService.single(id).then(res => {
        this.name = res.data.name;
        this.link = res.data.link;
        this.image_url = res.data.image_url;
        this.value = res.data.target;
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
      let link = this.link;
      let target = this.value;
      let image_url = this.image_url;
      if (!name || !link || !target || !image_url) {
        return this.$message.error("缺少参数！");
      }
      let params = {
        name: name,
        link: link,
        target: target,
        image_url: image_url
      };
      materialService.update(id, params).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
        this.$router.push({ name: "material" });
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
.edit-btn {
  width: 98px;
  height: 36px;
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
