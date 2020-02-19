<template>
	<div class="Article">
		<Head/>

		<!-- {{$route.params.id}} -->
			<div class="backbtn" @click="$router.back()">返回 ></div>
		<transition enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
    <div class="main" v-if="Articledata">

				<div class="box">
					<img v-if="Articledata.img_path" :src="Articledata.img_path"><!-- 图片 -->
					<h2 v-text="Articledata.title"></h2><!-- 文章标题 -->
          <div class="box_j">
            <div class='jiage'>￥{{Articledata.author}}</div><!-- 价格 -->
            <div class="jiaru">
              <i @click="gouwuche(Articledata.id,$event)" class="gou">加入购物车</i>
              <img :src="Articledata.img_path" class="AnimatImg"/>
            </div><!-- 文章内容 -->
          </div>

				</div>

		</div>
		<Loading v-else/>
		</transition>
<Pai/>



	</div>
</template>

<script>
	import Head from "@/components/Head.vue"
	import Foot from "@/components/Foot.vue"
	import Loading from "@/components/Loading"
  import Pai from "@/components/Pai";
	var ajax;
	export default {
    name:"Article",
		components:{Head,Foot,Loading,Pai},
		//updated(){console.log(this.Articledata,"======aaaaaaaaa==========")},
		created(){
			//http://localhost:8081/api/getText?id=文章的id号
			ajax=new XMLHttpRequest;
			ajax.open("get","/api/getText?id="+this.$route.params.id,true);//手机移动端
			//ajax.open("get","http://localhost:3456/api/getText?id="+this.$route.params.id,true);
			ajax.send();
			ajax.onreadystatechange=()=>{
				if(ajax.readyState==4&&ajax.status==200){
					var data=JSON.parse(ajax.responseText);

					this.Articledata=data;
					//console.log(this.Articledata,"=======================");
					//console.log(this.Articledata.img_path);
				}
				 //includes检测数组里的数据
				if(![200,304].includes(ajax.status)){
				    console.log("请求错误！！！");
				}
			}

		},
		data(){return {Articledata:null}}
	}
</script>

<style scoped>
	.Article{ height: 100%; }
	.main{/*让这个组件溢出，可以上下滑动，
	因为顶部head和底部foot是固定不动的*/
	    /* height: 100%; */
	    padding-bottom: 50px;
	    /* overflow: auto; */
	}
	.Head{margin-bottom: 10px;}
	.backbtn{color: white;
		font-size: 15px;
		background:#e6cfaa;
		padding: 6px 0;padding-left: 15px;
	}
	.box{padding: 15px 0;position: relative;}
	.box>img{width: 100%;}
	/* .box div{overflow: hidden;} */
  .box h2{padding:0  15px;margin-top: 15px;}
  .box_j{
    padding: 0 15px;margin-top: 15px;
    display: flex;justify-content: space-between;    align-items: center;
  }
	.jiage{
        color: #9dc819;margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
  }
  .gou{
    background-color: #390C20;
    color: white;    margin-right: 20px;
        padding: 8px 20px;
    font-size: 14px;
    border-radius: 5px;
    width: 100px;
    text-align: center;
  }

</style>
