<template>
<div class="sliderBar" :class="{'showBar':isShow}">
	<ul>
		<li><button @click="openEdit">编辑数据</button></li>
		<li><button @click="clearData">清空数据</button></li>
	</ul>
</div>
</template>
<script>
export default {
	data() {
		return {

		}
	},
	props: ['isShow'],
	methods: {
		openEdit() {
			this.$emit('openEdit');
		},
		clearData() {
			this.$store.dispatch('clearData');
			console.log("1");
		}
	}
}
</script>
<style>
.sliderBar {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 260px;
	padding:100px 20px 30px;
	box-sizing: border-box;
	text-align: center;
	background: rgba(41,41,41,.5);
	transform: translateX(-100%);
	transition: all .3s;
}
.sliderBar.showBar {
	transform: translateX(0);
}
.sliderBar li {
	margin-bottom: 20px;
}
.sliderBar button{
	width: 100px;
	height: 40px;
	border-radius: 5px;
	border: 0;
	font-size: 16px;
	color: #fff;
	background: #00b0f0;
	cursor: pointer;
}
</style>