import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'normalize.css'
import './plugins/element.js'
import '@/assets/css.css/css.css'

//引入进度条样式
import 'nprogress/nprogress.css'


//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
// 全局的过滤器
Vue.filter('filter', function (n) {
  let result;
  switch (n * 1) {
    case 0:
      result = '一级';
      break;
    case 1:
      result = '二级';
      break;
    case 2:
      result = '三级';
      break;
    default:
      result = '没有要显示的级别';
      break;
  }
  return result
})
//过滤订单付款项
Vue.filter('paymentItem', function (n) {
  let result
  switch (n * 1) {
    case 0:
      result = '未付款';
      break;
    case 1:
      result = '已付款';
      break;
    // default:
    //   result = '已付款'
  }
  return result
})
//过滤订单下单时间
Vue.filter('time', function (val) {
  var time = new Date(val * 1000)
  var yaer = time.getFullYear()
  var moth = time.getMonth() + 1
  var day = time.getUTCDay()
  var hours = time.getUTCHours()
  var minus = time.getUTCMinutes()
  var seconds = time.getUTCSeconds()
  return `${yaer}年${moth}月${day}日  ${hours}:${minus}:${seconds}`
})

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {

  ak: 'aZy1QqTl8ysyIetjbSQy9cpEqjtaXuYt'

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')