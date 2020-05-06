<template>
  <div class="login-container">
    <div class="left-section">
      <div class="left-title">EDU Pro</div>
      <div class="clearfloat"></div>
      <div class="left-text">
        整合企业与学校资源，实现企业<br />
        实战替代理论知识，打造实用型<br />人才
      </div>
      <div class="left-box">
        <div class="box-right-line box-line"></div>
        <div class="box-left-line box-line"></div>
      </div>
    </div>
    <div class="right-section">
      <div class="welcome">欢迎使用EDU Pro</div>
      <div class="login-form-container">
        <div class="login-form-password" v-show="passwordMode">
          <el-form :model="passwordFrom" status-icon ref="passwordFrom">
            <el-form-item prop="phone">
              <el-input
                type="number"
                prefix-icon="el-icon-mobile-phone"
                placeholder="请输手机号"
                v-model="passwordFrom.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checked">
              <div class="flex-cell">
                <el-checkbox class="flex-cell-bd" v-model="passwordFrom.checked"
                  >自动登录</el-checkbox
                >
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%"
                @click="submitForm('passwordFrom')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="login-form-phone" v-show="!passwordMode">
          <el-form :model="smsFrom" status-icon :rules="smsRules" ref="smsFrom">
            <el-form-item prop="phone">
              <el-input
                type="number"
                prefix-icon="el-icon-mobile-phone"
                placeholder="请输手机号"
                v-model="smsFrom.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <div class="flex-cell">
                <el-input
                  class="flex-cell-bd"
                  type="number"
                  placeholder="请输入验证码"
                  v-model="smsFrom.code"
                  autocomplete="off"
                  prefix-icon="el-icon-mobile"
                ></el-input>
                <el-button
                  :disabled="disabled"
                  class="flex-cell-ft"
                  @click="handleSendCode"
                  >{{ buttonName }}</el-button
                >
              </div>
            </el-form-item>
            <el-form-item prop="checked">
              <div class="flex-cell">
                <el-checkbox class="flex-cell-bd" v-model="smsFrom.checked"
                  >自动登录</el-checkbox
                >
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%"
                @click="submitForm('smsFrom')"
                >下一步</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordMode: true,
      passwordFrom: {
        phone: "",
        password: "",
        checked: true
      },
      smsFrom: {
        phone: "",
        password: "",
        checked: true
      },
      smsRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      buttonName: "获取验证码",
      disabled: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === "passwordFrom") {
            this.$router.replace({ name: "eduLesson" });
          } else {
            this.$router.replace({ name: "eduLesson" });
          }
        }
      });
    },
    handleSendCode() {
      if (this.disabled) {
        return;
      }

      this.$refs.smsFrom.validateField("phone", errMsg => {
        if (errMsg) return;
        this.disabled = true;

        let time = 60;
        this.buttonName = `(${time})秒重新发送`;
        const interval = window.setInterval(() => {
          time -= 1;
          this.buttonName = `(${time})秒重新发送`;
          if (time <= 0) {
            this.buttonName = "重新发送";
            this.disabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  height: 100%;
  width: 100%;
}
.left-section {
  width: 1/3 * 100%;
  padding: 20px;
  border: 2px solid #333;
}
.left-title {
  float: left;
  font-size: 24px;
  font-weight: 400;
  color: #333;
}
.clearfloat {
  clear: both;
}
.left-text {
  margin-top: 160px;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}
.left-box {
  position: relative;
  width: 320px;
  height: 320px;
  margin: 30px auto 0;
  border: 2px solid #333;
}
.box-line {
  width: 447px;
  height: 2px;
  background-color: #333;
}
.box-right-line {
  position: absolute;
  transform: rotate(45deg);
  bottom: 155px;
  left: -65px;
}
.box-left-line {
  position: absolute;
  transform: rotate(-45deg);
  bottom: 155px;
  left: -65px;
}
.right-section {
  width: 2/3 * 100%;
  padding: 80px;
  border: 2px solid #333;
}
.welcome {
  width: 300px;
  text-align: left;
  font-size: 32px;
  color: #333;
  font-weight: 500;
}
.login-form-container {
  margin-top: 40px;
}
.flex-cell-bd {
  float: left;
}
</style>
