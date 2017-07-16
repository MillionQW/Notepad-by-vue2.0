<template>
<header class="header">
	<h1>记事本<a class="sideBtn" @click.prevent="openSliderBar"><span ></span></a></h1>
	
</header>
</template>
<script>
export default {
	methods: {
		openSliderBar() {
			this.$emit('tools');
		}
	}
}
</script>
<style>
.header {
	position: relative;
	width: 100%;
	height: 70px;
	text-align: center;
	background: #00b0f0;
	color: #fff;
	z-index: 100;
}
.header h1 {
	position: relative;
	margin: 0 auto;
	padding-top: 10px;
	width: 100%;
	max-width: 800px;
	text-align: center;
}
.header .sideBtn {
	position: absolute;
	right: 10px;
	top: 22px;
	margin-top: 10px;
	width: 30px;
	height: 26px;
	cursor: pointer;
} 
.sideBtn span, .sideBtn span:before, .sideBtn span:after {
	content: '';
	position: absolute;
	left: 0;
	width: 30px;
	height: 4px;
	background: #fff;
}
.sideBtn span:before {
	top: 0;
	transform: translateY(-7px);
	transition: all .3s;
}
.sideBtn span:after {
	transition: translateY(7px);
	transition: all .3s;
	top:8px;
}
</style>