import { moduleInfo } from 'common/src/output'

export default {
    path: '/account',
    name: '账户中心',
    redirect: '/account/user',
    meta: {
        hideNav: true
    },
    component: moduleInfo.layout['root-layout'],
    children: [
        {
            path: 'user',
            name: '账号信息',
            meta: {
                iconClass: 'el-icon-s-custom'
            },
            component: () => {
                return import('../views/user/index')
            }
        },
        {
            path: 'profile',
            name: '个人资料',
            meta: {
                iconClass: 'el-icon-info'
            },
            component: () => {
                return import('../views/profile/index')
            }
        },
        {
            path: 'passwd',
            name: '修改密码',
            meta: {
                iconClass: 'el-icon-info'
            },
            component: () => {
                return import('../views/passwd/index')
            }
        },
        {
            path: 'open',
            name: '绑定账号',
            meta: {
                iconClass: 'el-icon-share'
            },
            component: () => {
                return import('../views/open/index')
            }
        },
        {
            path: 'platform',
            name: '应用管理',
            meta: {
                iconClass: 'el-icon-position'
            },
            component: () => {
                return import('../views/platform/index')
            }
        }
    ]
}
