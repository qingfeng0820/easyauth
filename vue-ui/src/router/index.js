import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../i18n/i18n'
import menu from '../components/menu'
import permission from '../components/common/permisson'
import HelloWorld from '@/components/HelloWorld'
import Page_403 from '@/components/common/403'
import Page_404 from '@/components/common/404'
import Login from '@/components/common/Login'
import Home from '@/components/common/Home'
import Dashboard from '@/components/page/Dashboard'

Vue.use(Router)

var __homePage = "/dashboard"
var __homePage_Set = false
const __getChildRoutersFromMenu = function(currentMenu, level=1) {
  var childRouters = []
  if (level <= 0 || level > 3) {
     return childRouters
  }
  currentMenu.forEach((item, i) => {
      if (item.subs) {
        if (level < 3) {
          childRouters = childRouters.concat(__getChildRoutersFromMenu(item.subs, level + 1))
        }
      } else {
          if (item.path && item.component) {
            if (item.path != '/403' && item.path != '/404' && item.path != '/') {
              var route = {name: item.name, path: item.path, component: item.component};
              if (item.meta) {
                  route.meta = item.meta
              }
              if (item.default && !__homePage_Set) {
                __homePage = item.path
                __homePage_Set = true
              }
              childRouters.push(route)
            }
          }
      }
  })
  return childRouters
}

const children = __getChildRoutersFromMenu(menu)

var routes = [
  {
    path: '/',
    redirect: __homePage
  },
  {
    path: '/',
    name: '__Home',
    component: Home,
    meta: { 
      getTitle: function() {
        return i18n.t("page.homeTitle") 
      }
    },
    children:[
      {
        path: '/403',
        name: '__Page_403',
        component: Page_403,
        meta: {
          getTitle: function() {
            return i18n.t("page.permissionDenyTitle")
          }
        }      
      },
      {
        path: '/404',
        name: '__Page_404',
        component: Page_404,
        meta: {
          getTitle: function() {
           return i18n.t("page.notFoundTitle")
          }
        }
      },
    ].concat(children)
  },
  {
    path: '/login',
    name: '__Login',
    component: Login,
    meta: {
      // 添加该字段，表示进入这个路由是不需要登录的
       notRequireAuth: true, 
       getTitle: function() {
          title: i18n.t("page.loginTitle")
       }
    },  
    // component:  resolve => require(['../components/common/Login.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/404'
  }
]


export default new Router({
  routes: routes
})
