<template>
  <div class="box">
    <div class="nav">
      <h2>后台管理系统</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            prefix-icon="iconfont el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            prefix-icon="iconfont el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="form-btns">
          <el-button type="primary" @click="add">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { LoginApi } from "@/http/api";
export default {
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 4,
            max: 7,
            message: "长度在 4 到 7 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //   跳转
    add() {
      this.$refs.ruleForm.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        const res = await LoginApi(this.ruleForm);
        console.log("登陆成功：", res);
        this.$router.push("/hy");
      });
    },
    reset() {
      this.$refs.ruleForm.resetFields();
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}

.nav {
  width: 500px;
  height: 400px;
  background: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 6px;

  h2 {
    text-align: center;
    margin: 40px;
  }
}

.footer {
  width: 100%;

  div {
    margin-left: 330px;
  }
}

.el-form {
  width: 300px;
  margin: 0 auto;
}
</style>
