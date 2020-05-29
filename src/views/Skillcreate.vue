<template>
  <div class="container">
    <div class="header">
      <p class="header-text">基本信息</p>
    </div>
    <div class="clear"></div>
    <div class="body">
      <div class="lesson-tips">
        <p class="tips">题目 :</p>
        <el-input v-model="question" placeholder="请输入内容"></el-input>
      </div>
      <div class="task-list">
        <div class="task-item">
          <p class="task-title">技能:</p>
          <div class="task-choose">
            <el-select v-model="stack" placeholder="请选择">
              <el-option
                v-for="item in stack_id"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="task-item">
          <p class="task-title">等级:</p>
          <div class="task-choose">
            <el-select v-model="levels" placeholder="请选择">
              <el-option
                v-for="item in level"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="option">
        <p class="option-text">选项:</p>
        <div class="option-list">
          <div
            class="option-item"
            v-for="(item, index) in options"
            :key="index"
          >
            <el-input autocomplete="off" v-model="item[index]"> </el-input>
            <el-button
              class="optionDelete"
              icon="el-icon-close"
              circle
              size="mini"
              @click="Deleteoption(index)"
            ></el-button>
          </div>
        </div>
        <el-dialog title="添加题目信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="选项" label-width="120px">
              <el-input v-model="form.option" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="答案" label-width="120px">
              <el-input v-model="form.answer" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="Add">确 定</el-button>
          </div>
        </el-dialog>
        <el-button plain icon="el-icon-plus" @click="handleAdd()"></el-button>
      </div>
      <div class="answer">
        <el-radio-group
          v-model="radio"
          v-for="(item, index) in options"
          :key="index"
          class="answer-list"
        >
          <el-radio :label="options[index]">{{ item.answer }}</el-radio>
        </el-radio-group>
      </div>
      <div class="button">
        <el-button type="primary" plain class="submit-btn" @click="handlesubmit"
          >创建</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import skillService from "@/global/service/skill.js";
export default {
  data() {
    return {
      question: "",
      stack: "",
      levels: " ",
      level: [
        { value: "1", label: "入门" },
        { value: "2", label: "初级" },
        { value: "3", label: "中级" },
        { value: "4", label: "高级" }
      ],
      stack_id: [
        { value: "1", label: "HTML" },
        { value: "2", label: "CSS" }
      ],
      name: "",
      options: [],
      radio: 3,
      form: {
        option: null,
        answer: ""
      },
      dialogFormVisible: false,
      arr: []
    };
  },
  created() {},
  methods: {
    handlesubmit() {
      let question = this.question;
      let stack_id = this.stack;
      let level = this.levels;
      let option = this.form.option;
      let currect = this.form.option;
      let created_at = new Date();
      if (!question || !stack_id || !level || !option || !currect) {
        return this.$message.error("缺少参数！");
      }
      this.options.map((data, index) => {
        this.arr.push(index);
      });
      let params = {
        question: this.question,
        stack_id: this.stack,
        level: this.levels,
        option: JSON.stringify(this.arr),
        currect: Number(this.radio.option),
        created_at: created_at
      };
      if (!this.radio.option) {
        this.$message.error("请勾选答案");
      }
      skillService.insert(params).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        }
        this.$router.push({ name: "skill" });
      });
    },
    handleAdd() {
      this.dialogFormVisible = true;
    },
    Add() {
      let params = {
        option: this.form.option,
        answer: this.form.answer
      };
      this.options.push(params);
      this.dialogFormVisible = false;
    },
    Deleteoption(index) {
      this.options.splice(index, 1);
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
.lesson-tips {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 75%;
  justify-content: flex-start;
}
.task-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 75%;
  margin-bottom: 30px;
  margin-top: 30px;
}
.task-title {
  margin-bottom: 10px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  font-size: 16px;
}
.tips {
  margin-bottom: 10px;
  text-align: left;
}
.button {
  margin-top: 10px;
}
.option-text {
  margin-bottom: 10px;
}
.option-list {
  width: 80%;
}
.option {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 20px;
}
.option-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.optionDelete {
  margin-left: 10px;
  background: #000;
  color: #fff;
}
.answer {
  display: flex;
  flex-direction: row;
}
.answer-list {
  margin-right: 10px;
}
.submit-btn {
  float: left;
}
</style>
