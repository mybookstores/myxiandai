<template>
  <div class="paperlink" style="height: 100vh;">
    <el-header height="30px">
      <span class="title" style="float: left; font-size: 30px; font-weight: 700"
        >问卷发放</span>
    </el-header>
    <el-divider></el-divider>
    <div class="paperlink-URL">
      
      <div id="paperURL" style="margin-top:20px;margin-bottom: 20px;">
        <span style=" margin-top: 20px;font-weight: bold;">
        问卷链接 :    
        </span>
        <span>  {{ paperURL }}</span>

      </div>
      
      <el-button
        class="copyBtn"
        type="primary"
        size="small"
        style="margin-top: 10px;background-color: #725ae9;border: #725ae9;"
        @click="copyURL()"
        icon="el-icon-link"
        :data-clipboard-text="paperURL"
      >
        复制链接
      </el-button>
    </div>
    <el-divider />

    <div style="text-align: left; padding-left: 20px">
      <el-button
        type="primary"
        size="small"
        @click="browsePaper(paperURL)"
        icon="el-icon-view"
        
      >
        预览问卷
      </el-button>
    </div>
    <!-- <el-divider /> -->
    <!-- <div style="text-align: left; padding-left: 30px">
      <el-button type="primary" size="small" @click="generateQRCode" icon="el-icon-view">
        生成二维码
      </el-button>
      <canvas ref="canvas" size="small"></canvas>
    </div> -->

  </div>
</template>

<script>
import Clipboard from 'clipboard'
import QRCode from 'qrcode'
export default {
  name: 'PaperLink',
  data() {
    return {
      addDialogVisible: false,
      paperId: -1,
      paperURL: `http://10.1.2.239:8082/customer/${this.$route.params.paperId}`,
      show: true
    }
  },
  mounted() {
    this.paperId = this.$route.params.paperId
    this._cp = new Clipboard('.copyBtn')
  },
  destroyed() {
    this._cp.destroy()
  },
  methods: {
    generateQRCode() {
      const canvas = this.$refs.canvas
      const text = 'www.bilibili.com' // 将要生成 QR 二维码的内容
      QRCode.toCanvas(canvas, text, { errorCorrectionLevel: 'L' }, (error) => {
        if (error) console.error(error)
        console.log('QR code generated successfully')
      })
    },
    copyURL() {
      this.$message({
        message: '复制成功!',
        type: 'success'
      })
    },
    browsePaper(paperURL) {
      console.log(paperURL)
      window.open(paperURL)
    }
  }
}
</script>

<style>
.paperlink {
  height: 100%;
}

.paperlink-header {
  height: 70px;
  line-height: 70px;
  text-align: left;
  padding-left: 30px;
  border-bottom: 1px groove;
}

.paperlink-URL {
  padding-left: 20px;
  text-align: left;

}
</style>
