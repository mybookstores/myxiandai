<template>
  <div class='bg'>
    <div class='customer'>
      <div style="margin-top: 30%" class="title">完成填写！</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      const paperId = this.$route.params.paperId
      console.log(paperId)
      this.$router.push({ name: 'customer', params: { paperId } })
    }
  }
}
</script>

<style>
.customer > .title {
  text-align: center;
  font-size: 40px;
}
</style>
