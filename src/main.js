import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import 'assets/css/normalize.css'
import VueLazyLoad from 'vue-lazyload'
import { Lazyload } from 'vant';

Vue.use(Lazyload);
//注册后可以为组件添加懒加载↓
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/cat.jpg')
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
