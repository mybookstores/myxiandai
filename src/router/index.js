import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/customer/:paperId',
    name: 'customer',
    component: () => import('../views/front/customer/Customer')
  },
  {
    path: '/customer/:paperId/complete',
    name: 'complete',
    component: () => import('../views/front/customer/afterSubmit/AfterSubmit'),
  },
  {
    path: '/front',
    name: 'Front',
    component: () => import('../views/front/Front'),
    children: [
      {
        path: 'home',
        name: 'FrontHome',
        component: () => import('../views/front/Home.vue')
      },
      {
        path: 'two',
        name: 'Two',
        component: () => import('../views/front/Two')
      },

      {
        path: '/editor',
        name: 'editor',
        component: () => import('../views/front/editor/Editor'),
        children: [
          {
            path: 'overview',
            name: 'overview',
            component: () => import('../views/front/editor/overview/Overview')
          },
          {
            path: 'create/:paperId',
            name: 'create',
            component: () => import('../views/front/editor/create/Create')
          },
          {
            path: 'monitor/:paperId',
            name: 'monitor',
            component: () => import('../views/front/editor/monitor/Monitor')
          },
          {
            path: 'paperlink/:paperId',
            name: 'paperlink',
            component: () => import('../views/front/editor/create/PaperLink')
          }
        ]
      },
      {
        path: 'file2',
        name: 'File2',
        component: () => import('../views/front/File2')
      },
      {
        path: 'im',
        name: 'Im',
        component: () => import('../views/front/Im')
      },

      {
        path: 'person',
        name: 'FrontPerson',
        component: () => import('../views/front/Person')
      },
      {
        path: 'password',
        name: 'FrontPassword',
        component: () => import('../views/front/Password')
      },
      {
        path: 'video',
        name: 'Video',
        component: () => import('../views/front/Video')
      },
      {
        path: 'videoDetail',
        name: 'VideoDetail',
        component: () => import('../views/front/VideoDetail')
      },
      {
        path: 'article',
        name: 'FrontArticle',
        component: () => import('../views/front/Article')
      },
      {
        path: 'articleDetail',
        name: 'ArticleDetail',
        component: () => import('../views/front/ArticleDetail')
      },
    ]
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 提供一个重置路由的方法
export const resetRouter = () => {
  router.matcher = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}

// 注意：刷新页面会导致页面路由重置
export const setRoutes = () => {
  const storeMenus = localStorage.getItem("menus");
  // console.log("adminnnnnnnnnnnnnnnnnnnnn")
  // console.log(localStorage.getItem("menus"))
  if (storeMenus) {

    // 获取当前的路由对象名称数组
    const currentRouteNames = router.getRoutes().map(v => v.name)
    if (!currentRouteNames.includes('Manage')) {
      // 拼装动态路由
      const manageRoute = { path: '/', name: 'Manage', component: () => import('../views/Manage.vue'), redirect: "/paperManage", children: [
          { path: 'person', name: '个人信息', component: () => import('../views/Person.vue')},
          { path: 'password', name: '修改密码', component: () => import('../views/Password.vue')}
        ] }
      const menus = JSON.parse(storeMenus)
      console.log(menus)
      
      menus.forEach(item => {
        if (item.path) {  // 当且仅当path不为空的时候才去设置路由
          let itemMenu = { path: item.path.replace("/", ""), name: item.name, component: () => import('../views/' + item.pagePath + '.vue')}
          manageRoute.children.push(itemMenu)
        } else if(item.children.length) {
          item.children.forEach(item => {
            if (item.path) {
              let itemMenu = { path: item.path.replace("/", ""), name: item.name, component: () => import('../views/' + item.pagePath + '.vue')}
              manageRoute.children.push(itemMenu)
            }
          })
        }
      })
      // 动态添加到现在的路由对象中去
      router.addRoute(manageRoute)
    }

  }
}

// 重置我就再set一次路由
setRoutes()


router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称
  store.commit("setPath")

  // 未找到路由的情况
  if (!to.matched.length) {
    const storeMenus = localStorage.getItem("menus")
    if (storeMenus) {
      next("/404")
    } else {
      // 跳回登录页面
      next("/login")
    }
  }
  // 其他的情况都放行
  next()

})

export default router
