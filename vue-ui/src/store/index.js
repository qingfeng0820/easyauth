import vue from 'vue'
import  vuex from 'vuex'
import utils from '../components/common/utils'
import apiConfig from '../components/common/apiConfig'


vue.use(vuex)

const __getStoredObject = function(key) {
    var storedObj = localStorage.getItem("loginUser")
    if (storedObj) {
        return JSON.parse(storedObj)
    }
    return null
}

const state = {
    loginUser: __getStoredObject("loginUser"),
    // langCode: utils.cookie.get(apiConfig.lang_param) || apiConfig.default_lang_code,
    langCode: localStorage.getItem(apiConfig.lang_param) || apiConfig.default_lang_code,
}

const mutations = {
    changeLangCode(state, langCode) {
        // utils.cookie.set(apiConfig.lang_param, langCode)
        localStorage.setItem(apiConfig.lang_param, langCode)
        state.langCode=langCode;
    },
    saveLoginUser(state, loginUser) {
        localStorage.setItem("loginUser", JSON.stringify(loginUser))
        state.loginUser = loginUser
    },
    clearLoginUser(state) {
        state.loginUser = null
        localStorage.removeItem("loginUser")
    },
}

const actions = {
    changeLangCode:({commit},langCode)=>commit('changeLangCode', langCode)
}

const store = new vuex.Store ({
    state: state,
    actions: actions,
    mutations: mutations
})

export default store