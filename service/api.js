export default {
	getWxKey:params => uni.$u.http.get('mapp/wxLogin', {params}, {noNeedLogin:1})
}