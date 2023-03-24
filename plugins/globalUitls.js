const global_utils = {
	// 获取code
	async getCode() {
		const res =await wx.login()
		return res.code
	},
	// 弹窗提示
	toast(message='message') {
		uni.showToast({
			icon:'none',
			title:message
		})
	}
}

export default {
	install:function(Vue) {
		Vue.prototype.$global_utils = uni.$global_utils = global_utils 
	}
}
// 在组件中可以使用 this.$global_utils调用 其他地方 可以通过 uni.$global_utils调用 