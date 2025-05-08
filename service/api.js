export default {
	getPhone: data => uni.$u.http.post('/wechat/get-phone', data),
	login: data => uni.$u.http.post('/wechat/login', data),
	getCategory: data => uni.$u.http.get('/categories/list', { params: data }),
}