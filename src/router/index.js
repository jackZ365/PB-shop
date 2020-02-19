import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';//首页导航组件

import BB from '@/components/BB';
import CC from '@/components/CC';
import DD from '@/components/DD';

import Foot from '@/components/Foot';//底部导航

import Login from '@/components/Login';//登录 注册组件
import Register from '@/components/Register';

import Article from '@/components/Article';//内容组件

import BB_ListNav from '@/components/BB/ListNav';  //BB组件的子组件
import BB_ListMain from '@/components/BB/ListMain';  //BB组件的二级子组件




//把路由插件安装到当前的vue项目中
Vue.use(Router);

export default new Router({

   /*mode:'history',
  mode:' hash ',*/
  routes: [
    //首页导航路由   1.元字符里用mustLogin记录登录状态，必须要登录才能进入该路由
    {path:"/",components:{default:Home,Footv:Foot},meta:{mustLogin:true}},
    {path:"/Article/:id",components:{default:Article},meta:{mustLogin:true}},
    /*{path:"/BB",redirect:"/BB/0"},/!*打开BB，重定向到/BB/0，就是选择全部*!/*/
    {path:"/BB",components:{default:BB,Footv:Foot},meta:{mustLogin:true},
      children:[
        { path:"/BB/:id",component:BB_ListNav,meta:{mustLogin:true} }
      ]
    },
    {path:"/CC",components:{default:CC,Footv:Foot},meta:{mustLogin:true}},
    {path:"/DD",components:{default:DD,Footv:Foot},meta:{mustLogin:true}},

    //{path:"/Article/:id ",components:{default:Article},meta:{mustLogin:true}},

    //登录 注册路由
    {path:"/Login",component:Login},
    {path:"/Register",component:Register},

  ]
})
