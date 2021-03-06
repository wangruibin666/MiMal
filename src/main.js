//# sourceURL=dynamicScript.js
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import VueLazyLoad from 'vue-lazyload'
import store from './store/index'
import App from './App.vue'


//根据前端的跨域方式做调整,这里暂时为接口代理
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;


//接口错误拦截
axios.interceptors.response.use(function(response) {
  let res = response.data;
  let path = location.hash;
  if (res.status == 0) {
    return res.data;
  }else if (res.status == 10) {
    if(path != '#/index') {
      window.location.href = '/#/login';
    }
    return Promise.reject(res);
  }else{
    alert(res.msg);
    return Promise.reject(res);
  }
});
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
