import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page_403 from '@/components/common/403'
import Page_404 from '@/components/common/404'
import Login from '@/components/common/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/403',
      name: 'Page_403',
      component: Page_403,      
    },
    {
      path: '/404',
      name: 'Page_404',
      component: Page_404
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        // 添加该字段，表示进入这个路由是不需要登录的
         notRequireAuth: true,  
      },  
      // component:  resolve => require(['../components/common/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
