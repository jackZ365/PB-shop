<template>
    <div class="BB"><!--<h1>BB组件页面</h1>-->
        <Head/><!--头部-->
<!-- http://192.168.1.116:3456/api/getChildNav?id=0  -->
        <transition enter-active-class="animated fadeIn faster"
                    leave-active-class="animated fadeOut faster">

            <div class="main" v-if='filterdata.length>0'><!--数组判断长度-->
                <!--筛选效果-->

                    <transition-group enter-active-class="animated fadeIn faster"
                                      class="filter"
                                      leave-active-class="animated fadeOut faster">
                                    <!--concat字符串拼接，与字符串相加效果一致-->
                        <router-link
                                     :to="obj.link.concat('/idA=',obj.id)"
                                     v-for="obj in filterdata" :key="obj.id">
                                         <span v-text="obj.navName" @click="Active">全部...</span>
                        </router-link>
                        <!--append自动在地址前面加上当前路由地址，
                        如：地址是/aa的router-link标签加上append,地址就会加上当前路由地址，是/AA/aa-->
                    </transition-group>

                <!-- 类型对应的列表:二级导航 -->
                <router-view ref="BB_ListMain"/>
                <!-- <router-view name='BB_ListMain'/> -->


            </div>
            <Loading v-else/>
        </transition>
    </div>
</template>


<script>
    import Head from "@/components/Head";
    import Loading from "@/components/Loading"
    import BB_ListMain from '@/components/BB/ListMain';
    import BB_ListNav from '@/components/BB/ListNav';
    let ajax;
    export default {
        name:"BB",
        components:{Head,Loading,BB_ListMain,BB_ListNav},

        created(){/*组件创建完成，里面有数据了已经*/
                  //console.log("BB组件,开始ajax请求")
              /*用的之前的cc小说的后台api*/
                  ajax=new XMLHttpRequest;
              /*http://192.168.1.116:3456/api/getChildNav?id=0 数据库里pid为0的类型*/
                  ajax.open("get","/api/getChildNav?id=0",true);
                  ajax.send();
                  ajax.onreadystatechange=()=>{
                      if(ajax.readyState==4&&ajax.status==200){
                          var data=JSON.parse(ajax.responseText);
                          data.forEach((v,i)=>{
                              v.link="/BB";/*接口里没有地址，自已设置地址*/
                          })
                          //console.log(data);
                if(![200,304].includes(ajax.status)){
                    err("请求错误！！！");
                }

                    //获取所有栏目的id号,map是循环数组
                    var ids=data.map( (v,i)=>v.id );
                    //数据拼接
                    this.filterdata.push({id:ids.toString(),navName:"全部产品",link:"/BB"},...data);
                    //console.log(this.filterdata,"============全部产品============================");
                    //console.log(this.$route,'===============全部产品++==============');
                    //如果当前匹配的地址只有/BB 我们就让当前地址重定向到 全部筛选按钮上
                    if(this.$route.fullPath=="/BB"){//刚打开//实现重定向
                        //console.log(this.$router,'BB实现重定向');
                        this.$router.push("/BB".concat("/idA=",ids.toString()));

                    }
                }
            }
        },
        mounted(){
          //console.log(document.querySelector('.filter'),'5555555555555555555555555555');
          //document.querySelector('.filter>a:first-child').children.className='active';
        },
        methods:{
          All(filter_a,List){
            //console.log(!filter_a.className=='active','验证全部的nav隐藏');
            if(filter_a.className=='active'){
              List.style.display='none';  //console.log('nav隐藏');
            }else{
              List.style.display='block';  //console.log('nav显示');
            }
          },
          Active(Span){
            //console.log(this.$route.params.id,'++++Active++++++Active++++++++++++++++')
            //console.log(Span,'++++Active++++++Span+++++++++++++++')
            //console.log(event.target,'++++Active+++event++++++++++++++++++')
            if(Span.innerText=="全部产品"){
              Span.classList.add('active');  //console.log('全部产品----------------')
            }
            if(event.target.tagName=='SPAN'){ //console.log(event.target,'********-----------------span--------------*********')
              for(var i=0;i<document.querySelectorAll('.filter>a').length;i++){
                document.querySelectorAll('.filter>a')[i].children[0].classList.remove('active');
              }
              //console.log('点击触发------------')
              event.target.className='active';
            }

          }
        },
        updated(){
          this.All( document.querySelector('.filter>a:first-child>span'), document.querySelector('.List_nav') );

          //console.log(this.$route.params.id.split(/&/)[0],'-BB-updated()--this.$route.params.id-------')
          //console.log(this.$route.params.id.split(/&/)[0].split(/=/)[1],'-BB-updated()--this.$route.params.id-------')

          //console.log(document.querySelector('.filter>a:first-child'),'-BB-updated()--this.$route.params.id-------')
          //console.log(document.querySelectorAll('.filter>a')[0].getAttribute('href').split(/=/)[1],'-BB-updated()--this.$route.params.id-------')

          for(var i=0;i<document.querySelectorAll('.filter>a').length;i++){
            if(document.querySelectorAll('.filter>a')[i].getAttribute('href').split(/=/)[1]==this.$route.params.id.split(/&/)[0].split(/=/)[1]){
                document.querySelectorAll('.filter>a')[i].children[0].classList.add('active');
            }
          }


          if(this.$route.params.id.split(/&/)[0].match(/,/i)){
            this.Active(document.querySelectorAll('.filter>a')[0].children[0]);
          }

          if(this.$route.params.id.match(/idB/i) ){
            var id=this.$route.params.id.split(/&/)[1].replace(/^idB=/,'');
            this.$refs.BB_ListMain.ajaxMain(id);  // 调用子组件的方法

          }
        },

        data(){
          return {
              filterdata:[]
          }
        }
    }
</script>


<style scoped>
    .BB{  height: 100%;
         overflow: hidden;
    padding-bottom: 100px;}
    .main{
        height: 100%;
        /* padding-bottom: 50px; */
        overflow: auto;
    }
    .filter{
      height: 65px;width: 100%;
      padding: 10px;
        display: flex;justify-content: space-around;
        align-items: center;
        background: #390C20;;
    }

    .filter a{
        font-size: 16px;font-weight: 700;
        color: white;
    }

    .active{
        color: #9dc819 !important;
    }


</style>
