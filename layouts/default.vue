<template>
	<div class="container" v-if="this.$store.getters['account/status']">
		<NavBar/>
		<Nuxt/>
	</div>
</template>

<script>
	import NavBar from "@/components/NavBar";

	export default {
		components: {
			NavBar
		},
		beforeCreate() {
			if (this.$store.getters['account/status'] == false) {
				this.$router.push('/login')
			}
		},
	}
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
	body{font-family: 'Montserrat', sans-serif;}
	*{
		outline: none;
		margin:0;
		padding:0;
		box-sizing: border-box;
	}
	.container{
		display: flex;
		width: 100%;
	}
</style>
