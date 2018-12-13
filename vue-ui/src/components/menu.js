import i18n from '../i18n/i18n'
import permission from './common/permisson'
import Dashboard from '@/components/page/Dashboard'
import HelloWorld from '@/components/HelloWorld'

var menu = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            component: Dashboard,
            icon: 'el-icon-lx-home',
            meta: { 
                getTitle: function() {
                    return i18n.t("page.homeTitle")
                },
            },
        },
        {
            name: 'UserAdmin',
            path: '/userAdmin',
            component: HelloWorld,
            icon: 'el-icon-lx-people',
            meta: { 
                getTitle:  function() {
                    return i18n.t("page.userAdminTitle")
                },
                permissionCheck: function(user) {
                    return permission.isAdminUser(user)
                },
            },
        },
        {
            name: 'RoleAdmin',
            path: '/roleAdmin',
            component: HelloWorld,
            icon: 'el-icon-lx-group',
            meta: { 
                    getTitle: function() {
                    return i18n.t("page.roleAdminTitle")
                    },
                    permissionCheck: function(user) {
                    return permission.isSuperUser(user)
                }
            },
        },
        {
            name: "table",
            icon: 'el-icon-lx-cascades',
            meta: {
                getTitle: function() {
                    return '基础表格'
                },
            },
        },
        {
            name: 'tabs',
            icon: 'el-icon-lx-copy',
            meta: {
                getTitle: function() {
                    return 'tab选项卡'
                },
            },
        },
        {
            name: '3',
            icon: 'el-icon-lx-calendar',
            meta: {
                getTitle:  function() {
                    return '表单相关'
                },
            },
            subs: [
                {
                    name: 'form',
                    meta: {
                        getTitle:  function() {
                            return '基本表单'
                        },
                    },
                },
                {
                    name: '3-2',
                    meta: {
                        getTitle:  function() {
                            return '三级菜单'
                        },
                    },
                    subs: [
                        {
                            name: 'editor',
                            path: '/editor',
                            component: HelloWorld,
                            meta: {
                                getTitle:  function() {
                                    return '富文本编辑器'
                                },
                            },
                        },
                        {
                            name: 'markdown',
                            meta: {
                                getTitle:  function() {
                                    return 'markdown编辑器'
                                },
                            },
                        },
                    ]
                },
                {
                    name: 'upload',
                    meta: {
                        getTitle:  function() {
                            return '文件上传'
                        },
                    },
                }
            ]
        },
        {
            name: 'icon',
            icon: 'el-icon-lx-emoji',
            meta: {
                getTitle:  function() {
                    return '自定义图标'
                },
            },
        },
        {
            name: 'charts',
            icon: 'el-icon-lx-favor',
            meta: {
                getTitle:  function() {
                    return 'schart图表'
                },
            },
        },
        {
            name: 'drag',
            icon: 'el-icon-rank',
            meta: {
                getTitle:  function() {
                    return '拖拽列表'
                },
            },
        },
        {
            name: '6',
            icon: 'el-icon-lx-warn',
            meta: {
                getTitle:  function() {
                    return '错误处理'
                },
            },
            subs: [
                {
                    name: 'permission',
                    path: '/403',
                    meta: {
                        getTitle:  function() {
                            return '权限测试'
                        },
                    },
                },
                {
                    name: '404',
                    path: '/404',
                    meta: {
                        getTitle:  function() {
                            return '404页面'
                        },
                    },
                }
            ]
        }
]

export default menu

