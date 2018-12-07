// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import RestClient from './components/common/restclient'

import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/el.css';       // 浅绿色主题
import '../static/css/set-el-icon.css';
import i18n from './i18n/i18n'
import utils from './components/common/utils'
import apiConfig from './components/common/apiConfig'

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$RestClient = RestClient;
Vue.config.productionTip = false

// authentication and authorization
router.beforeEach((to, from, next) => {
  var lang_code = utils.url.getParameterInUrl(to.fullPath, apiConfig.lang_param)
  if (lang_code) {
    utils.cookie.set(apiConfig.lang_param, lang_code)
    // for ui i18n
    i18n.locale = lang_code.replace("-", "_")
  } else {
    lang_code = utils.cookie.get(apiConfig.lang_param)
  }

  // if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
  //     if (store.state.token) {  // 通过vuex state获取当前的token是否存在
  //         next();
  //     }
  //     else {
  //         next({
  //             path: '/login',
  //             query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //         })
  //     }
  // }
  // else {
  //     next();
  // }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})