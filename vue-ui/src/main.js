// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import { axios, restclient } from './components/common/restclient'

import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/el.css';       // 浅绿色主题
import '../static/css/set-el-icon.css';
import i18n from './i18n/i18n'
import utils from './components/common/utils'
import apiConfig from './components/common/apiConfig'
import api from './components/common/api'
import store from './store'
import permission from './components/common/permisson'


Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
Vue.prototype.$RestClient = restclient;
Vue.prototype.$API = api;
Vue.config.productionTip = false

// update the user cached in client
api.authentication.checkme()

// authentication and authorization
router.beforeEach((to, from, next) => {
  var lang_code = utils.url.getParameterInUrl(to.fullPath, apiConfig.lang_param)
  if (lang_code) {
    // change lang code by the lang parameter
    store.dispatch("changeLangCode", lang_code)
    // for ui i18n
    i18n.locale = lang_code.replace("-", "_")
  }

  // 设置title
  if (to.meta.title) {
    document.title = [i18n.t("page.title"), to.meta.title].join(" - ")
  } else {
    document.title = i18n.t("page.title")
  }

  if (to.meta && to.meta.notRequireAuth) {  // 判断该路由是否不需要登录权限
    next()
  } else {
    if (store.state.loginUser) {  // 是否已经登陆
      // 权限判断
      var hasPermission = true
      if (permission.isSuperUser(store.state.loginUser)) {
        hasPermission = true
      } else if (to.meta.permissionCheck &&  typeof(eval(to.meta.permissionCheck)) == "function") {
        hasPermission = to.meta.permissionCheck(store.state.loginUser)
      } else if (to.meta.requiredRoles) {
        hasPermission = permission.hasRole(store.state.loginUser, to.meta.requiredRoles)
      } else if (to.meta.requiredPermissions) {
        hasPermission = permission.hasPermission(store.state.loginUser, to.meta.requiredPermissions)
      }
      if (hasPermission) {
        next()
      } else {
        next({
          path: '/403',
        })
      }
    } else {
      next({
          path: '/login',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})