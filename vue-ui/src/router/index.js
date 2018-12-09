import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../i18n/i18n'
import permission from '../components/common/permisson'
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
      meta: {
        title: i18n.t("page.homeTitle"),
        requiredRoles: 'test,admin'
      },
    },
    {
      path: '/userAdmin',
      name: 'UserAdmin',
      component: HelloWorld,
      meta: {
        title: i18n.t("page.userAdminTitle"),
        permissionCheck: function(user) {
          return permission.isAdminUser(user)
        }
      },
    },
    {
      path: '/roleAdmin',
      name: 'RoleAdmin',
      component: HelloWorld,
      meta: {
        title: i18n.t("page.roleAdminTitle"),
        permissionCheck: function(user) {
          return permission.isSuperUser(user)
        }
      },
    },   
    {
      path: '/403',
      name: 'Page_403',
      component: Page_403,
      meta: {
        title: i18n.t("page.permissionDenyTitle")
      }      
    },
    {
      path: '/404',
      name: 'Page_404',
      component: Page_404,
      meta: {
        title: i18n.t("page.notFoundTitle")
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        // 添加该字段，表示进入这个路由是不需要登录的
         notRequireAuth: true,  
         title: i18n.t("page.loginTitle")
      },  
      // component:  resolve => require(['../components/common/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
