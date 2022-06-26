/**
 * @file
 * @description 对axios进行二次封装的请求文件
*/

import axios from "axios";
import {Message} from "element-ui"
import store from "store";

axios.defaults.timeout=process.env.VUE_APP_TIMEOUT;
axios.defaults.baseURL="/9yue";

//http://tian.tianguixing.com:4001/api/private/v1
//http://9yuecloud.com:9988/api/private/v1
//http://shiyansong.cn:8888/api/private/v1
//http://timemeetyou.com:8889/api/private/v1/

// 开发过程中超时时间可以无限等待，或者60秒

/** 
 * 请求拦截器
*/
axios.interceptors.request.use(config=>{
    // TODD添加验证头
    config.headers.Authorization=store.getters.token;
    return config;
},error=>Promise.reject(error));

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response=>{
    // TODD处理响应信息

    const{
       data,
       meta:{
         status,
         msg
       }
    }=response.data;
    if(status===200||status===201){
        return data;
    }
    Message.error(msg);
    return Promise.reject(msg);
},error=>{
    const errorMsg=error.toString();
    if(errorMsg.includes("Metwork Error")){
        return Message.error("请求失败，请检查您的网络是否正常");
    }
    if(errorMsg.includes("Timeout")){
        return Message.error("请求超时，请稍后再试");
    }
    const {status }=error.response;
    switch(status){
        case 404:
            Message.error("接口不存在");
            break;
        case 500:
            Message.error("接口服务器请求失败，请稍后再试");
            break;
        case 401:
            Message.error("身份校验失败，请重新登录");
            // TODD加上跳转
            break;
        default:
            Message.error("未知错误");
            break;
    }
    return Promise.reject(error);
})

/**
 * 导出
 */
export default axios;