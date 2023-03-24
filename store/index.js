import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import indexStore from './modules/index.js'

// 创建一个新的 store 实例
const store = new Vuex.Store({
	// 各个模块
	modules:{
		indexStore
	},
	// 全局state
    state () {
      return {
        userInfo:uni.getStorageSync('userInfo') || {},
	    token:uni.getStorageSync('token') || ''
      }
    },
    getters:{
	  
    },
    mutations: {
    
    },
    actions:{
	  
    }
})

export default store