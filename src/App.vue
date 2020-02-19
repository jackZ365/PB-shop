<template>
  <div id="app"> <!-- <h1>App根组件</h1> -->

    <router-view/><!--路由显示区域-->
    <!--<router-view/>路由显示区域-->

    <router-view name="Footv"/><!--底部导航-->



  </div>
</template>

<script type="module">
	export default {
      name: 'App',

      mounted(){
        //console.log(this.$children,'=========App==================')
      }
	}
</script>

<style>/*这里的都是全局样式*/
/*阿里图标使用*/
@font-face {
  font-family: 'iconfont';  /* project id 1342419 */
  src: url('https://at.alicdn.com/t/font_1342419_frmm7n923nd.eot');
  src: url('https://at.alicdn.com/t/font_1342419_frmm7n923nd.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_1342419_frmm7n923nd.woff2') format('woff2'),
  url('https://at.alicdn.com/t/font_1342419_frmm7n923nd.woff') format('woff'),
  url('https://at.alicdn.com/t/font_1342419_frmm7n923nd.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_1342419_frmm7n923nd.svg#iconfont') format('svg');
}
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0px;
    -moz-osx-font-smoothing: grayscale;
  }

@import url("assets/animate.css");/*导入动画*/

  html,body{
    height: 100%;
    font-size: 14px;
    background: #fff;
    color: #390C20;
  }
  html {
    position: relative;
    height: 100%;
    font-family: "华文细黑", STHeiti Light, STXihei, "华文细黑", SimHei, "黑体" !important;
}
  ul,ol{list-style: none}
  i{font-style: normal;}
  input,button{outline: none}
  a{text-decoration: none;color: inherit;}
  *{margin: 0;padding: 0;box-sizing: border-box;    color: inherit;}
	#app{ height: 100%;padding-bottom: 50px; }

/*第一步：先创建动画，命名donghuaA*/
.AnimatImg{
     width:60px;height: 60px;  border-radius: 50%;
     position: absolute;left: 50%;top: 50%;
    transform: translate(-50%,-50%);
    z-index: -1;opacity: 0;
  }
    @keyframes donghuaA {
        /*动画的开始（可以与标签设置的样式不一样）*/
        from{z-index: 100;  opacity: 1; }
        /*动画的结束*/
        to{z-index: -1;  opacity: 1;  transform: translate(-50%,500px); }
    }
    .animated_gwc{
      width:60px;height: 60px; border-radius: 50%;
      position: absolute;left: 50%;top: 50%;
      transform: translate(-50%,-50%);z-index: -1;opacity: 1;
/*第二步：再使用动画,播放时间1s，等待2s，播放次数5次，速率 */
        animation: donghuaA 1s ease-in;
    }
</style>
