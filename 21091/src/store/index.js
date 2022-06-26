import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";

Vue.use(Vuex)
/**
 * @description 存储持久化
 * @param {object} store vuex的对象
 */
const storePersist=(store)=>{
  const storage=window.sessionStorage; //存储对象
  const key ="MyVuexStorePersist";//存储的键
  
  const data=storage.getItem(key);
  data && store.replaceState(JSON.parse(data));

  // 当store初始化后调用
  store.subscribe((mutations,state)=>{
    // 每次mutation之后调用
    // mutation的格式为{type, payload}
    storage.setItem(key,JSON.stringify(state));
  });
}

export default new Vuex.Store({
  state: {
    /** 
     * 用户信息
    */ 
   user:{},
    /** 
     * 菜单列表
    */ 
   menus:[]
  },
  getters: {
    /**
     * token
     */
    token(state){
      return state.user.token;
    }
  },
  mutations: {
    /**
     * 设置用户信息
     */
    setUser(state,payload){
        state.user=payload;
    },
    /**
     * 设置菜单
     */
    setMenus(state,payload){
        state.menus=payload;
    }
  },
  actions: {
    /**
     * 退出
     */
    exit({commit}){
      commit("setUser",{});
      commit("setMenus",{});
      router.push({name:"login"});
    }
  },
  modules: {
  },
  plugins:[storePersist]
})
