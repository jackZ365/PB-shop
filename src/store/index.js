
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        theme:{
            whiteX:{
                head:{background:"white",color:"#888"},
                main:{background:"white",color:"#666"},
                foot:{background:"#eee",color:"#666",active:{color:"#e03b00 "}}
            },
            blackX:{
                head:{background:"#000",color:"white"},
                main:{background:"white",color:"#666"},
                foot:{background:"#000",color:"#fff",active:{color:"#e03b00 "}}
            },
            redX:{
                head:{background:"#f55",color:"white"},
                main:{background:"white",color:"#666"},
                foot:{background:"#f55",color:"#fff",active:{color:"#e03b00 "}}
            },
            orangeX:{
                head:{background:"orange",color:"white"},
                main:{background:"white",color:"#666"},
                foot:{background:"orange",color:"#fff",active:{color:"#e03b00 "}}
            }
        },
        cruntTheme:localStorage.getItem("cruntTheme")||'whiteX' ,//是当前选中的主题
		/* 页面重新打开，就用存储的颜色，要是第一次打开没有存储的，就用redX默认的颜色 */
    },
    getters:{
        Themeshead(state){
            return state.theme[state.cruntTheme].head;//state.theme['whiteX'];
        },
        Themesmain(state){
            return state.theme[state.cruntTheme].main;
        },
        Themesfoot(state){
            return state.theme[state.cruntTheme].foot;
        }
    },
	mutations:{
		changeTheme(state,arg){
			localStorage.setItem("cruntTheme",arg);//持久存储（数据名，数据值）
			state.cruntTheme=arg;
		}
	}

});
