<template>
  <div class="container">
    <div class="header">
      <p class="header-text">基本信息</p>
    </div>
    <div class="clear"></div>
    <div class="body">
      <div class="lesson-tips">
        <p class="tips">姓名 :</p>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <div class="lesson-tips">
        <p class="tips">手机号码 :</p>
        <el-input v-model="phone" placeholder="请输入内容"></el-input>
      </div>
      <div class="lesson-tips">
        <p class="tips">角色 :</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.description"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="button">
        <el-button type="primary" plain class="submit-btn" @click="handlesubmit"
          >编辑</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import roleService from "@/global/service/role.js";
import managerService from "@/global/service/manager.js";

export default {
  data() {
    return {
      name: "",
      phone: "",
      role_id: "",
      value: "",
      options: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      managerService.single(id).then(res => {
        this.name = res.data.name;
        this.phone = res.data.phone;
        this.role_id = res.data.role_id;
      });
      roleService.all().then(res => {
        this.options = res.data;
      });
    },
    handlesubmit() {
      let id = this.$route.params.id;
      let name = this.name;
      let phone = this.phone;
      let role_id = this.value;
      let updated_at = new Date();
      if (!name || !phone || !role_id) {
        return this.$message.error("缺少参数！");
      }
      let params = {
        name: name,
        phone: phone,
        role_id: role_id,
        updated_at: updated_at
      };
      console.log(params);
      managerService.update(id, params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
      });
      this.$router.push({ name: "manager" });
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
