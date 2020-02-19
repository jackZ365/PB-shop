import Vue from 'vue'  //引用vue框架
import App from './App'  //引用App.vue根组件
import router from './router'  //引用router里面的index.js路由文件，
                // 如果路由文件不命名index就要写上完整的文件名xx.js
import store from './store';


Vue.config.devtools = true
Vue.config.productionTip = false


//全局守卫：检测是否登录
let login=true;//模拟记录的登录状态，实际中由后台提供
router.beforeEach((to, from, next) => {
  //mustLogin记录的登录状态，true是没有登录，要先去登录页面
  //console.log(to.meta.mustLogin);//是当前路由的meta信息
  //console.log(to.matched[0].meta);//这个是最外层导航的meta信息
  //to.matched是所有的匹配的路由信息
  //另一个写法：下级路由加上登录信息，这个判断条件to.meta.mustLogin就可以了

  var status=to.matched.some((v,i)=>{//循环status数组，找到true马上return出去
    return v.meta.mustLogin;
  });

  if(status){
    //检测登录状态
    if(login){ next(); }else{ next("/Login"); }
  }else{
    //检测如果已经登录了，就不能进入登录注册页面
    if(login){ next(false); }else{ next(); }
  }
});

var gouwcid=[];
Vue.mixin({
  methods:{
    gouwuche(id,e){
      gouwcid.push(id);
      e.target.nextElementSibling.setAttribute("class","animated_gwc");
      setTimeout(function(){
        e.target.nextElementSibling.setAttribute("class","AnimatImg");
      },1000);
      document.querySelector(".gouNum").style.display='block';
      //console.log(gouwcid,e.target.nextElementSibling,'全局混入-------main-------------')
    }
  }
});
/* Vue.prototype.xxx=()=>{
  console.log(gouwcid,"原型继承");
  return gouwcid;
} */


new Vue({
  el: '#app',
  router,
  data(){return {k:gouwcid}},
  store,
  components: { App },
  template: '<App/>'
})
