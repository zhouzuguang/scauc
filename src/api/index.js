import { getCookie } from './cookie'
// import { Message } from 'element-ui'
const csrf = getCookie('csrfToken')

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data || ''
}, function (error) {
  Message({
    message: error.response.status,
    type: 'error',
    center: true,
    duration: 1000
  })
  // 对响应错误做点什么
  return Promise.reject(error)
})

export function get (url) {
  return axios.get(url)
}

export function post (url, data) {
  return axios.post(`${url}?_csrf=${csrf}`, data)
}

export function put (url, data) {
  return axios.put(`${url}?_csrf=${csrf}`, data)
}

export function del (url) {
  return axios.delete(`${url}?_csrf=${csrf}`)
}

// 文件上传
export const fileUpload = function (data) {
  return post('/api/v1/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
