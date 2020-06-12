import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'    

/*
两种方法引入组件
一、先引入home组件，再在routes里面注册
二、about是在component里面使用箭头函数引入about组件
区别：第一个是直接引入，不管有没有访问都把组件引进来了
     第二个是只有你访问的的时候才加载组件

     好处：项目比较大，页面比较多，vue是单页面应用，一次性加载这么多内容，
          加载会很慢，体验不好，所以在项目中使用第二种方法比较好


*/
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/get',
    name: 'get',
    component: () => import('../views/get.vue')
  },
  {
    path: '/concurrence',
    name: 'concurrence',
    component: () => import('../views/concurrence.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
