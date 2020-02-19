<template>
    <div class="Home">
       <!-- <h1>Home组件页面</h1>-->
        <Head/><!--头部-->
        <transition enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">

            <div class="main" v-if="bannerData&&list[0].list">
                <Banner :imgs="bannerData"/><!--bannerData传给Banner组件-->

                <ListNav :listnavs="listnavs"/><!--列表导航-->

                <List :list="list"  ref='gouwc'/><!--列表-->
                 <Pai/>
            </div>
            <Loading v-else/>
        </transition>



    </div>
</template>


<script type="module">
    import Head from "@/components/Head";
    import Banner from "@/components/Banner";
    import List from "@/components/Home/List";
    import ListNav from "@/components/Home/ListNav";
    import Loading from "@/components/Loading"
    import Pai from "@/components/Pai";

    let ajax1,ajax2,ajax3,ajax4,ajax5;/*定义两个变量名称，两个ajax请求*/
    export default {
        name:"Home",
        components:{Head,Banner,List,ListNav,Loading,Pai},
        created(){
            /*ajax请求，只请求一次，页面打开出现，那就写在生命周期里，请求多次写在方法里，方便调用*/
            var p1=new Promise((success,err)=>{/*轮播图的请求*/
                ajax1=new XMLHttpRequest;
                ajax1.open("get","/api/getBanners?num=5",true);
                ajax1.send();
                ajax1.onreadystatechange=()=>{
                    if(ajax1.readyState==4&&ajax1.status==200){
                        var data=JSON.parse(ajax1.responseText);
                        /*对数据加工，配置link路由地址,后台没有地址，自已加上去*/
                        data.forEach((v,i)=>{v.link="/Article/"+v.id;v.img= v.img_path.replace(/\\/g,"/")});/*图片地址里的\换成/*/
                        success(data);
                    }/*这里不能直接写else*/
                    /*includes检测数组里的数据*/
                    if(![200,304].includes(ajax1.status)){
                        err("请求错误！！！");
                    }
                }
            });
            /*导航分类的请求*/
               var p2=new Promise((success,err)=>{
                   ajax2=new XMLHttpRequest;
                   ajax2.open("get","/api/getType",true);
                   ajax2.send();
                   ajax2.onreadystatechange=()=>{
                       if(ajax2.readyState==4&&ajax2.status==200){
                           var data=JSON.parse(ajax2.responseText);
                           /*对数据加工，配置link路由地址,后台没有地址，自已加上去*/
                           data.forEach((v,i)=>{
                               v.link="/Type/"+v.id;
                               v.img= v.img;
                           });
                           success(data);
                           //console.log(data,"++++++导航分类++++++++++++++++++")
                       }
                       if(![200,304].includes(ajax2.status)){
                           err("请求错误！！！");
                       }
                   }
               });
         /*人气产品的请求*/
            var p3=new Promise((success,err)=>{
                  ajax3=new XMLHttpRequest;
                  ajax3.open("get","/api/getRenqiArticle");/*默认打开加载4个,数据库控制*/
                  ajax3.send();
                  ajax3.onreadystatechange=()=>{
                      if(ajax3.readyState==4&&ajax3.status==200){
                          var data=JSON.parse(ajax3.responseText);
                          /*对数据加工，配置link路由地址,后台没有地址，自已加上去*/
                          data.forEach((v,i)=>{
                              v.link="/Article/"+v.id;
                              v.img= v.img_path;
                          });
                          success(data);
                          //console.log(data,"+++++++ajax3+++++人气产品++++++++++++")
                      }
                      if(![200,304].includes(ajax3.status)){
                          err("请求错误！！！");
                      }
                  }
              });
            /*最新产品的请求*/
               var p4=new Promise((success,err)=>{
                     ajax4=new XMLHttpRequest;
                     ajax4.open("get","/api/getNewArticle?num="+this.list[1].listNum,true);/*默认打开加载4个*/
                     ajax4.send();
                     ajax4.onreadystatechange=()=>{
                         if(ajax4.readyState==4&&ajax4.status==200){
                             var data=JSON.parse(ajax4.responseText);
                             /*对数据加工，配置link路由地址,后台没有地址，自已加上去*/
                             data.forEach((v,i)=>{
                                 v.link="/Article/"+v.id;
                                 v.img= v.img_path;
                             });
                             success(data);
                             //console.log(data,"+++++++++ajax4+++最新产品++++++++++++")
                         }
                         if(![200,304].includes(ajax4.status)){
                             err("请求错误！！！");
                         }
                     }
                 });
            /*精品的请求*/
               var p5=new Promise((success,err)=>{
                     ajax5=new XMLHttpRequest;
                     ajax5.open("get","/api/getJingArticle",true);/*默认打开加载8个*/
                     ajax5.send();
                     ajax5.onreadystatechange=()=>{
                         if(ajax5.readyState==4&&ajax5.status==200){
                             var data=JSON.parse(ajax5.responseText);
                             /*对数据加工，配置link路由地址,后台没有地址，自已加上去*/
                             data.forEach((v,i)=>{
                                 v.link="/Article/"+v.id;
                                 v.img= v.img_path;
                             });
                             success(data);
                             //console.log(data,"++++++++++精品+++精品+++++++++++")
                         }
                         if(![200,304].includes(ajax5.status)){
                             err("请求错误！！！");
                         }
                     }
                 });

       /*对所有的ajax请求，进行数据监控,Promise.all异步对象，监控所有的，是对的就全部得到，错了一个就得到错的*/
            Promise.all([p1,p2,p3,p4,p5]).then((aa)=>{
                this.bannerData=aa[0];
                //console.log(aa,"请求到的所有的数据=========================");
                 //console.log(this.list[0].list,"===========最新文章========");
                //console.log(this.list[0],"***************轮播图**************");
                this.listnavs=aa[1];
                this.list[0].list=aa[2];
                this.list[1].list=aa[3];
                this.list[2].list=aa[4];
               // console.log(this.list,"***************list**************");

            },(err)=>{
                //console.log(err);
            });
        },

        updated(){
          //console.log(this.$refs.gouwc.gouwcid,'=========Home==================')
        },
        data(){
            return {
                /*实际开发中，这里写ajax请求到的数据*/
                bannerData: null,/*获取 banner图类型的文章:/api/getBanners?num=3*/
                listnavs:[],
              /*获取 最新的文章 /api/getNewArticle?num=3*/
                list:[
                    {
                      nav:{title:"人气产品"},
                      list:null
                    },
                    {
                      nav:{title:"新品尝鲜"},
                      list:null,
                      listNum:4,/*默认打开加载4个*/
                    },
                    {
                      nav:{title:"精品推荐"},
                      list:null
                    }
                ]
            }
        }


    }
</script>


<style scoped>
    .Home{ height: 100%;     overflow: hidden;}
    .main{/*让这个组件溢出，可以上下滑动，
    因为顶部head和底部foot是固定不动的*/
        height: 100%;
        padding-bottom: 80px;
        overflow: auto;
    }
    .Load{  text-align:center;  }
    .Load div{display: inline-block;}
    .Load span{
        color:#666;
        margin-left: 5px;
        vertical-align: 30px;
    }
    .Load img{  width: 70px;  }



</style>
