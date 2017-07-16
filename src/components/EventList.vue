<template>
<div class="event-content">
	<div class="event-tab" @click="changeCollapse(0, $event)">
		未完成
		<span :class="{'close-span': collapse[0].show}" ></span>
	</div>
	<transition name="slide-fade">
	<div  class="event-box" v-show="collapse[0].show">
		<ul>
			<li  v-for="value in getToDo">
				<input type="checkbox" :key=value.id @click="moveToDone(value.id)">
				<div>{{value.content}}</div>
				<button @click="moveCancel(value.id)" :key="value.id">取消</button>
			</li>
		</ul>
	</div>
	</transition>

	<div class="event-tab" @click="changeCollapse(1, $event)">
		已完成
		<span :class="{'close-span': collapse[1].show}"> </span>
	</div>
	<div class="event-box" >
		<ul>
			<li v-for="value in getDone">
				<input type="checkbox" checked :key=value.id @click="moveToDo(value.id)">
				<div>{{value.content}}</div>
			</li>
		</ul>
	</div>
	<div class="event-tab" @click="changeCollapse(2, $event)">
		已取消
		<span :class="{'close-span': collapse[2].show}" ></span>
	</div>
	<div class="event-box"  v-show="collapse[2].show">
		<ul>
			<li v-for="value in getCancel">
				<div>{{value.content}}</div>
			</li>
		</ul>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			collapse: [
				{
					show: false,
				},
				{
					show: false,
				},
				{
					show: false,
				}
			]
		}
	},
	methods: {
		changeCollapse(num, event) {
			this.collapse[num].show = !(this.collapse[num].show);
		},
		moveToDone(id) {
			this.$store.dispatch('eventDone', id);
		},
		moveToDo(id) {
			this.$store.dispatch('eventToDo', id);
		},
		moveCancel(id) {
			this.$store.dispatch('moveCancel', id);
		}
	},
	computed: {
		getToDo() {
			return this.$store.getters.getToDo;
		},
		getDone() {
			return this.$store.getters.getDone;
		},
		getCancel() {
			return this.$store.getters.getCancel;
		}
	}
}
</script>
<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.event-tab {
	position: relative;
	width: 100%;
	height: 40px;
	max-width: 800px;
	font-size: 20px;
	line-height: 40px;
	color: #fff;
	background: #00b0f0;
	cursor: pointer;
}
.event-tab span {
	position: absolute;
	right: 25px;
	top: 10px;
	display: inline-block;
	width: 12px;
	height: 12px;
	border-top: 3px solid #fff;
	border-right: 3px solid #fff;
	transform: rotate(45deg);
	transition: all .3s;
	
}
.event-tab span.close-span {
	transform: rotate(135deg);
	transition: all .3s;
}
.event-box {
	position: relative;
}
.event-box li {
	position: relative;
	border-left: 1px solid #E1E0E0;
	border-bottom: 1px solid #E1E0E0;
	border-right: 1px solid #E1E0E0;
	padding: 10px 74px 10px 40px;
	color: #373e40;
}
.event-box li div {
	padding-right: 10px;
}
.event-box input {
	position: absolute;
	top: 13px;
	left: 8px;
	width: 20px;
	height: 20px;
	background: #fff;
}
.event-box button {
	position: absolute;
	top: 6px;
	right: 20px;
	border: 1px solid #ccc;
	border-radius: 3px;
	width: 45px;
	height: 30px;
	color: #A19D9D;
	background: #fff;
	cursor: pointer;
}
.event-box button:hover {
	border: 1px solid #00b0f0;
	color: #00b0f0;
}

</style>