<template>
    <div>
        <button @click="generateQRCode">生成二维码</button>
        <canvas ref="canvas"></canvas>
    </div>
</template>


<script>
    import QRCode from 'qrcode'
    export default{
        name:"two",
        methods: {
            generateQRCode() {
                const canvas = this.$refs.canvas
                const text = 'www.bilibili.com' // 将要生成 QR 二维码的内容
                QRCode.toCanvas(canvas, text, { errorCorrectionLevel: 'H' }, (error) => {
                    if (error) console.error(error)
                    console.log('QR code generated successfully')
                })
            }
        }

    }


</script>


<style scoped>

</style>