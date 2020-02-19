<template>
  <div class="Pai">
      <div class="end">
        <div class="store">
          <img src="../assets/img/e1.jpg"/>
        </div>
        <div class="about">
          <img src="../assets/img/e2.jpg"/>
        </div>
      </div>
      <div class="endIcon">
        <div>
          <img src="../assets/img/z1.png"/>
          <span>惊喜好礼</span>
        </div>
        <div>
          <img src="../assets/img/z2.png"/>
          <span>3-5小时准时达</span>
        </div>
        <div>
          <img src="../assets/img/z3.png"/>
          <span>全程冷链</span>
        </div>
      </div>

      <div class="base">
          <div class="logo"><img src="../assets/img/lo.png"/></div>
          <div class="wx"><img src="../assets/img/wx.png"/></div>

          <div class="ww">
            <i class="iconfont">&#xe6b3;</i>
            <router-link to='http://weibo.com/piehouse'>
              <i class="iconfont">&#xe653;</i>
            </router-link>

          </div>
          <div class="tel">
            <router-link to='tel:4008314159'>
              <i class="iconfont">&#xe648;</i>
              4008-3-14159
            </router-link>
          </div>
          <div class="company-email">order@pantrysbest.com</div>
          <div class="line"></div>
          <div class="company-name">北京派悦坊餐饮管理有限公司</div>
          <div class="company-dz">北京市朝阳区神路街39号10幢3层4段92-93</div>
          <div>Copyright 2010-2019 派悦坊，Ltd 京ICP备12046340</div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .end{padding: 15px;}
  .end img{
    width: 100%;
    border-radius: 10px;
    box-shadow: 1px 1px 10px #ccc;}
  .about{margin-top: 10px;}

  .endIcon{
    padding: 15px;
    display: flex;
    justify-content: space-around;
  }
  .endIcon span{
    font-size: 12px;    color: #e6cfaa;
    }
  .endIcon img{
    width: 36px;
  }
   .endIcon div{
     display: flex;flex-direction: column;
     align-items: center;
   }
  .base{
    width: 100%;
    text-align: center;
    background-color: #390C20;
    padding-top: 35px;
    color: #b5b5b6;
    padding-bottom: 50px;
    font-size: 12px;
  }
  .base .logo img{width: 180px;}
  .base .wx{margin-top: 10px;}
  .base .wx img{
    width: 100px;
  }
  .base .ww{margin-top: 5px;}
  .base .ww a i{font-size: 28px;}
  .base .ww>i{margin-right: 10px;font-size: 26px;}
  .base .tel{
    margin-top: 5px;
  }
  .base .company-email{
    margin-top: 5px;
  }
  .base .line{
    width: 100px;
  margin: 15px;
  display: inline-block;
  border-bottom: 1px solid #b5b5b6;
  margin-top: 20px;
  }
  .base .company-name{
    margin-top: 5px;    color: #e6cfaa;
  }
  .base .company-dz{
    margin: 5px 0;
  }
</style>
