<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="logo" />
      </div>
      <div class="login_text">
        BreakBlog - 管理后台
      </div>
      <!-- 登录表单 -->
      <el-form
        class="login_form"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-key"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <div class="form_button">
          <el-form-item>
            <el-button type="primary" size="mudium" @click="login"
              >登录</el-button
            >
            <el-button type="info" size="mudiun" @click="resetLoginForm"
              >重置</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login_container {
  background-color: #e2e2e2;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 340px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .form_button {
    padding: 0 70px;
  }
}

.login_text {
  text-align: center;
  padding: 100px;
  font-weight: bold;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 80px;
  box-sizing: border-box;
}
</style>
<script>
export default {
  data() {
    return {
      //登录表单数据绑定
      loginForm: {
        username: "admin",
        password: "breakblog",
      },
      // 表单验证规则
      loginFormRules: {
        // 验证用户名
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        //验证密码
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (vaild) => {
        if (!vaild) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res);
        if (res.code !== 1) return this.$message.error("登录失败");
        this.$message.success("登录成功");
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
    },
  },
};
</script>
