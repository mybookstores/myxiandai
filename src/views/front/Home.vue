<template>
  <div>
    <div style="margin: 10px 0">
      <el-carousel height="700px" :interval="10000">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item" alt="" style="width: 100%">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div style="margin: 10px 0">
      <el-row :gutter="10">
        <el-col :span="6" v-for="item in files" :key="item.id" style="margin-bottom: 10px">

          <div style="border: 1px solid #ccc; padding-bottom: 10px">
            <img :src="item.url" alt="" style="width: 100%">
            <div style="color: #666; padding: 10px">{{ item.name }}</div>
            <div style="padding: 10px"><el-button type="primary">查看</el-button></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "FrontHome",
  data() {
    return {
      imgs: [
        'https://img.zcool.cn/community/013cb45eec833aa801206621dd46d1.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100',
        'https://p3.itc.cn/images01/20211124/887ece5dbe614cb0bf6e4a65b535e29b.jpeg',
        'https://img2.baidu.com/it/u=3684173594,481879006&fm=253&fmt=auto&app=138&f=JPEG?w=695&h=500',
        'https://www.ydym8.com/uploads/allimg/210513/1-210513100941D7.jpg'

      ],
      files: []
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
