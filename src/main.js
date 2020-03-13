// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from '@/request/http.js'
import '@/common/rem.js'
import '@/style/reset.css'
//import '@/style/common.css'
import 'vant/lib/index.css'
import 'swiper/css/swiper.css';
import { Popup, Toast, Loading} from 'vant'


import * as filters from '@/filters/index'
Vue.use(VueResource)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Loading)
Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
