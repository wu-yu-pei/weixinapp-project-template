import Vue from 'vue'
import App from './App'
import globalState from './mixins/globalState.js'
import globalUtils from './plugins/globalUitls.js'
import serviceApi from './plugins/serviceApi.js'
import store from './store/index.js'
import uView from '@/uni_modules/uview-ui'

// 混入
Vue.mixin(globalState)

// 插件 uView
Vue.use(uView)
// 插件 工具函数到全局
Vue.use(globalUtils)
// 插件 挂在serverApi到全局
Vue.use(serviceApi)


// 配置信息
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
})

require('./service/request')(app)
app.$mount()
