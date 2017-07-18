import actions from './Actions.js'
import mutations from './Mutations.js'
import getters from './Getters.js'
import * as func from '../func.js'

//这就是模块的index.js做的，将分散的actions,mutations,getters引入到一起
const state = func.local.get() || {
	count: 0,
	event: []
}
export default {
	state,
	actions,
	mutations,
	getters
}