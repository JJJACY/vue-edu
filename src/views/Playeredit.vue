<template>
  <div class="container">
    <div class="header">
      <p class="header-text">基本信息</p>
    </div>
    <div class="clear"></div>
    <div class="body">
      <div class="lesson-tips">
        <p class="tips">名称 :</p>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <div class="lesson-tips">
        <p class="tips">描述 :</p>
        <el-input v-model="description" placeholder="请输入内容"></el-input>
      </div>
      <div class="info">
        <p class="info-text">权限信息</p>
      </div>
      <div class="permission-info" v-for="item in groups" :key="item.name">
        <div class="info-left">
          {{ item.name }}
        </div>
        <div class="info-right">
          <el-checkbox-group v-model="check" @change="handlechange">
            <el-checkbox
              v-for="(arr, index) in item.permission"
              :key="index"
              :label="arr.slug"
              >&nbsp;{{ arr.name }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </div>

      <div class="button">
        <el-button type="primary" plain class="submit-btn" @click="handlesubmit"
          >修改</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import pergroupsService from "@/global/service/pergroups.js";
import roleService from "@/global/service/role.js";
export default {
  data() {
    return {
      permissionName: "",
      name: "",
      description: "",
      slogan: "",
      check: [],
      checkList: [],
      groups: [],
      values: [], // 存储value的数组
      labels: [] // 存储label的数组
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      pergroupsService.all().then(res => {
        this.groups = res.data;
      });
      let id = this.$route.params.id;
      roleService.single(id).then(res => {
        this.name = res.data.roleData.name;
        this.description = res.data.roleData.description;
        this.check = res.data.role_permission[0].permission_slug.split(",");
      });
    },
    handlechange(val) {
      console.log("val", val);
      this.values = [];
      this.labels = [];
      val.forEach(item => {
        const value = item.split(":")[0];
        const label = item.split(":")[1];
        this.values.push(value);
        this.labels.push(label);
      });
      console.log("this.values", this.values);
      console.log("this.labels", this.labels);
    },
    handlesubmit() {
      let id = this.$route.params.id;
      let name = this.name;
      let description = this.description;
      let updated_at = new Date();
      let permission_slug = this.values;
      if (!name || !description) {
        return this.$message.error("缺少参数！");
      }
      let params = {
        name: name,
        description: description,
        permission_slug: permission_slug,
        updated_at: updated_at
      };

      roleService.update(id, params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
      });
      this.$router.push({ name: "playerroot" });
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
.info {
  position: relative;
  height: 26px;
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
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
.permission-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  height: 40px;
  justify-content: space-around;
  text-align: left;
}
.info-label {
  margin-right: 30px;
}
.manage-list {
  margin-top: 20px;
  margin-bottom: 20px;
}
.manage-item {
  display: flex;
  margin-bottom: 30px;
}
.manage-title {
  margin-right: 30px;
  font-size: 15px;
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
.button {
  margin-top: 10px;
}
.submit-btn {
  float: left;
}
</style>
