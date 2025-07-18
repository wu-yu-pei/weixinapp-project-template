export default {
	getPhone: data => uni.$u.http.post('/wechat/get-phone', data),
	login: data => uni.$u.http.post('/wechat/login', data),
	getCategory: data => uni.$u.http.get('/categories/list', { params: data }),
	getDetail: (id) => uni.$u.http.get(`/categories/${id}`),
	addIp: data => uni.$u.http.post('/add-ip', data),
	postSub: data => uni.$u.http.post('/sub', data)
}