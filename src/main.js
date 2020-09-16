import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// 移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这是为了检查用户是否在做双击。为了能够立即响应用户的点击事件，才有了FastClick。
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 图片懒加载
Vue.use(VueLazyLoad,{
  loading:require('common/image/loading.jpg')
})

import './common/stylus/index.styl'
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
