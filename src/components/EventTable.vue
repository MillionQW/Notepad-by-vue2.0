<template>
<section class="eventTable" :class="{'event-all-show': isShow}">
	<div class="table-box">
		<div class="edit-input" :class="{'edit-input-show':is_edit}">
			<input type="text" v-model="info.content" ref="content" @keyup.enter="editData">
			<button @click="editData">确定</button>
		</div>
		
		<div class="screen-box">
			<div class="div-select"  :class="{'active': active}" >
				<div class="div-value" @click="active = !active">{{getTypeName}}</div>
				<div class="div-select-body">
					<div class="div-option" @click="doSelect(0)">筛选类型</div>
					<div class="div-option" @click="doSelect(1)">未完成</div>
					<div class="div-option" @click="doSelect(2)">已完成</div>
					<div class="div-option" @click="doSelect(3)">已取消</div>
				</div>
			</div>
			<input type="text" class="search" v-model="screen_title"  placeholder="筛选关键词">
		</div>

		<table class="event-table">
			<thead>
				<tr>
					<th>#</th>
					<th>所有事项</th>
					<th>类型</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(value, index) in notepad">
					<td align="center">{{index + 1}}</td>
					<td align="center">{{value.content}}</td>
					<td align="center">{{getType(value.type)}}</td>
					<td align="center">
						<button class="edit_btn" @click="showInput(index)">编辑</button>
						<button class="del_btn" @click="showDialog(index, value.id)">删除</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</section>
</template>
<script>
export default {
	data() {
		return {
			active: false,
			is_edit: false,
			screen_type: 0,
			screen_title: '',
			info: {
				content: '',
				id: 0,
				index: 0
			}
		}
	},
	props: ['isShow'],
	methods: {
		showInput() {
			this.is_edit = true;
		},
		doSelect(type) {
			this.screen_type = type;
			this.active = false;
		},
		getType(type) {
			let str = '';
			switch (type) {
				case 1: 
					str = "未完成";
					break;
				case 2:
					str = "已完成";
					break;
				case 3:
					str = "已取消";
					break;
			}
			return str;
		},
		doSelect(index) {
			this.screen_type = index;
			this.active = !this.active;
		},
		editData() {
			this.info.content = this.info.content.trim();
			if (this.info.content) {
				this.$store.dispatch('editData', this.info)
				this.is_edit = false;
			}
			
		},
		showInput(index) {
			this.is_edit = true;
			this.info.index = index;
			this.info.content = this.notepad[index].content;
			this.info.id = this.notepad[index].id;
			this.$refs.content.focus();
		}

	},
	computed: {
		notepad() {
			let self = this;
			return this.$store.getters.getEventList.filter(
					function(d) {
						if (self.screen_type != 0 && self.screen_title == '') {
							if (d.type === self.screen_type) {
								return d;
							}
						} else if (self.screen_type != 0 && self.screen_title != '') {
							if (self.screen_type == d.type && d.contents.indexOf(self.screen_title) != -1) {
								return d;
							}
						} else if (self.screen_type === 0 && self.screen_title != '') {
							if (d.content.indexOf(self.screen_title) != -1) {
								return d;
							}
						} else {
							return d;
						} 
					}
				)
		},
		getTypeName() {
			return this.getType(this.screen_type) || "筛选类型";
		}
	}
}
</script>
<style>
.eventTable {
	position: absolute;
	left: 0;
	top: 70px;
	right: 0;
	bottom: 0;
	padding: 0 10px;
	transform: translateX(-100%);
	transition: all .3s;
}
.event-all-show {
	transform: translateX(0);
}
.eventTable .table-box {
	width: 100%;
	max-width: 1000px;
	margin: 20px auto;
}
.eventTable .edit-input {
	position: fixed;
	top: 70px;
	width: 100%;
	max-width: 1000px;
	height: 60px;
	margin: auto;
	padding: 10px 100px 10px 10px;
	background: #eee;
	border: 1px solid #eee;
	border-radius: 4px;
	box-sizing: border-box;
	z-index: 11;
	transform: translateY(-500%);
	transition: all .3s;
}
.edit-input.edit-input-show {
	transform: translateY(0);
}
.edit-input input {
	float: left;
	width: 100%;
	height: 40px;
	padding: 5px 10px;

	box-sizing: border-box;
	border: 1px solid #ddd;
}
.edit-input button {
	position: absolute;
	right: 10px;
	width: 80px;
	height: 40px;
	border: 0;
	border-radius: 4px;
	color: #fff;
	font-style: 20px;
	background: #00b0f0;
	cursor: pointer;
}
.edit-input-show {
	transform: translateY(0);
}
.screen-box {
	position: relative;
	padding: 0 0 10px 95px;
	height: 35px;
}
.screen-box .div-select {
	position: absolute;
	left: 0;
	top: 0;
	width: 85px;
	height: 35px;
	padding: 0 10px;
	box-sizing: border-box;
	border:1px solid #eee;
	font-size:  12px;
	color: #999;
	cursor: pointer;
}
.div-value:after {
	content: '';
	position: absolute;
	right: 6px;
	top: 12px;
	width: 6px;
	height: 6px;
	border-right: 1px solid #999;
	border-bottom: 1px solid #999;
	transform: rotate(45deg);
}
.screen-box .div-select.active .div-select-body {
	height: 122px;
	border: 1px solid #eee;
	box-shadow: 0 0 1px #ddd;
}
.div-value {
	line-height: 35px;
}
.div-select-body {
	position: absolute;
	left: 0;
	top: 8px;
	width: 85px;
	height: 0;
	padding-left: 10px;
	line-height: 30px;
	box-sizing: border-box;
	overflow: hidden;
	z-index: 10;
	box-shadow: none;
	border-radius: 3px;
	background: #fff;
	transition: all .3s;
}
.search {
	width: 100%;
	height: 35px;
	
	padding: 5px 10px;
	line-height: 25px;
	box-sizing: border-box;
	border: 1px solid #eee;
	font-size: 12px;
	font-family: Arial, 'Microsoft YaHei';
	color: #999;
}
.event-table td,th {
	position: relative;
	height: 40px;
	min-width: 0;
	padding: 5px 10px;
	box-sizing: border-box;
	text-overflow: ellipsis;
	vertical-align: middle;
	border-right: 1px solid #eee;
	border-bottom: 1px solid #eee;
}
.event-table button {
	padding: 3px 7px;
	font-size: 12px;
	color: #fff;
	border: 0;
	margin: 0 3px 3px 0;
	cursor: pointer;
}
.event-table .edit_btn {
	background: #00b0f0;

}
.event-table .del_btn {
	background: #f57067;
}
.eventTable .event-box .edit-input {
	position: fixed;
	top: 0;
	width: 100%;
	max-width: 1000px;
	margin: auto;
	height: 60px;
	padding: 10px 100px 10px 10px;
	box-sizing: border-box;
	z-index: 10;
	transform: translateY(-260px);
	transition: transform .3s;
	background: #f3f3f3;
	border: 1px solid #eee;
}
.eventTable .table-box .event-table {
	width: 100%;
	padding: 0;
	border-left: 1px solid #eee;
	border-top: 1px solid #eee;
}
	
</style>
