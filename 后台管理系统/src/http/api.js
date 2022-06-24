import request from './request'
export function LoginApi(data) {
	return request({
		url: '/login',
		method: 'POST',
		data
	})
}
export function getMenusApi() { //左侧菜单栏
	return request({
		url: '/menus',
		method: 'GET'
	})
}

export function getUserListApi(params) { //总数据
	return request({
		url: '/users',
		method: 'GET',
		params
	})
}

export function getUserdelet(id) { //单个删除
	return request({
		url: '/users/' + id,
		method: 'DELETE',
	})
}

export function getUseradd(data) { //添加
	return request({
		url: '/users',
		method: 'POST',
		data
	})
}

export function getbg(data) { //编辑
	return request({
		url: '/users/' + data.id,
		method: 'PUT',
		data
	})
}

export function getstate(data) {
	return request({
		url: '/users/' + data.uid + '/state/' + data.type,
		method: 'PUT',
		data
	})
}

export function getrid() {
	return request({
		url: '/roles',
		method: 'GET'
	})
}



export function jsqd(id, rid) {
	return request({
		url: `users/${id}/role`,
		method: 'PUT',
		data: {
			rid
		}
	})
}

export function jueseliebiao(data) {
	return request({
		url: '/roles',
		method: 'GET',
		data
	})
}

//添加角色
export function addjuese(data) {
	return request({
		url: '/roles',
		method: 'POST',
		data
	})
}
//删除角色
export function removejuese(id) {
	return request({
		url: '/roles/' + id,
		method: 'DELETE',
	})
}

// 角色编辑的提交
export function gbaddjuese(data) {
	return request({
		url: '/roles/' + data.id,
		method: 'PUT',
		data
	})
}
// 编辑id的获取
export function gbidjuese(data) {
	return request({
		url: '/roles/' + data.id,
		method: 'PUT',
		data
	})
}

// 获取所有权限列表
export function getqxlist(type = 'list') {
	return request({
		url: `/rights/${type}`,
		method: 'GET',
	})
}
// 获取所有分配权限列表
export function getqxlb(type = 'tree') {
	return request({
		url: `/rights/${type}`,
		method: 'GET',
	})
}

// 角色授权
export function getsqjs(roleId, rids) {
	return request({
		url: `roles/${roleId}/rights`,
		method: 'POST',
		data: {
			rids
		}
	})
}

//删除角色权限
export function qxremove(roleId, rightId) {
	return request({
		url: `roles/${roleId}/rights/${rightId}`,
		method: 'DELETE',
	})
}


//获取订单数据列表
export function getdd(params) {
	return request({
		url: '/orders',
		method: 'GET',
		params
	})
}

//获取商品列表数据
export function getsplb(params) {
	return request({
		url: '/goods',
		method: 'GET',
		params
	})
}

//商品分类接口
export function getspfl(type = 3) {
	return request({
		url: 'categories',
		method: 'GET',
		params: {
			type
		}
	})
}

// 获取商品动态或者静态参数列表接口
export function getMoveQuietList(id, sel) {
	return request({
		url: '/categories/' + id + '/attributes/',
		method: 'GET',
		params: {
			sel
		}
	})
}

// 添加静态参数
export function jingtaiParams(id, sel = "only") {
	return request({
		url: '/categories/' + id + '/attributes/',
		method: 'GET',
		params: {
			sel
		}
	})
}



// // 查看物流信息
// export function wuliuList() {
// 	return request({
// 		url: "/kuaidi/1106975712662",
// 		method: "GET"
// 	})
// }


// 订单管理列表
export function getOrdersList(params) {
	return request({
		url: "/orders",
		method: "GET",
		params
	})
}

// 商品分类参数
export function addPrarams(cateId, data) {
	return request({
		url: `categories/${cateId}/attributes`,
		method: "POST",
		data
	})
}



// 商品编辑提交
export function getspbgtj(data) {
	return request({
		url: '/goods/' + data.id,
		method: 'PUT',
		data
	})
}

//删除商品
export function removesp(id) {
	return request({
		url: '/goods/' + id,
		method: 'DELETE',
	})
}

//添加分类
export function addGoodsApi(data) {
	return request({
		url: 'categories',
		method: 'POST',
		data
	})
}

//商品分类接口
export function getflList(params) {
	return request({
		url: 'categories',
		method: 'GET',
		params
	})
}
//删除分类
export function removeflList(id) {
	return request({
		url: 'categories/' + id,
		method: 'DELETE',
	})
}

// 编辑分类
export function editFenlei(cateId, attrId, data) {
	return request({
		url: `categories/${cateId}/attributes/${attrId}`,
		method: "PUT",
		data
	})
}

// 删除分类
export function deleParams(cateId, attrid) {
	return request({
		url: `categories/${cateId}/attributes/${attrid}`,
		method: "DELETE"
	})
}

// 统计折线图
export function summaryGraph() {
	return request({
		url: 'reports/type/1',
		method: 'GET',
	})
}
