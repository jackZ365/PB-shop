<template>
    <div class="List"><!--<h1>Home-List组件页面</h1>-->

        <!--外层用template包起来，用接收的数据循环创建标签，有两个数据-->
        <template v-for="listObj in list">
            <div class="title">
                <img src="@/assets/img/renqi.png"/>
                <span v-text="listObj.nav.title"></span>
                <img src="@/assets/img/renqi.png"/>
            </div>
            <ul>
                <li v-for="listdatas in listObj.list" :key="listdatas.id" class="item">
                    <router-link :to="listdatas.link">
                        <img v-if="listdatas.img" :src="listdatas.img">
                        <p v-text="listdatas.title"></p>
                    </router-link>
                    <div class="author">
                      <span>￥{{listdatas.author}} <em>/盒</em></span>
                      <div class="jiaru">
                        <i class="iconfont" @click="gouwuche(listdatas.id,$event)">&#xe613;</i>
                        <img :src="listdatas.img_path" class="AnimatImg"/>
                      </div>

                    </div>
                </li>
            </ul>
        </template>



    </div>
</template>


<script>
    export default {
        name:"List",
        props:["list"],

    }
</script>


<style scoped>
    .List{padding: 0 15px;}
    .title{
      text-align: center;font-size: 18px;font-weight: 700;
      margin: 20px 0;
    }
    .title img{    width: 40px;height: 10px;}
    .title img:first-child{transform: scale(-1);}

    ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;}
    .item{
      margin-bottom: 15px;
      width: 48%;    display: inline-block;
      box-shadow: 1px 1px 10px #ddd;
      border-radius: 10px;
      font-size: 15px;
      font-weight: bold;position: relative;
     }
    ul li a{display: block; }
    ul li a img{
        width: 100%;
    }
    ul li a p{
          margin-bottom: 5px;
        padding:0 5px;    height: 45px;
        line-height: 22px;
        width: 100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
       /* white-space: nowrap;
        text-overflow: ellipsis; */
    }
    .author{
      padding: 5px ;
    }
    .author span{font-size: 16px;}

    .author em{
      color: #e6cfaa;font-size: 13px;
      font-style: normal;font-weight: normal;
    }
    .jiaru{    float: right;}
     .jiaru i{
       color: white;background: #390C20;
       border-radius: 50%;        padding: 4px 5px;
           transform: translateY(-8px);
           float: right;
      font-weight: normal;
    font-size: 22px;
     }
</style>
