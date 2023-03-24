const baseURL = 'https://zqb.un-it.cn' + '/api'
module.exports = (vm) => {
    uni.$u.http.setConfig((config) => {
        config.baseURL = baseURL
        return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => {
		// 携带token
		config.header.token = vm.$store.state.token
		
		if (config.method === 'POST') {
			config.header['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
		}
	    return config 
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		const data = response.data
		return data.data === undefined ? {} : data.data
	}, (response) => {		
		return Promise.reject(response)
	})
}