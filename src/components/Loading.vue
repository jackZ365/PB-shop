<template>
	<!-- 页面请求时，正在加载的效果，单独做一个组件，其它地方也可以调用 -->
	<transition enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
		<div class="Loading">
			<img src="../assets/loading.gif">
			<span>正在加载...</span>
		</div>
	</transition>
	
</template>

<script>
</script>

<style scoped>
	@import url("../assets/animate.css");
	.Loading{
		position: fixed;z-index: 99;
		top: 50%;left: 50%;
		transform: translate(-50%,-50%);
		text-align:center;
		
	}
	.Loading span{
		color:#666;
		margin-left: 5px;
		vertical-align: 30px;
	}
	
	.Loading img{
		width: 70px;
	}
</style>
