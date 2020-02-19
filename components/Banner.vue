<template>
    <div class="Banner">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div v-for="list in imgs" class="swiper-slide" :key="list.id">
                <!--循环imgs，创建div标签，list是循环出来的标签,加key值-->
                    <router-link :to="list.link">
                        <img :src='list.img'/>
                    </router-link>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>

    </div>
</template>


<script>
    import Swiper from "swiper";//导入Swiper
    import "swiper/dist/css/swiper.css";//导入样式
    //import "swiper/dist/css/swiper.min.css";//也可以用迷你版

    let ajax;
    export default {
        name:"Banner",

        props:["imgs"],//接收父组件传过来的数据，放在imgs里

        methods:{
          sildes(){
               //console.log(this.imgs,"--------------");
               var mySwiper = new Swiper('.swiper-container', {
                   autoplay: true,//可选选项，自动滑动
                   loop:true,/*无缝轮播*/
                   pagination: {
                       el: '.swiper-pagination',
                       bulletClass : 'banner_btn',//没有点击的小点
                       bulletActiveClass: 'banner_btn_active'//点击的小点
                   },
                   //如果轮播图是ajax请求渲染的，就要写下面2项，让当前Swiper自动重新绑定
                   observer:true,
                   observeParents:true
               })
          }
        },
        updated(){/*更新完成后再执行轮播图*/
          this.sildes();
        },
        mounted(){/*更新完成后再执行轮播图*/
          this.sildes();
        }
    }
</script>


<style>/*scoped加了那个小圆点就不能自定义了*/
    .Banner{
        width: 100%;
        background: #eef2ff;
    }
    .swiper-container{width: inherit;}
    .swiper-pagination{
        bottom: 10px;position: absolute;
        left: 0;
        width: 100%;
    }
    .banner_btn{
        display: inline-block;
        width: 10px;height: 10px;
        background:#9dc819;
        margin-left: 20px;
        border-radius: 50%;
        transition: all 0.4s;
    }
    .banner_btn_active{
        background:#390b1f;
    }
    .Banner .swiper-slide a{
            display: block;
        width: inherit;
    }
     .Banner .swiper-slide a img{
       width: 100%;height: auto;    display: block;
     }

</style>
