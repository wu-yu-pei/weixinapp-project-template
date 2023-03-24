import api from '@/service/api.js'

export default {
	install:function(Vue) {
		Vue.prototype.$api = uni.$api = api
	}
}

// 在组件中可以使用 this.$api调用 其他地方 可以通过 uni.$api调用 