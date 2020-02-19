<template>
  <div class="ListNav">

    <div class="List_nav">
      <div class="List_nav_box">
        <router-link v-for="(kk,i) in listNavData" :key="kk.id" :to="kk.link.concat(kk.id)">
            <span v-text="kk.navName" v-on:click='ajaxMain(kk.id)'></span>
        </router-link><!--i<showNum大于i的都隐藏了-->
      </div>
    </div>
    <BB_ListMain :idB='idB' :listPidData='listPidData' v-if='idB' ref="BB_ListMain"/>

  </div>
</template>


<script>
    import BB_ListMain from '@/components/BB/ListMain';
    import Loading from "@/components/Loading";
    let ajax;
    export default {
        name:'BB_ListNav',
        components:{BB_ListMain,Loading},
        beforeRouteEnter(to,from,next){
        /*1.第一次进入list后，收到id，这里做ajax请求*/
            //console.log("进入listNav之前",to);
            //console.log("进入listNav之前",to.params.id.split(/&/)[0].replace(/^idA=/,''));
            next(vm=>{//vm是当前组件
                //console.log(vm.listData,'+++第一次进入listNav后+++++');
                //组件还没出来，不能使用this
                vm.ajaxNav("/api/getArticleNav2?id="+to.params.id.split(/&/)[0].replace(/^idA=/,''));
                //console.log("第一次进入listNav后",vm.listNavData);//空的
                vm.idB=to.params.id;
                //console.log("第一次进入listNav后===vm.idB",vm.idB);
            });

        },
        beforeRouteUpdate(to,from,next){
        /*2.以及进入list组件，id有变化，就要重新请求ajax，重新渲染*/
            //console.log("id更新了--ListNav",this.listNavData);
            //console.log("id更新了--idB",to.params.id.split(/&/)[0].replace(/^idA=/,''));
            this.ajaxNav("/api/getArticleNav2?id="+to.params.id.split(/&/)[0].replace(/^idA=/,''));
            this.idB=to.params.id;//.split(/&/)[1].replace(/^idB=/,'')
            next();
        },
        beforeRouteLeave(to,from,next){
        /*3.当前请求没完成，用户离开组件，就要把这个组件没有完成的请求停止*/

            //console.log("离开了listNav");
            next();
        },
          /*DataNum是数据总长，showNum：7是页面打开是默认加载7个,接口请求得到的是全部数据,但是只是显示了7个*/
        data(){
          return {
            //NavIdData:null,  //顶级导航ID，二级导航PID，
            listNavData:[],
            listPidData:null,  //二级导航ID，列表的PID
            listData:[],
            showNum:7,
            DataNum:0,
            idB:null //二级导航ID
          }
        },/*listNavData存放ajax得到的数据*/

        methods:{
            ajaxNav(url){  //console.log(url,'开始Nav请求');
                ajax=new XMLHttpRequest;
                ajax.open("get",url,true);
                ajax.send();
                ajax.onreadystatechange=()=>{
                    if(ajax.readyState==4&&ajax.status==200){
                        var data=JSON.parse(ajax.responseText);
                        data.forEach((v,i)=>{
                            v.link="/BB/idA="+v.pid+"&idB=";/*接口里没有地址，自已设置地址*/
                        })
                        this.listNavData=[];//清空之前的数据
                        this.listPidData=data.map( (v,i)=>v.id ).join();//获取所有栏目的id号,map是循环数组
                        //数据拼接
                        this.listNavData.push({id:this.listPidData.toString(),navName:"全部",link:"/BB/idA="+data[0].pid+"&idB="},...data);
                        //this.ajaxMain("/api/getArticleMain2?id="+this.listPidData.toString());
                         //console.log(this.listNavData,'************')
                         //console.log(this.listPidData,'************')

                        if( !this.$route.fullPath.match(/idB/i) ){
                            //实现重定向
                            //console.log(this.$route.fullPath,'listNav实现重定向');
                            //console.log(this.listPidData,'listNav实现重定向');
                            this.$router.push( this.$route.fullPath+"&idB="+this.listPidData );
                        }
                    }
                }
            },
            ajaxMain(id) {
              //console.log(this.$route.params.id.split(/&/)[1].replace(/^idB=/,''),'子组件里面的方法')
              //console.log(id,'子组件里面的方法')
              if(this.$refs.BB_ListMain){
                 //console.log(this.$refs.BB_ListMain,'子组件里面的方法')
                //var id=this.$route.params.id.split(/&/)[1].replace(/^idB=/,'')
                this.$refs.BB_ListMain.ajaxMain("/api/getArticleMain2?id="+id);  // 调用子组件的方法
              }
            }

        }
    }

</script>



<style scoped>
  @import url("animate.css");/*导入动画*/
  .ListNav{
    padding:10px 0;
  }
  ul{list-style: none;}

  .List_nav .active{
    color: #9dc819;
    border: 1px solid #9dc819;
  }
   .List_nav{
     padding-bottom: 15px;
   }



  .List_nav_box {
        overflow: hidden;
    overflow-x: visible;
    white-space: nowrap;    padding: 0 15px;
  }
    .List_nav_box::-webkit-scrollbar {/*滚动条整体样式*/
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }
  .List_nav_box::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0);
    background: rgba(0,0,0,00);
  }
  .List_nav_box::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0);
    border-radius: 0;
    background: rgba(0,0,0,0);
  }

  .List_nav a{
    display: inline-block;
    border: 1px solid #b5b5b6;
    color: #b5b5b6;font-size: 12px;
    padding: 3px 10px;
    border-radius: 10px;
    margin-right: 10px;
  }



</style>
