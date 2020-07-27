import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import 'assets/css/normalize.css'
import 'assets/icon/iconfont.css'
import VueLazyLoad from 'vue-lazyload'
import { Lazyload , Toast } from 'vant';
import $http from './network/request'
import 'babel-polyfill';
import FastClick from 'fastclick';
import storage from 'good-storage'


Vue.config.debug = true;
// ---------------------------------------------------------------
// 图片懒加载
Vue.use(Lazyload);
//注册后可以为组件添加懒加载↓
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/cat.jpg')
})

Vue.use(Toast);
Vue.prototype.$message = Toast;
Vue.prototype.$storage = storage;
//移动端300ms延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

// ---------------------------------------------------------------
//请求拦截器
$http.interceptors.request.use(function(config){
  // 这里不能用this.$stroe调用！！ 深坑！ (因为当前是js文件)
  store.state.isLoad = true; //在请求发出之后显示load
  return config
})
//响应拦截器
$http.interceptors.response.use(function(config){
  store.state.isLoad = false;//在这里对返回的数据进行处理
  return config
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
