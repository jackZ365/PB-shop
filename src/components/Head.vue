<template>
    <div class="Head" :style="$store.getters.Themeshead"><!-- :style="$store.getters.Themeshead" -->
        <router-link to='/' class='logo'>
            <img src="../assets/img/logo.png" />
        </router-link>
         <!-- <router-view/>  -->
        <div class="right">
              <span class='search'>
                <i class="iconfont">&#xe780;</i>
              </span>
              <span class="line">|</span>
              <a :href="'tel:' + 10086" class='phone'>
                <i class="iconfont">&#xe862;</i>
              </a>
              <span class="line">|</span>
              <span  class='Memu'>
                <i class="iconfont">&#xe790;</i>
              </span>
        </div>
    </div>
</template>


<script>
    export default {
      name:"Head",
      mounted(){
        //console.log(this.$store.getters.Themeshead,"9999999999999999999999")
      }
    }
</script>


<style scoped>
  .Head{
    width: 100%;height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    box-shadow: 0 0 10px #ddd;
    padding: 0 20px;
    color: #aaa;
  }
  .right>*{
    display: inline-block;
    margin-left: 10px;
  }
  .line{
    vertical-align: 3px;
    font-size: 20px;
  }
  .phone{color: #9dc819;}
  .phone i{font-size: 26px;}
  .logo img{
    width: 120px;
  }
  .iconfont{
    font-size: 24px;
}


</style>
