<template>
  <div class="container">
    <Statistics v-if="width > 414"/>
   	<div  v-else>
      <h1>Статистика</h1>
      <div class="forMobile">К сожалению статистика не достапна с мобилного устройства</div>
   	</div>
  </div>
</template>

<script>
import Statistics from "@/components/Statistics";

export default {
  components: {
    Statistics
  },
  created() {
    window.addEventListener('resize', this.updateWidth);
    this.width = window.innerWidth;
  },
  methods: {
    updateWidth() {
      this.width = window.innerWidth;
    }
  },
  data() {
  	return {
  		width: 0
  	}
  }
}
</script>

<style lang="less" scoped>
	.container{
		height: 100vh;
		display: flex;
		justify-content: center;
		background: #EFF1F9;
		.forMobile{
			display: flex;
			justify-content: center;
			align-items: center;
      background:#fff;
      height: 89px;
      margin-top: 16px;
      padding: 24px 44px 33px 22px;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      border-radius: 10px;
    }
  }
  @media(max-width: 414px) {
    .container {
      padding: 0 16px;
      h1{
        margin-top: 100px;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 32px;
      }
    }
  }
</style>