import * as type from './mutations_types.js'

export default {
	//这里state是形参，可以随意命名，一开始作者的形参是states还觉得不明所以
	[type.ADDEVENT](state, obj) {
		state.count++;
		obj.id = state.count;
		state.event.unshift(obj);
	},
	[type.EVENTDONE](state, id) {
		for (let i = 0; i < state.event.length; i++) {
			if (state.event[i].id == id) {
				state.event[i].type = 2;
				var item = state.event.splice(i, 1);	//splice返回的是被删除的项目，是个数组
			}
		}
		state.event.unshift(item[0]);
	},
	[type.EVENTTODO](state, id) {
		for (let i = 0; i < state.event.length; i++) {
			if (state.event[i].id == id) {
				state.event[i].type = 1;
				var item = state.event.splice(i, 1);	//splice返回的是被删除的项目，是个数组
			}
		}
		state.event.unshift(item[0]);
	},
	[type.MOVECANCEL](state, id) {
		for (let i = 0; i < state.event.length; i++) {
			if (state.event[i].id == id) {
				state.event[i].type = 3;
				var item = state.event.splice(i, 1);	//splice返回的是被删除的项目，是个数组
			}
		}
		state.event.unshift(item[0]);
	},
	[type.EDITDATA](state, info) {
		for (let i = 0; i < state.event.length; i++) {
			if(state.event[i].id == info.id) {
				state.event[i].content = info.content;
			}
		}
	},
	[type.CLEARDATA](state) {
		state.event=[];
	}
}