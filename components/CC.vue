<template>
    <div class="CC">
      <Head/><!-- <h1>购物车：CC组件页面{{$root.k}}</h1><br/><br/> -->


        <div class="gouwuche">
          <div class="list" v-for="item in list" :key="item.id">
              <router-link :to="item.link">
                  <img :src="item.img_path" />
                  <div class="list_right">
                      <div v-text="item.title" class="title"></div>
                      <span class="danwei">盒</span>
                      <div class="jiage">¥{{item.author}}</div>
                  </div>
              </router-link>
              <div class="shuliang">
                  <i class="iconfont">&#xe61d;</i>
                  <i class="num" v-text="id.toLocaleString().match(new RegExp(item.id,'g')).length">1</i>
                  <i class="iconfont" @click="gouwuche(item.id,$event)">&#xe640;</i>
              </div>
          </div>

        </div>
        <div class="kong">您的购物车目前是空的!</div>
      <transition enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
        <div class="tuijian" v-if="tuijianData">
          <div class="biaoti">——更多推荐——</div>
          <ul>
              <li v-for="listdatas in tuijianData" :key="listdatas.id" class="item">
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
        </div>

      <Loading v-else/>
      </transition>
      <div class="jiezhang">
        <div class="jiage">
          <span>￥{{jiageData}}</span>
          <p>{{shuliangData}}件商品</p>
        </div>
        <div class="guang">再逛逛</div>
        <div class="xiadan"><router-link to='/DD'>去下单</router-link></div>
      </div>
    </div>
</template>


<script>
    import Head from "@/components/Head";
    import Loading from "@/components/Loading"

    var ajax,ajaxT;
    export default {
        name:"CC",
        components:{Head,Loading},
        data(){
          return {
            id:[],
          list:[],
          shuliangData:0,
          jiageData:0,
          tuijianData:null}
        },
        updated(){
          //console.log(this.id,this.$root.k,this.list,'更新=========');
            this.id=this.$root.k;
          if(this.$root.k.length){
            //console.log('购物车有数据=======')
            document.querySelector('.gouwuche').style.display='block';
            document.querySelector('.kong').style.display='none';
          }else{ //console.log('购物车没有数据...........')
            document.querySelector('.gouwuche').style.display='none';
            document.querySelector('.kong').style.display='block';
          }
        },
        watch:{ //watch写法与methods相同
           id(newV,oldV){
              //console.log("id数据发生了改变：",newV,oldV);
              //数据发生改变，要做的操作。。。
              this.ajax(this.id);
           }
        },

        mounted(){
            //console.log(this.$root.k,'CCCCCCCCCCC----------------');
            this.id=this.$root.k;
            this.ajax(this.id);
              this.jia();
        },
        methods:{
          ajax(idN){
            var ids=[...new Set(idN)].join();//去重==展开
            //console.log(idN,ids,'购物车请求----------------------')
            ajax=new XMLHttpRequest;
            ajax.open("get","http://localhost:3456/api/getText?id="+ids,true);
            ajax.send();
            ajax.onreadystatechange=()=>{
                if(ajax.readyState==4&&ajax.status==200){
                  //console.log(JSON.parse(ajax.responseText),"+++++++++得到购物车数据++++++++++++" );
                    var data=JSON.parse(ajax.responseText);
                    if(Array.isArray(data)){
                      data.forEach((v,i)=>{
                          v.link="/Article/"+v.id;
                          v.img= v.img_path;
                      });
                      this.shuliangData=idN.length;//数量
                      this.list=data;
                    }else{
                      this.list=[];
                      this.list.push(data);
                      this.list.forEach((v,i)=>{
                          v.link="/Article/"+v.id;
                          v.img= v.img_path;
                      });
                       this.shuliangData=idN.length;//数量
                    }

                    //console.log(this.shuliangData,this.jiageData,this.list,data,"+++++++++得到购物车数据++++++++++++")
                    //console.log(this.list,"+++++++++得到购物车数据++++++++++++")
                    //console.log(this.list[0],"+++++++++得到购物车数据++++++++++++")
                }

              this.jia();
                if(![200,304].includes(ajax.status)){
                  console.log("请求错误！！！")
                    err("请求错误！！！");
                }
            }
          },
          jia(){
            //console.log(this.list,'wwwwwwwwwwwwwwwwwwwwwwwwww');
            this.jiageData=0;
            this.$nextTick(()=>{
              this.list.forEach((v,i)=>{
                //console.log(this.list,'qqqqqqqqqqqqqqqqqqqqqqqqqq');
                //console.log(document.querySelectorAll(".list")[i].children[1].children[1],'.....................');
                this.jiageData=this.jiageData+parseInt(v.author)*document.querySelectorAll(".list")[i].children[1].children[1].innerText;//价格
              });
            })

          }
        },
        created(){
            //console.log('更多推荐请求----------------------')
            ajaxT=new XMLHttpRequest;
            ajaxT.open("get","http://localhost:3456/api/getNewArticle?num=6",true);
            ajaxT.send();
            ajaxT.onreadystatechange=()=>{
                if(ajaxT.readyState==4&&ajaxT.status==200){
                    var data=JSON.parse(ajaxT.responseText);
                    /*对数据加工，配置link路由地址,后台没有地址，自已加上去*/
                    data.forEach((v,i)=>{
                        v.link="/Article/"+v.id;
                        v.img= v.img_path;
                    });
                    this.tuijianData=data;
                    //console.log(this.tuijianData,"+++++++++更多推荐数据++++++++++++")
                }
                if(![200,304].includes(ajaxT.status)){
                    err("请求错误！！！");
                }
            }
        }
    }
