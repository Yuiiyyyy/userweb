import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index'

Vue.use(VueRouter)
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }


const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login')
  },
  {
    path: '/reg',
    name: 'register',
    component: () => import('../pages/Register')
  },
  {
    // 首页
    path: '/index',
    name: 'intro',
    component: () => import('../pages/Intro'),
    children:[
      {
        // 平台介绍
        path:'/index/platform',
        name:'platform',
        component: () => import('../pages/index/Platform')
      },
      {
        // 商务合作
        path:'/index/business',
        name:'bussiness',
        component: () => import('../pages/index/Business')
      },
      {
        // 专题展示
        path:'/index/dissertation',
        name:'dissertation',
        component: () => import('../pages/index/Dissertation')
      },
      {
        // 培训活动
        path:'/index/training',
        name:'training',
        component: () => import('../pages/index/Training')
      },
      // 列表页面
      {
        path:'/index/morelist',
        name:'morelist',
        component: () => import('../pages/index/MoreList')
      },
      // 详情页
      {
        path:'/index/detail',
        name:'detail',
        component: () => import('../pages/index/Detail')
      }
    ]
  },
  // 管理页
  {
    path: '/manager',
    name: 'manager',
    component: () => import('../pages/Manager'),
    children:[
      {
        // 项目录入
        path:'/manager/typeinproject',
        name:'typeinproject',
        component: () => import('../pages/manager/TypeinProject')
      },
      {
        // 需求录入
        path:'/manager/typeindemand',
        name:'typeindemand',
        component: () => import('../pages/manager/TypeinDemand')
      },
      {
        // 需求管理
        path:'/manager/managedemand',
        name:'managedemand',
        component: () => import('../pages/manager/ManageDemand')
      },
      {
        // 账号管理
        path:'/manager/accountinfo',
        name:'accountinfo',
        component: () => import('../pages/manager/AccountInfo')
      },
      {
        // 密码管理
        path:'/manager/managepassword',
        name:'managepassword',
        component: () => import('../pages/manager/ManagePassword')
      },
      {
        // 收藏
        path:'/manager/collection',
        name:'collection',
        component: () => import('../pages/manager/Collection')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
