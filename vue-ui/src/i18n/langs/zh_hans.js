import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const zh_hans = {
    message: {
        'loginFailed': '登陆失败',
        'networkIssue': '网络请求失败', 
        'inputUsername': '请输入用户名',
        'inputPassword': '请输入密码',
        'serverInternalError': '服务器内部错误',
        'networkIssue': '网络请求失败',
        'loadFailed': '加载失败',
        'doLogin': '还未登陆，请先登陆',
        'reLogin': '登陆已超时，请重新登陆',
    },
    page: {
        'noPrivilegeDesc': '啊哦~ 你没有权限访问该页面哦',
        'notFoundDesc': '啊哦~ 你所访问的页面不存在',
        'backendManagementSystemTitle': '后台管理系统',
        'title': "后台管理系统",
        'homeTitle': '首页',
        'loginTitle': '登陆',
        'permissionDenyTitle': '没有权限',
        'notFoundTitle': '页面不存在',
        'userAdminTitle': '用户管理',
        'roleAdminTitle': '角色管理',
    },
    label: {
        'goHome': '返回首页',
        'goBack': '返回上一页',
        'loginButton': '登陆',
    },
    placeholder: {
        'username': '用户名',
        'password': '密码',
    },
    ...zhLocale
}

export default zh_hans
