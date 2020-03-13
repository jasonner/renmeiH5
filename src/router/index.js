import Vue from 'vue'
import Router from 'vue-router'
import courseDetails from '@/components/courseDetails'

Vue.use(Router)

export default new Router({
//	base:'/test/',   //测试
	base:'/course2021/', //生产
	mode: 'history',  //去掉url中的#
	routes: [
	    {
	      path: '/',
	      name: 'courseDetails',
	      component: courseDetails
	    }
	],
	scrollBehavior (to, from, savedPosition) {
	    // return 期望滚动到哪个的位置
	    return { x: 0, y: 0 }
	}
})
