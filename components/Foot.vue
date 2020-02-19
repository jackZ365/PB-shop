<template>
    <div class="Foot" :style="$store.getters.Themesfoot">

		<div class="list">
			  <router-link to="/" exact active-class="active"><i class="iconfont">&#xe639;</i>首页</router-link>
			  <router-link to="/BB" active-class="active"><i class="iconfont">&#xe624;</i>分类</router-link>
			  <router-link to="/CC" active-class="active">
          <i class="iconfont">&#xe64f;</i>
          购物车
          <span class="gouNum">!</span>
        </router-link>
			  <router-link to="/DD" active-class="active"><i class="iconfont">&#xe638;</i>个人中心</router-link>
		</div>


  </div>
</template>


<script>
    export default {
        name:"Foot",
       /* data(){return {CCLink:"/CC"}},
        beforeRouteEnter(to,from,next){
        //记录/CC进入的子栏目，下次点击CC时候还能进去,刷新不会回到主页去
            var ids=from.params.id;
            if(from.fullPath.match(/^\/BB/i)){
                next(vm=>{
                    vm.CCLink="/BB/"+ids;
                })
            }else{
                next();
            }

        } */
    }
</script>


<style scoped>/*局部样式*/
@import url("../assets/animate.css");
    .Foot{
        position: absolute;left: 0;bottom:0;
        width: 100%;  height: 60px;
        background: #eee;
        /* box-shadow: 0 0px 5px #ccc; */
        z-index: 10;color: #bbb;
        font-size: 12px;
    }
    .list{
        padding: 10px 15px;
        text-align: center;
    }
    .list .iconfont{
        display: block;
        height: 25px;
        font-size: 22px;
        font-weight: normal!important;
    }
    .list a{
        float: left;width: 25%;
    }
     .list a:nth-child(3) i{
       font-size: 24px;
     }
     .list a:nth-child(3){
       position: relative;
     }
    .active{
        color:#390C20;
        font-weight: 600;
    }
    .gouNum{
      display: inline-block;
      font-size: 12px;
      color: white;background: red;padding: 0 8px;border-radius: 50%;
      position: absolute;    top: -5px;right: 20px;display: none;
    }

</style>
