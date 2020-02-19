<template>
  <div class="ListMain">
     <div class="List_main"><!-- <h1>ListMain组件{{idB}}</h1> -->
        <!--transition-group给多组件添加动画-->
      <transition-group enter-active-class="animated fadeIn faster"
                        leave-active-class="animated fadeOut faster" class='List_main_box'>
        <!--i<showNum大于i的都隐藏了-->
        <div class="item" v-for="(kk,i) in listData" :key="kk.id" :pid="kk.pid" v-if="i<showNum">
          <router-link :to="kk.link">
            <img v-if="kk.img_path" :src="kk.img_path">
            <p class="title" v-text="kk.title"></p>
          </router-link>
          <div class="author">
            <span>￥{{kk.author}} <em>/盒</em></span>
            <div class="jiaru">
              <i @click="gouwuche(kk.id,$event)" class="iconfont">&#xe613;</i>
              <img :src="kk.img_path" class="AnimatImg"/>
            </div>
          </div>
        </div>
<!-- <router-view/> -->
      </transition-group>



      <button @click="shows" class="showMore" v-if="DataNum>showNum">加载更多</button>
      <div class="no" v-else>全部加载完成...</div><!--v-else上面那个和这个只能显示一个-->
    </div>


  </div>
</template>


<script>
    import Loading from "@/components/Loading";

    let ajax;
    export default {
        name:'BB_ListMain',
        props:['idB','listPidData'],
        components:{Loading},

          /*DataNum是数据总长，showNum：7是页面打开是默认加载7个,接口请求得到的是全部数据,但是只是显示了7个*/
        data(){
          return {
            listData:[],
            showNum:4,
            DataNum:0,
          }
        },/*listNavData存放ajax得到的数据*/

        mounted(){
          //console.log(this.$props.listPidData, this.$props.idB,  'ListMain组件创建完成--------------')
          var id=this.idB.match(/idB/i)?this.idB.split(/&/)[1].replace(/^idB=/,''):this.listPidData;
          //console.log(id, '组件创建完成，')
          this.ajaxMain("/api/getArticleMain2?id="+id);
        },
        updated(){
          //console.log(this.$props.listPidData, this.$props.idB,  'ListMain===updated-------------')
          //console.log(document.querySelectorAll('.List_main_box>a'),  'ListMain===updated-------------')
          //console.log(document.querySelectorAll('.List_main_box>a'),  'ListMain===updated-------------')

          for(var i=0;i<this.listData.length;i++){
              //console.log(this.listData[0].pid,'=====',this.listData[i].pid );
              if(this.listData[0].pid==this.listData[i].pid){
                //console.log('添加........................');
                for(var k=0;k<document.querySelectorAll('.List_nav_box>a').length;k++){
                  if(this.listData[0].pid==document.querySelectorAll('.List_nav_box>a')[k].getAttribute("href").split(/idB=/)[1]){
                    document.querySelectorAll('.List_nav_box>a')[k].classList.add('active');
                  }else{
                    document.querySelectorAll('.List_nav_box>a')[k].classList.remove('active');
                  }
                }
              }else{//全部
                for(var n=0;n<document.querySelectorAll('.List_nav_box>a').length;n++){
                  document.querySelectorAll('.List_nav_box>a')[n].classList.remove('active');
                }
                document.querySelectorAll('.List_nav_box>a')[0].classList.add('active');
                break;
              }
          }
          //document.querySelectorAll('.filter>a')[i].children[0].classList.remove('active');
        },
        methods:{
            ajaxMain(url){
                  //console.log(url,'开始ListMain请求---------------')
                ajax=new XMLHttpRequest;
                ajax.open("get",url,true);
                ajax.send();
                ajax.onreadystatechange=()=>{
                    if(ajax.readyState==4&&ajax.status==200){
                        var data=JSON.parse(ajax.responseText);
                        data.forEach((v,i)=>{
                            v.link="/Article/"+v.id;//接口里没有地址，自已设置地址
                        })
                        //this.listNavData=data;
                        //console.log(data,"==========================");
                        this.DataNum=data.length;//数据全加载完了就不会显示了
                        //this.listData=null;
                        this.listData=data;
                        //console.log(this.listData,'======listData===================')
                    }
                }
            },
            shows(){/*每次点击加载，都会触发这个，重新渲染，再在加载2个标签*/
                this.showNum+=2;   //console.log(this.listNavData,"++++++++++++++++++++++");
                //console.log(this.listNavData);
            }
        }
    }

</script>



<style scoped>
  @import url("animate.css");/*导入动画*/



  .List_main{
    margin-top: 5px;
    background: white;
    padding:0 15px;
  }

  .List_main_box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;}
  .item{
    margin-bottom: 15px;
    width: 48%;    display: inline-block;
    box-shadow: 1px 1px 10px #ddd;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;display: block;position: relative;
   }
 .item a{display: block;}
  .item a img{
      width: 100%;
  }
  .item  p{
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

  .showMore{
        background: #ccc;
    border: none;
    display: block;
    width: 100px;
    padding: 5px;
    margin: auto;
    border-radius: 20px;
    color: #fff;
    outline: none;
    margin-top: 10px;
    letter-spacing: 1px;
    font-size: 15px;
  }
  .no{
    text-align: center;
    color:#bbb;
  }

</style>
