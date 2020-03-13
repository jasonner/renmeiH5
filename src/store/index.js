import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//初始化数据
const state = {
  isShow: false
};
var vuexStore = new Vuex.Store({
  state
});
// 使用 export default 封装，让外部可以访问
export default vuexStore;
