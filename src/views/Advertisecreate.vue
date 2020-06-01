<template>
  <div class="container">
    <div class="header">
      <p class="header-text">基本信息</p>
    </div>
    <div class="clear"></div>
    <div class="body">
      <div class="lesson-tips">
        <p class="tips">广告名称</p>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <div class="lesson-tips">
        <p class="tips">slug</p>
        <el-input v-model="slug" placeholder="请输入内容"></el-input>
      </div>
      <div class="lesson">
        <div class="lesson-name">
          <p class="name">尺寸: 宽</p>
          <el-input
            v-model="width"
            placeholder="请输入内容"
            clearable
            style="width: 80%;"
          ></el-input>
        </div>
        <div class="lesson-subtitle">
          <p class="subtitle">尺寸: 高</p>
          <el-input
            v-model="height"
            placeholder="请输入内容"
            clearable
            style="width: 80%;"
          ></el-input>
        </div>
      </div>
      <div class="button">
        <el-button type="primary" plain class="submit-btn" @click="handlesubmit"
          >创建广告</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import advertiseService from "@/global/service/advertise.js";

export default {
  data() {
    return {
      name: "",
      slug: "",
      width: "",
      height: ""
    };
  },
  created() {},
  methods: {
    handlesubmit() {
      let name = this.name;
      let slug = this.slug;
      let width = this.width;
      let height = this.height;
      if (!name || !slug || !width || !height) {
        return this.$message.error("缺少参数！");
      }
      let params = {
        name: name,
        slug: slug,
        width: width,
        height: height
      };
      console.log(params);
      advertiseService.insert(params).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
        this.$router.push({ name: "advertise" });
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
