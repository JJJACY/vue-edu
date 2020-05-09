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
      <!-- <div class="login-form-container">
        <div class="login-form-password" v-show="passwordMode">
          <el-form
            :model="passwordFrom"
            status-icon
            :rules="passwordRules"
            ref="passwordFrom"
          >
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
                <el-checkbox
                  class="flex-cell-bd"
                  v-model="passwordFrom.checked"
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
          <el-form
            :model="smsFrom"
            status-icon
            :rules="smsRules"
            ref="smsFrom"
          >
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
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div> -->
      <div class="account-login-mainer">
        <div class="login-tab-container">
          <div
            :class="['login-tab-item', { active: passwordMode }]"
            @click="passwordMode = !passwordMode"
          >
            账号密码登录
          </div>
          <div
            :class="['login-tab-item', { active: !passwordMode }]"
            @click="passwordMode = !passwordMode"
          >
            手机登录
          </div>
        </div>
        <div class="login-form-container">
          <div class="login-form-password" v-show="passwordMode">
            <el-form
              :model="passwordFrom"
              status-icon
              :rules="passwordRules"
              ref="passwordFrom"
            >
              <el-form-item prop="phone">
                <el-input
                  type="number"
                  prefix-icon="el-icon-mobile-phone"
                  placeholder="请输手机号"
                  v-model="passwordFrom.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  prefix-icon="el-icon-lock"
                  placeholder="请输入密码"
                  v-model="passwordFrom.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checked">
                <div class="flex-cell">
                  <el-checkbox
                    class="flex-cell-bd"
                    v-model="passwordFrom.checked"
                    >自动登录</el-checkbox
                  >
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 100%"
                  @click="handlesubmit('passwordFrom')"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div class="login-form-phone" v-show="!passwordMode">
            <el-form
              :model="smsFrom"
              status-icon
              :rules="smsRules"
              ref="smsFrom"
            >
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
                    type="success"
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
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataStore from "@/global/storage/index.js";
import NoteService from "@/global/service/Note.js";
import AdminService from "@/global/service/Admin.js";
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
      passwordRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      buttonName: "获取验证码",
      disabled: false
    };
  },
  created() {
    let token = DataStore.getToken();
    if (token) {
      return this.$router.replace({ name: "eduLogin" });
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // if (formName === "passwordFrom") {
          //   this.$router.replace({ name: "DashboardGeneral" });
          // } else {
          //   this.$router.replace({ name: "DashboardGeneral" });
          // }
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
        let phone = this.smsFrom.phone;
        console.log(phone);
        if (!phone || phone.length < 11) {
          return this.$message.error("请输入正确手机号码");
        }
        NoteService.send({ phone }).then(res => {
          console.log(res, 111);
          if (res.code === 200) {
            this.$notify({
              type: "success",
              title: "验证码:",
              message: res.data,
              duration: 4000
            });
          }
        });

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
    },
    handlesubmit() {
      //账号密码登陆
      let phone = this.passwordFrom.phone;
      let password = this.passwordFrom.password;
      console.log(phone, password);
      if (!phone || !password) {
        return this.$message.error("请先输入账号密码");
      }
      AdminService.adminlogin({ phone, password }).then(res => {
        console.log(res);
        if (res.code === 200) {
          DataStore.setToken(res.token);
          // DataStore.setName(res.data.name);
          // DataStore.setStatus(res.data.status);
          this.$message({
            type: "success",
            message: res.message
          });
          this.$router.replace({ name: "Dashboard" });
        } else {
          this.$message({
            type: "fail",
            message: res.message
          });
        }
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
.flex-cell-ft {
  margin-top: 20px;
  width: 100%;
}

.account-login-contaienr {
  display: flex;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  background-position: center;
  padding-top: 40px;
  box-sizing: border-box;
}
.account-login-bd {
  flex: 1;
  padding: 32px 0;
}
.company-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .company-info-logo {
    height: 44px;
    margin-right: 20px;
  }
  .company-info-name {
    line-height: 44px;
    font-size: 33px;
    font-weight: 600;
    font-family: Avenir;
  }
}
.company-info-desc {
  margin: 12px 0 40px;
  font-size: 14px;
  opacity: 0.5;
  text-align: center;
}
.account-login-mainer {
  max-width: 388px;
  margin: 40px auto;
}
.login-tab-container {
  text-align: center;
  margin-bottom: 24px;
  .login-tab-item {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    margin-right: 32px;
    padding: 12px 16px;
    // cursor: pointer;
    // font-size: 14px;
    // line-height: 20px;
    // color: #666;
    // border-bottom: 2px solid transparent;
    // transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    // &:last-child {
    //   margin-right: 0;
    // }
    // &.active {
    //   color: #1890ff;
    //   font-weight: 500;
    //   border-color: #1890ff;
    // }
  }
}
</style>
