import { get, put} from './index'
import { USERS } from './urls'

// 登陆
export const login = function (query = '') {
  return get(USERS + query)
    // return get(`${USERS}`);
}

// 退出
export const logout = function () {
  return get('/api/v1/logout')
}

// 获取近期登陆的用户
export const getLastestUser = function () {
  return get(`${USERS}?lastest=true`)
}

// 根据Id 更新用户
export const updateByUserId = function (id, user) {
  return put(USERS + '/' + id, user)
}

// 分页获取用户
export const getUsersByPage = function (query) {
  return get(USERS + query)
}

export const getUserById = function (id) {
  return get(`${USERS}?_id=${id}`)
}
