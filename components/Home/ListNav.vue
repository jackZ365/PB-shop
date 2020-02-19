<template>
    <div class="ListNav"><!--<h1>ListNav列表导航组件页面</h1>-->
        <div class="list">
            <router-link :to="list.link" v-for="list in listnavs" :key="list.id">
                <img :src="list.img" class="iconfont"/>
                <span v-text="list.navName"></span>
            </router-link>

        </div>


    </div>
</template>


<script>
    export default {
        name:"ListNav",
        props:["listnavs"] //父组件传递的数据
    }
</script>


<style scoped>
    .ListNav{
        margin-top: 10px;
        padding:  15px;
        /*border: 1px solid #eee;*/
    }
    .list{
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    .list a{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .list a span{
      font-size: 13px;
      color: #390C20;font-weight: bold;
    }
    .list a img{
        display: block;
        width: 42px;height: 42px;
        line-height: 42px;
        border-radius: 50%;
        margin-bottom: 10px;
    }
    .iconfont{
      -webkit-text-stroke-width:0px;
    }


</style>
