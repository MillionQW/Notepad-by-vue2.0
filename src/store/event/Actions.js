export default {
	//{commit}是对第一个参数（默认是context）进行结构，就不需要用context.commit调用commit
	addEvent: ({commit}, param) => commit('ADDEVENT', param),
	eventDone: ({commit}, id) => commit('EVENTDONE', id),
	eventToDo: ({commit}, id) => commit('EVENTTODO', id),
	moveCancel: ({commit}, id) => commit('MOVECANCEL', id),
	editData: ({commit}, info) => commit('EDITDATA', info),
	clearData: ({commit}) => commit('CLEARDATA')
}