import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Http from './service/http'  //引入http

Vue.config.productionTip = false
Vue.prototype.$Http = Http   //把http挂载到vue实例上
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
