import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: "/",
      component: resolve => require(["../pages/home/index"], resolve),
      name: 'index',
      meta: {
        title:'幸福1+1',
        requiresAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/loginIn",
      component: resolve => require(["../pages/login/loginIn"], resolve),
      name: 'loginIn',
      meta: {
        requiresAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    // {
    //   path: "/login",
    //   component: resolve => require(["../pages/login/login"], resolve),
    //   name: 'login',
    //   meta: {
    //     requiresAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
    //   } 
    // },    
    {
      path: "/home",
      component: resolve => require(["../pages/home/index"], resolve),
      name: "home",
      meta: {
        title:'幸福1+1',
        requiresAuth: true
      }     
    },
    {
      path:'/gift',
      component:resolve => require(["../pages/gift/index"],resolve),
      name:'gift',
      meta: {
        title:'悦福利',
        requiresAuth: true
      }  
    },
    {
      path:'/order',
      component:resolve =>require(["../pages/order/index"],resolve),
      name:'order',
      meta: {
        title:'悦服务',
        requiresAuth: true
      }  
    },
    {
      path:'/noodle',
      component:resolve =>require(["../pages/gift/noodle"],resolve),
      name:'noodle',
      meta: {
        title:'生日面',
        requiresAuth: true
      }  
    },
    {
      path:'/recuperation',
      component:resolve =>require(["../pages/gift/recuperation"],resolve),
      name:'recuperation',
      meta: {
        title:'体检',
        requiresAuth: true
      }  
    },
    {
      path:'/share',
      component:resolve =>require(["../pages/share/index"],resolve),
      name:'share',
      meta: {
        title:'悦分享',
        requiresAuth: true
      }  
    },
    {
      path:'/vote',
      component:resolve =>require(["../pages/share/vote"],resolve),
      name:'vote',
      meta: {
        title:'悦分享-投票',
        requiresAuth: true
      }  
    },
    {
      path:'/me',
      component:resolve =>require(["../pages/me/index"],resolve),
      name:'me' ,
      meta: {
        title:'个人信息',
        requiresAuth: true
      }    
    },
    {
      path:'/me/zsm',
      component:resolve =>require(["../pages/me/zsm"],resolve),
      name:'zsm',
      meta: {
        title:'个人信息-专属码',
        requiresAuth: true
      }  
    },
    {
      path:'/lxybm',
      component:resolve =>require(["../pages/order/lxybm"],resolve),
      name:'lxybm',
      meta: {
        title:'疗休养报名',
        requiresAuth: true
      } 
    },
    {
      path:'/phoneYy',
      component:resolve =>require(["../pages/order/sec/phoneYy"],resolve),
      redirect:'/phoneYy/apply',
      name:'phoneYy',
      children:[
        {
          path:'apply',
          name:'apply',
          component:resolve => require(["../pages/order/sec/apply"],resolve),
          meta: {
            title:'电话医生',
            requiresAuth: true
          } 
        },
        {
          path:'record',
          name:'record',
          component:resolve => require(["../pages/order/sec/record"],resolve),
          meta: {
            title:'电话医生记录',
            requiresAuth: true
          } 
        }      
      ]
    },
    {
      path:'/physical',
      component:resolve =>require(["../pages/order/physical"],resolve),
      name:'physical',
      meta: {
        title:'理疗',
        requiresAuth: true
      } 
    },
    {
      path:'/newsPage',
      component:resolve => require(["../pages/remul/newsPage"], resolve),
      name:'newsPage',
      meta: {
        title:'文章',
        requiresAuth: true
      } 
    },
    {
      path:'/code',
      component:resolve =>require(["../pages/code/ownCode"],resolve)
    },


  ]
})
