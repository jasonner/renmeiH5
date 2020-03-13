<template>
	<div class="loading">
		<van-loading type="spinner" color="#1989fa"/>	
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: rgba(255,255,255,.9);
		z-index: 9999;
	}
</style>