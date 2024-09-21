<template>
  <div >
<!--    头部-->
    <div style="display: flex;position: fixed;width:100%;z-index: 100;background-color: #fff; height: 60px; line-height: 60px;justify-content: space-between; border-bottom: 1px solid #eee">
      <div style="width: 400px; display: flex; padding-left: 30px;color: #755eed;font-weight: bold;font-size: 18px;">
        <div style="width: 60px">
          <img src="../../assets/nuaaicon.jpg" alt="" style="width: 40px; position: relative; top: 10px; right: 0">
        </div>
        <div style="flex: 1">欢迎来到学生满意度调查管理系统</div>
      </div>
      <!-- <div style="flex: 1">


        <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/front/home">首页</el-menu-item>
          <el-menu-item index="/editor/overview">问卷总览</el-menu-item>
          <el-menu-item index="/front/video">关于我们</el-menu-item>
          <el-menu-item index="/front/article">系统公告</el-menu-item>
          <el-menu-item index="/front/file2">本站资源</el-menu-item>
          <el-menu-item index="/front/im">联系我们</el-menu-item>

        </el-menu>
      </div> -->
      <div style="width: 200px">
        <div v-if="!user.username" style="text-align: right; padding-right: 30px">
          <el-button @click="$router.push('/login')">登录</el-button>
          <el-button @click="$router.push('/register')">注册</el-button>
        </div>
        <div v-else>
          <el-dropdown style="width: 150px; cursor: pointer; text-align: right">
            <div style="display: inline-block">
              <img :src="user.ava" alt=""
                   style="width: 30px; border-radius: 50%; position: relative; top: 10px; right: 5px">
              <span>{{ user.nickname }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            </div>
            <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <router-link to="/front/password">修改密码</router-link>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <router-link to="/front/person">个人信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0" v-if="user.username==='admin'">
                <span style="text-decoration: none" @click="goto">后台</span>
              </el-dropdown-item>
              <el-dropdown-item style="font-size: 14px; padding: 5px 0">
                <span style="text-decoration: none" @click="logout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div style="width: 100%; margin: 0 auto;position: absolute;top:60px;">
      <router-view @refreshUser="getUser" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Front",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created() {

  },
  methods: {
    logout() {
      this.$store.commit("logout")
      this.$message.success("退出成功")
    },
    goto(){
      this.$router.push("/paperManage")
      this.$store.commit("goto")
      this.$message.success("登录成功！")
    },
    getUser() {
      let username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : ""
      if (username) {
        // 从后台获取User数据
        this.request.get("/user/username/" + username).then(res => {
          // 重新赋值后台的最新User数据
          this.user = res.data
        })
      }
    }
  }
}
</script>

<style>
.item{
  display: inline-block;
  width: 100px;

  text-align: center;
  cursor: pointer
}
.item a {
  color: 	#1E90FF;
}
.item:hover{
  background-color: 	LightPink;
}
</style>
