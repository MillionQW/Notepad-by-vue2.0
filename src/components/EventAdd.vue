<template>
<div class="eventAdd">
		<input type="text" placeholder="待办事项" v-model="content" @keyup.enter="submit">
		<button @click.prevent = "submit">提交</button>
</div>
</template>
<script>
export default {
	name: 'EventAdd',
	data() {
		return {
			content: ''
		}
	},
	methods: {
		submit() {
			this.content = this.content.trim();
			let param = {
				id: 0,
				type: 1,
				content: '',
			};
			if(this.content) {
				param.content = this.content;
				this.$store.dispatch('addEvent', param)	//把状态（数据）的改变分发给Actions
				this.content = ''
			}
		}
	}
}
</script>
<style scoped>
.eventAdd {
	position: relative;
	padding: 30px 90px 30px 0;
}
.eventAdd input {
	width: 100%;
	height: 40px;
	padding: 7px 10px;
	border-radius: 3%;
	border: 1px solid #ccc;
	box-sizing: border-box;
	font-size: 18px;
	transition: border-color .2 ease;
}

.eventAdd button {
	position: absolute;
	top: 30px;
	right: 0;
	width: 80px;
	height: 40px;
	border: 0;
	border-radius: 5%;
	font-size: 20px;
	background: #00b0f0;
	color: #fff;
}
</style>