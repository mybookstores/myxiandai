<template>
  <div class="login">
    <div  class="login-form"
            style="margin: 200px auto; background-color: #fff; width: 350px; height: 280px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登 录</b></div>


      <el-form :model="user" :rules="rules" ref="userForm">


        <el-form-item prop="username">
          <el-input size="medium" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input size="medium" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>


        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button type="warning" size="small" autocomplete="off"  style="background-color: #725ae9;border: #725ae9;"  @click="$router.push('/register')">注册</el-button>
          <el-button type="primary" size="small" autocomplete="off"  style="background-color: #0a94f0;border: #0a94f0;"  @click="login">登录</el-button>
        </el-form-item>


      </el-form>
    </div>
  </div>
</template>

<script>
  import {setRoutes} from "@/router";

  export default {
    name: "Login",
    data() {
      return {
        user: {},
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 20 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      login() {

        this.$refs['userForm'].validate((valid) => {
          if (valid) {  // 表单校验合法
            this.request.post("/user/login", this.user).then(res => {
              console.log(localStorage.getItem("user"))
              // console.log(res)
              if (res.code == '200') {
                // console.log(res)
                localStorage.setItem("user", JSON.stringify(res.data))  // 存储用户信息到浏览器
                localStorage.setItem("menus", JSON.stringify(res.data.menus))  // 存储用户信息到浏览器
               
                // 动态设置当前用户的路由
                setRoutes()
                this.$message.success("登录成功")

                if (res.data.role === 'ROLE_STUDENT') {
                  this.$router.push("/editor/overview")
                } else {
                  this.$router.push("/")
                }
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        });
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 100vh;
    background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB);
    overflow: hidden;

  }

  .login {
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    background: azure url('../assets/nuaa3.jpg') no-repeat fixed;
    background-size: 100% 100%;
  }

  .login-form {
    height: 350px;
    width: 600px;
    box-sizing: border-box;
    background-color: #fff;
    opacity: 0.9;
    padding: 20px 50px;
  }

</style>
