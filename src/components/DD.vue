<template>
    <div class="DD"><!-- <h1>个人中心：DD组件页面</h1><br/><br/> -->
      <Head/>
      <main>
        <div class="deng">查看个人中心，请先登录</div>
        <div class="Login">
            <input  placeholder="请输入账号"/>
            <input type="password" placeholder="请输入密码" />
            <button>登录</button>
            <div class="register">
              <span>忘记密码</span><i> | </i><span>立即注册</span>
            </div>
        </div>



		     <div class="huanfu"><!--点击调用更改里面的数据，  -->
          <p>——主题设置——</p>
          <div class="yanse">
            <button @click="$store.commit('changeTheme','whiteX')">白 色</button>
            <button @click="$store.commit('changeTheme','blackX')">黑色</button>
            <button @click="$store.commit('changeTheme','redX')">红 色</button>
            <button @click="$store.commit('changeTheme','orangeX')">黄 色</button>
          </div>

         </div>

         <div class="line"></div>


        <Pai/>
      </main>


    </div>
</template>


<script>
    import Head from "@/components/Head";
    import Loading from "@/components/Loading";
    import Pai from "@/components/Pai";
    var ajax;
    export default {
        name:"DD",
        components:{Head,Loading,Pai},
        mounted(){
            //console.log(this.$store);
        }
    }
</script>


<style scoped>
  .DD{height: 100%;    padding-bottom: 60px;}
  main{height: 100%;overflow: auto;}
.Login{padding: 15px;}
.deng{
    background-color: #fcf8e3;
    border-color: #faebcc;color: #8a6d3b;
    height: 45px;line-height: 45px;width: 100%;
    font-size:16px ;padding-left: 15px;
}
.Login input{
    width: 100%;height: 40px;
    padding-left: 10px;margin-top: 10px;padding-top: 2px;
    border: none;background-color: #f7f8f8;border-radius: 5px;}
::-webkit-input-placeholder{
      color: #aaa;
  }
  .Login button{
    border-radius: 5px;    margin-top: 15px;
    width: 100%;height: 45px;line-height: 45px;
    font-size: 16px;background-color: #390C20;color: white;
  }
  .register{
    text-align: center;font-size: 15px;margin-top: 10px;color: #999;
  }
  .huanfu{padding: 15px;font-size: 16px;margin-top: 30px;}
  .huanfu p{text-align: center;margin-bottom: 20px;}
  .yanse{display: flex;justify-content: space-around;align-items: center;
  flex-wrap: wrap;
    width: 100%;
  }
  .yanse button{border: none;
    width: 45%;
    height: 65px;
    margin-bottom: 15px;}
  .yanse button:nth-child(1){background: #eee;color: inherit;}
  .yanse button:nth-child(2){background: #000;color: #fff;}
  .yanse button:nth-child(3){background: #f55;color: #fff;}
  .yanse button:nth-child(4){background: orange;color: #fff;}
  .line{height: 1px;width: 100%;background: #eee;margin: 35px 0;}


</style>
