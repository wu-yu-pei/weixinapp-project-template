import Vuex from 'vuex'

// 创建一个新的 store 实例
export default {
	namespaced:true,
	state() {
		return {
			name:'index'
		}
	},
	getters:{
		
	},
	mutations:{
		
	},
	actions:{
		add() {
			console.log('++');
		}
	}
}
