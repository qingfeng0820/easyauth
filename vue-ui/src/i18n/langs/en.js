import enLocale from 'element-ui/lib/locale/lang/en'

const en = {
    message: {
        'loginFailed': 'Login failed',
        'networkIssue': 'Network issue', 
        'inputUsername': 'Please input your username',
        'inputPassword': 'Please input your password',
        'serverInternalError': 'Server internal error',
        'networkIssue': "Network issue",
        'loadFailed': 'Load failed',
        'doLogin': 'You are not logined, please login',
        'reLogin': 'Your login session expired, please re-login',
    },
    page: {
        'noPrivilegeDesc': 'Opps~ you are not authorised.',
        'notFoundDesc': 'Opps~ the page not existed.',
        'backendManagementSystemTitle': 'Management System',
        'title': "Manage System",
        'homeTitle': 'Home',
        'loginTitle': 'Login',
        'permissionDenyTitle': 'Permission Deny',
        'notFoundTitle': 'Not Found',
        'userAdminTitle': 'Users management',
        'roleAdminTitle': 'Roles management'
    },
    label: {
        'goHome': 'Go Home',
        'goBack': 'Go Back',
        'loginButton': 'Login',
    },
    placeholder: {
        'username': 'username',
        'password': 'password',
    },
    ...enLocale
}

export default en
