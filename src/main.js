// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import QRCode  from 'qrcodejs2'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import store from './vuex/store'
import wx from 'weixin-js-sdk'
import md5 from 'js-md5';
import setSelectName from './assets/js/setSelectName.js'
// import PDFJS from 'pdfjs-dist'

import { Popup,Picker ,Actionsheet,InfiniteScroll ,Spinner ,DatetimePicker , Checklist , Radio , Cell  } from 'mint-ui';
Vue.use(ElementUI ,{ size: 'small' })
Vue.prototype.wx = wx




Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Spinner.name, Spinner);
Vue.component(Radio.name, Radio);
Vue.component(Checklist.name, Checklist);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Cell.name, Cell);
Vue.use(InfiniteScroll);
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.qs = qs
Vue.prototype.QRCode = QRCode
Vue.prototype.setSelectName = setSelectName
// Vue.prototype.PDFJS = PDFJS 
router.beforeEach((to, from, next) => {
  // 检测路由配置中是否有requiresAuth这个meta属性
  // console.log(to.matched.some(record => record.meta.requiresAuth),"{{{{{{{{{{{{{{")
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断是否已登录
    if (store.getters.isLoggedIn) {
      // alert(to.meta.title)
      if (to.meta.title) {
        document.title = to.meta.title
      }
      next();      
      return;
    }    
    // 未登录则跳转到登录界面
    next('/loginIn'); 
  } else {
    next();  
  }
})
router.afterEach(route => {
  window.scroll(0, 0);
});

axios.interceptors.request.use(
config => {
  // console.log(config,"config")
  if (config.method === 'post') {
    config.headers.common['Authorization'] = localStorage.getItem('token')
    // config.headers['X-CSRF-TOKEN'] = localStorage.getItem('token') // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
},
error => {
  // router.push({ path: '/' })
  // console.log(error,"config") // for debug
  // Promise.reject(error)
}
)
axios.interceptors.response.use(
  response => {
    if (response.method === 'post') {
    response.headers.common['Authorization'] = localStorage.getItem('token')
    // config.headers['X-CSRF-TOKEN'] = localStorage.getItem('token') // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
    // console.log(response,"response main.js")
    return response;
  },
  error => {
    // console.log(error, "error main.js",store)
    if (error.response) {
      switch (error.response.status){
        case 401: 
        //跳转登录
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization'];
        store.commit('logout')
        router.push({ path: '/loginIn' })
        // store.dispatch('LogOut').then(() => {
        // //跳转到登录页面  
        //   // next('/login'); 
        // })
        // store.dispatch('LogOut');
        break
      }
    }
    Promise.reject(error)
  }
);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
