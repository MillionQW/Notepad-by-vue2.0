export default {
	getEventList(state) {
		return state.event;
	},
	getToDo(state) {
		return state.event.filter(function(d) {
			if (d.type === 1) {
					return d;
			}
		});
	},
	getDone(state) {
		return state.event.filter(function(d) {
			if (d.type === 2) {
				return d;
			}
		})
	},
	getCancel(state) {
		return state.event.filter(function(d) {
			if(d.type === 3) {
				return d;
			}
		})
	}
}