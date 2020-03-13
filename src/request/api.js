/**   
 * api接口统一管理
 */
import { get, post } from './http'

export const apiCourseDetail = p => get('hfive/courseDetail', p);//h5页面课程详情列表
export const apiAllCourse = p => get('hfive/allCourse', p);//h5点击全部课程按钮显示下面所有课程
export const apiCoursePagebage = p => get('hfive/coursePagebage', p);//h5最新上架的课程包
export const apiDetail = p => get('hfive/detail', p);//h5视频课程详情
export const apiWxShare = p => post('activePush/publicShare', p);//微信二次分享
export const apiAddOpenShare = p => get('userOperator/addOpenShare', p);//页面被打开次数统计
export const apiAdvertiseEntity = p => get('api/advertiseEntity/get', p);//获取广告位


