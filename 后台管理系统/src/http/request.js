//对aixos二次封装
import Axios from 'axios'
//引入element ui的消息框
import { Message } from 'element-ui'
import router from '../router'
//引入环境地址
import env from './env'
import nProgress from 'nprogress'
const {
    baseURL
} = env.prod
//创建一个axios实例
const axios = Axios.create({
    baseURL,
    timeout: 5000
})
//设置请求拦截器
axios.interceptors.request.use(config => {
    nProgress.start()
    if (config.url !== '/login') {
        const token = sessionStorage.getItem('token')
        config.headers.Authorization = token
    }
    return config
}, error => {
    return Promise.reject(error)
})
//响应拦截器
axios.interceptors.response.use(res => {
    nProgress.done()
    // console.log('响应拦截器：', res)
    const {
        data: result,
        meta: {
            msg,
            status
        }
    } = res.data
    const successArr = [200, 201, 204]

    if (successArr.includes(status)) {
        if (res.config.url === '/login') {
            sessionStorage.setItem('token', result.token)
        }
        // Message({
        //     message: msg,
        //     type: 'success'
        // })
        return result
    }

    Message({
        message: msg,
        type: 'error'
    })
    if (msg === '无效token') {
        return router.push('/')
    }
    return Promise.reject(msg)

}, error => {
    return Promise.reject(error)
})

export default axios;