</script>


<style scoped>
  .CC{height: 100%;overflow: auto;}
  .gouwuche{padding: 15px;}
  .list{position: relative;margin-bottom: 20px;transform: perspective(1px);}
  .list a{display: flex;}
  .list a img{width: 120px;margin-right: 15px;}
  .list_right {position: relative;}
  .list_right .title{font-size: 16px;width: 150px;}
  .list_right .danwei{font-size: 14px;color: #aaa;}
  .list_right .jiage{position: absolute;bottom:0;}
  .shuliang{position: absolute;bottom:0;right: 0;}
  .shuliang i{padding: 2px;color: #999;font-size: 16px;}
  .shuliang .iconfont{background: #eee;border: 1px solid #eee;font-size: 18px;}

    .kong{font-size: 16px;font-weight: normal;text-align: center;padding: 15px;}
    .tuijian{padding: 15px;background: #f5f4e0;    padding-bottom: 70px;}
    .biaoti{text-align: center;font-size: 16px;margin-bottom: 15px;}
   ul{display: flex;flex-wrap: wrap;justify-content: space-between;}
    .item{
      margin-bottom: 15px;    background: white;position: relative;
      width: 48%;    display: inline-block;
      box-shadow: 1px 1px 10px #ddd;
      border-radius: 10px;
      font-size: 15px;
      font-weight: bold;
     }
    ul li a{display: block; }
    ul li a img{width: 100%;}
    ul li a p{
        margin-bottom: 5px;
        padding:0 5px;    height: 45px;
        line-height: 22px;
        width: 100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .author{padding: 5px ;}
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

    .jiezhang{
      display: flex;justify-content: space-around;align-items: center;
      position: fixed;bottom: 60px;
      background: white;width: 100%;height: 50px;
    }
    .xiadan{
          background-color: #390C20;
        border: 0;color: white;
        padding: 5px;font-size: 14px;
        cursor: pointer;border-radius: 5px;
        min-width: 100px;text-align: center;
    }
    .guang{
          background-color: #e6cfaa;
        border: 0;
        color: #fff;
        padding: 5px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 5px;
        min-width: 100px;
        text-align: center;
    }
</style>
