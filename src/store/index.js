import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import event from './event'

//这就是store的index.js要做的全部，实例化一个store对象，在modules属性写入要导入的模块
export default new Vuex.Store({
	modules: {
		event
	}
})

