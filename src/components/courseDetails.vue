<template>
	<div class="container">
		<!--视频播放-->
		<!--<ali-player ref="aliplayer"></ali-player>-->
		<div class="player">
			<div class="prism-player" id="player-con"></div>
		    <div class="play_end" v-show="show4">
		    	<div class="btn replay">重新播放</div>
		    	<div class="btn" @click="openApp()">打开App 观看高清完整版</div>
		    </div>
		</div>
		<!--老师介绍-->
		<div class="introduce">
			<div class="top">
				<div class="title">{{packageDetail.name}}</div>
				<p @click="showPopup"><span>简介</span>
					<svg-icon name="ic_go_grey_s" size="17"></svg-icon>
				</p>
			</div>
			<div class="detail">
				<div class="head-portrait">
					<img :src="teacher.avatar" alt="" />
				</div>
				<div class="content">
					<div class="name">
						{{teacher.name}} <span>{{course.followNum}}人关注</span>
					</div>
					<div class="description1" v-show="fold">{{teacher.comments}}</div>
					<div class="description2" v-show="!fold">{{teacher.comments}}</div>
					<div class="btn open" @click="open" v-show="fold">展开</div>
					<div class="btn close" @click="close" v-show="!fold">收起</div>
				</div>
			</div>
		</div>
		<!--vip特权-->
		<div class="vip">
			<ul>
				<li>
					<div class="icon">
						<svg-icon name="ic_vip_1" size="41.5"></svg-icon>
					</div>
					<div class="text">
						<p class="p1">超清课程直通车</p>
						<p class="p2">4000集课程随心学</p>
					</div>
				</li>
				<li>
					<div class="icon">
						<svg-icon name="ic_vip_2" size="41.5"></svg-icon>
					</div>
					<div class="text">
						<p class="p1">参与邀请赚赏金</p>
						<p class="p2">100元起可提现微信</p>
					</div>
				</li>
				<li>
					<div class="icon">
						<svg-icon name="ic_vip_3" size="41.5"></svg-icon>
					</div>
					<div class="text">
						<p class="p1">名师指导学习</p>
						<p class="p2">一对一点评作品</p>
					</div>
				</li>
				<li>
					<div class="icon">
						<svg-icon name="ic_vip_4" size="41.5"></svg-icon>
					</div>
					<div class="text">
						<p class="p1">最新课程自动解锁</p>
						<p class="p2">每年上新千余集</p>
					</div>
				</li>
			</ul>
		</div>
		<!--广告-->
		<div class="ad" v-show="adList && adList.length > 0">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide ad-content" v-for="ad in adList">
						<a :href="ad.linkUrl">
							<img :src="ad.image" alt="" />
						</a>
					</div>
				</div>
				<!-- 如果需要分页器 -->
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<!--课程目录-->
		<div class="catalog">
			<div class="title-common">
				<h3><span></span><p>课程目录({{linkListAll.vodeoListCount}}节)</p></h3>
			</div>
			<div class="content">
				<ul>
					<li :class="{ 'active': item.selected }" v-for="item in linkList" @click="coursePlay(item,'1')">
						<div class="catalog-name">
							<h4>{{item.name}}</h4>
							<p><span>时长：{{item.duration | sec_to_time}}</span><span>{{item.playtimes}}人已学习</span></p>
						</div>
						<div class="free" v-show="item.isfree">免费</div>
					</li>
				</ul>
			</div>
			<div class="btn">
				<p @click="showPopup1">查看全部</p>
			</div>
		</div>
		<!--课程推荐-->
		<div class="recommend" v-show="rcList && rcList.length > 0">
			<div class="title-common">
				<h3><span></span><p>超推荐！这些课程你肯定也喜欢</p></h3>
			</div>
			<div class="content">
				<ul>
					<li v-for="item in rcList" @click="switchCourses(item,1)">
						<div class="picture">
							<svg-icon name="empty_video" width="133" height="75" v-show="!item.imageAddress"></svg-icon>
							<img :src="item.imageAddress" v-show="item.imageAddress" alt="" />
							<div class="mask">{{item.playTimes}}人已学习</div>
						</div>
						<div class="title">{{item.name}}</div>
					</li>
				</ul>
			</div>
		</div>
		<!--新课推荐-->
		<div class="new-course" v-show="newestList && newestList.length > 0">
			<div class="title-common">
				<h3><span></span><p>新课来啦！赶快跟着名师学起来</p></h3>
			</div>
			<div class="content">
				<ul>
					<li v-for="(item,index) in newestList" @click="switchCourses(item,2)">
						<div class="picture">
							<svg-icon name="empty_video" width="133" height="75" v-show="!item.picture"></svg-icon>
							<img :src="item.picture" v-show="item.picture" alt="" />
							<div class="mask">{{item.count}}人已学习</div>
						</div>
						<div class="text">
							<div class="title">{{item.seriesName}}</div>
							<div class="author">{{item.teacherName}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!--评论-->
		<div class="comment">
			<div class="title-common">
				<h3><span></span><p>评论({{course.commentCount}})</p></h3>
			</div>
			<div class="content">
				<ul>
					<li class="active" v-for="(item,index) in commentsList" v-show="index < 5">
						<div class="head-portrait">
							<img :src="item.parentavatar" alt=""  v-if="item.parentavatar"/>
							<svg-icon name="empty_profile" size="42" v-else></svg-icon>
						</div>
						<div class="comment-details">
							<div class="commentator">
								<div>
									<div class="name">{{item.nickName}}</div>
									<div class="date">{{item.parentcreatetime | timeFormat('yyyy.mm.dd')}}</div>
								</div>
								<div class="reply" @click="tips">
									<svg-icon name="ic_comment_grey_s" size="21"></svg-icon><span>{{item.replyedlist.length}}</span>
								</div>
							</div>
							<div class="comment-content">{{item.parentcontent}}</div>
							<div class="reply-content" v-show="item.replyedlist.length > 0">
								<p v-for="(reply,index) in item.replyedlist" v-show="index < 3"><span class="name">{{reply.nickName}}：</span>{{reply.content}}</p>
								<div class="more" @click="tips" v-if="item.replyedlist.length > 3">查看全部{{item.replyedlist.length}}条回复 ></div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="go-app">
				<div class="btn" @click="openApp()">打开仁美大学堂APP，查看全部精彩评论</div>
			</div>
			<!--全部课程弹出层-->
			<van-popup v-model="show1" position="bottom" :style="{ height: '65%' }">
				<div class="catalog">
					<div class="pop-title">
						<h3>全部课程</h3>
						<span @click="closePopup1"><svg-icon  name="icon_close_notice" size="33"></svg-icon></span>
					</div>
					<div class="content all">
						<ul>
							<li :class="{ 'active': item.selected }" v-for="item in linkListAll.vodeoList" @click="coursePlay(item,'2')" >
								<div class="catalog-name">
									<h4>{{item.name}}</h4>
									<p><span>时长：{{item.duration | sec_to_time}}</span><span>{{item.playtimes}}人已学习</span></p>
								</div>
								<div class="free" v-show="item.isfree">免费</div>
							</li>
						</ul>
					</div>
				</div>
			</van-popup>
		</div>
		<div class="bottom">
			<div class="line">
				<img src="../assets/shadow_vip_bar.png"/>
			</div>
			<div class="share">
				<div class="btn" @click="shareTips()">
					<svg-icon name="ic_share_wechat_s" size="21"></svg-icon><span>分享给好友</span>
					<div id="father" @click="handleHtml($event)">
						<div v-html="sharecomments"></div>
					</div>
				</div>
				<div class="btn" @click="openApp()">
					<svg-icon name="ic_rmicon_s" size="21"></svg-icon><span>App内打开</span>
				</div>
			</div>
		</div>
		<!--简介弹出层-->
		<van-popup v-model="show" position="bottom" :style="{ height: '65%' }">
			<div class="course-introduce">
				<div class="pop-title">
					<div class="tab">
						<h3 :class="{'active': tabId == 1}" @click="switchTab(1)">课程简介</h3><h3 :class="{'active': tabId == 2}" @click="switchTab(2)">本集简介</h3>
					</div>
					<span @click="closePopup"><svg-icon  name="icon_close_notice" size="33"></svg-icon></span>
				</div>
				<!--课程简介-->
				<div class="course-introduce-con" v-show="tabId == 1">
					<div class="title">{{packageDetail.name}}</div>
					<div class="comments" v-html="packageDetail.introduction"></div>
					<div class="picture">
						<img :src="packageDetail.picture" alt="" />
					</div>
				</div>
				<!--本集简介-->
				<div class="course-introduce-con" v-show="tabId == 2">
					<div class="title">{{courseDetail.name}}</div>
					<div class="num">{{courseDetail.playtimes}}人已学习</div>
					<div class="key-word">
						<span v-for="item in keywords">{{item}}</span>
					</div>
					<div class="comments" v-html="courseDetail.comments"></div>
					<div class="picture">
						<img :src="courseDetail.imageaddress" alt="" />
					</div>
				</div>
			</div>
		</van-popup>
		<!--试看结束弹出层-->
		<div class="popup" v-show="show3">
			<div class="popup-con">
				<h3>试看结束</h3>
				<div class="text">付费课程当前仅提供2分钟试看，完整版请打开仁美大学堂App观看。</div>
				<div class="btn-group">
					<div class="btn open" id="open_app">打开</div>
					<div class="btn cancel" id="cancel">取消</div>
				</div>
			</div>
		</div>
		<!--loading组件-->
		<loading v-show="isLoading"></loading>
		<!--微信分享遮罩-->
		<div class="weixin-tip" v-show="show2">
			<div class="weixin-tip-top">
				<svg-icon name="img_tips" width="350" height="214"></svg-icon>
			</div>
			<div class="weixin-tip-bottom" @click="closeTips()">
				<svg-icon name="btn_ok_tips" width="188" height="67"></svg-icon>
			</div>
		</div>
	</div>
</template>

<script>
	import aliPlayer from '@/components/aliPlayer'
	import svgIcon from '@/components/svg'
	import loading from '@/components/loading'
	import { apiCourseDetail } from '@/request/api'
	import { apiAllCourse } from '@/request/api'
	import { apiCoursePagebage } from '@/request/api'
	import { apiDetail } from '@/request/api'
	import { apiAddOpenShare } from '@/request/api'
	import { apiAdvertiseEntity } from '@/request/api'
	import Swiper from 'swiper'
	import * as wechatJS from '@/common/wechat'
	import secret from "@/secret/index"
	import store from '@/store/index'
	export default {
		name: 'in-video',
		components: {
			'ali-player': aliPlayer,
			'svg-icon': svgIcon,
			'loading': loading
		},
		data: function() {
			return {
				fold: true, //作者简介折叠
				show: false, //课程简介
				show1: false, //全部课程包
				show2: false, //微信分享遮罩
				show3: false, //课程试看结束提示
				show4: false, //课程播放结束提示
				courseIndex: 0, //当前选中的课程
				tabId: 1,//课程简介切换Id
				course: {}, //页面课程列表
				teacher: {}, //老师简介
				adList: [], //广告列表
				linkList: [], //课程包
				linkListAll: {}, //全部课程包
				packageDetail: {},//课程包简介
				rcList: [], //推荐课程列表
				newestList: [],//最新课程包
				commentsList: [], //评论列表
				videoActive: {}, //当前视频
				courseDetail: {}, //页面课程详情
				keywords: [], //课程关键词
				trytime: 120,//试看时间
				player: {}, //播放器
				mySwiper: {}, //轮播
				sharecomments: '',//微信分享内容
			}
		},
		computed:{
		    isLoading: function() {
		    	return store.state.isShow;
		    }
	    },
		methods:  {
			// 获取数据
			onLoad(id,packageId) {
				let _this = this;
				//获取h5页面课程详情列表
				apiCourseDetail({
					'id': id,
					'packageId': packageId
				}).then(
					res => {
						_this.course = res.object;
						_this.videoActive = res.object.video;
						_this.teacher = res.object.teacher;
						_this.commentsList = res.object.commentsLists;
						_this.rcList = res.object.recommendCourseList;
						_this.linkList = res.object.linkListVideos;
						_this.sharecomments = _this.videoActive.comments.replace(/<.+?>/g, '');
						_this.wxShare();
						//判断是否免费
						if(_this.videoActive.isfree) {
							_this.trytime = 0;
						} else {
							_this.trytime = 120;
						}
						//微信可以看
						if(_this.isWeixinBrowser()) {
							_this.alvideo(_this.course.videoAddress,_this.videoActive.imageaddress,_this.trytime);
						} else {
							_this.$toast('请在微信或仁美大学堂APP观看该视频');
						}
					},
					err => {
						console.log(err);
					});
				//获取全部课程
				apiAllCourse({
					'id': id,
					'packageId': packageId
				}).then(
					res => {
					  console.log(res)
						_this.linkListAll = res.object;
            _this.linkListAll.vodeoList.forEach((item,index) => {
              _this.linkList.forEach((tem,inde) =>{
                if(tem.id == item.id && tem.selected) {
                  _this.linkListAll.vodeoList[index].selected = true;
                }
              })

            })
						_this.packageDetail = res.object.vodeoPackageName;
					},
					err => {
						console.log(err);
					});
				//h5最新上架的课程包
				apiCoursePagebage().then(
					res => {
						_this.newestList = res.object;
					},
					err => {
						console.log(err);
					});
				//h5视频课程详情
				apiDetail({'id': id}).then(
					res => {
						_this.courseDetail = res.object;
						if(_this.courseDetail.keyword.indexOf("、") != -1) {
							_this.keywords = _this.courseDetail.keyword.split("、");
						}
						if(_this.courseDetail.keyword.indexOf(",") != -1) {
							_this.keywords = _this.courseDetail.keyword.split(",");
						}
					},
					err => {
						console.log(err);
					});
				//h5广告
				apiAdvertiseEntity({'module': 5}).then(
					res => {
						_this.adList = res.object;
						_this.$nextTick(() => {
							_this.initSwiper(); // swiper重新初始化
						})
					},
					err => {
						console.log(err);
					});
				//浏览次数统计
				apiAddOpenShare({'videoId': id}).then(
					res => {

					},
					err => {
						console.log(err);
					});
			},
			//播放选中课程
			coursePlay(data,type) {
			  console.log(data);
				this.scrollTop();
				//详情页三节课点播
				let indexId;
				this.linkList.forEach((item,index) => {
					item.selected = false;
					if(data == item) {
						indexId = index;
					}
				})
				//课程包点播
				this.linkListAll.vodeoList.forEach((item,index) => {
					item.selected = false;
					if(data == item) {
						indexId = index;
					}
				})
				if(indexId <= 2) {
					this.linkList[indexId].selected = true;
				}
				console.log(indexId)
				this.videoActive = data;
				if(type == '1' ){
          this.linkListAll.vodeoList.forEach((item,index)=>{
            if(item.id == data.id && data.selected){
              this.linkListAll.vodeoList[index].selected = true;
            }
          })
        }else {
          this.linkListAll.vodeoList[indexId].selected = true;
        }
//				data.selected = true;
				//判断是否免费
				if(data.isfree) {
					this.trytime = 0;
				} else {
					this.trytime = 120;
				}
				//微信可以看
				if(this.isWeixinBrowser()) {
					this.player.dispose();//销毁
					this.alvideo(data.videoaddress,data.imageaddress,this.trytime);
				} else {
					this.$toast('请在微信或仁美大学堂APP观看该视频');
				};
        let packageId = this.$route.query.packageId;
        //this.onLoad(data.id,packageId);

        let _this = this;
        //获取h5页面课程详情列表
        apiCourseDetail({
          'id': data.id,
          'packageId': packageId
        }).then(
          res => {
            _this.course = res.object;
            _this.videoActive = res.object.video;
            _this.teacher = res.object.teacher;
            _this.commentsList = res.object.commentsLists;
            _this.rcList = res.object.recommendCourseList;
            _this.linkList = res.object.linkListVideos;
            _this.sharecomments = _this.videoActive.comments.replace(/<.+?>/g, '');
            _this.wxShare();
            //判断是否免费
            if(_this.videoActive.isfree) {
              _this.trytime = 0;
            } else {
              _this.trytime = 120;
            }
            //微信可以看
            if(_this.isWeixinBrowser()) {
              _this.alvideo(_this.course.videoAddress,_this.videoActive.imageaddress,_this.trytime);
            } else {
              _this.$toast('请在微信或仁美大学堂APP观看该视频');
            }
          },
          err => {
            console.log(err);
          });
      },
			initSwiper() {
				this.mySwiper = new Swiper('.swiper-container', {
					autoplay: true,
					loop: false,
					// 如果需要分页器
					pagination: '.swiper-pagination',
					// 如果需要前进后退按钮
					//nextButton: '.swiper-button-next',
					//prevButton: '.swiper-button-prev',
					// 如果需要滚动条
					//scrollbar: '.swiper-scrollbar',
					observer:true,
				})
			},
			//阿里云播放视频
			alvideo(videourl, imgurl, time) {
				let _this = this;
				let ld = secret.DeCodeUrl(videourl).split(",")[0];//普清
				let hd = ld.replace('ld.mp4','hd.mp4');	//高清
				let fhd = ld.replace('ld.mp4','fhd.mp4'); //超清
				_this.player = new Aliplayer({
					id: "player-con",
	//				source: ld,
					source: JSON.stringify({
            LD: ld,
						SD: hd,
            HD: fhd,
				    }),
					qualitySort: "asc", //指定排序方式，desc表示按倒序排序（即：从大到小排序），asc表示按正序排序（即：从小到大排序）默认值：‘asc’
					definition: "LD,SD,HD", //显示视频清晰度，多个用逗号分隔，比如：’FD,LD’，此值是vid对应流清晰度的一个子集，取值范围：FD（流畅）LD（标清）SD（高清）HD（超清）OD（原画）2K（2K）4K（4K）
          defaultDefinition:"LD",//默认播放视频清晰度
					cover: imgurl,
					width: "100%",
					height: "100%",
					autoplay: false,
					isLive: false,
					rePlay: false,
					playsinline: true,
					preload: true,
					controlBarVisibility: "click",
					showBarTime: 10000,
					useH5Prism: true,
					components: [
						{ //清晰度
					      name: 'QualityComponent',
					      type: AliPlayerComponent.QualityComponent
					    },{//试看
					      name: 'PreviewVodComponent',
					      type: AliPlayerComponent.PreviewVodComponent,
					      args: [time,'','打开APP可观看完整视频']
   						 }
					],
//					"x5_type": "h5",
//					"x5_fullscreen": true,
//					"x5_video_position": "top",
//					"x5_orientation": "portrait",
					"skinLayout": [{
							"name": "bigPlayButton",
							"align": "cc",
						},
						{
							"name": "H5Loading",
							"align": "cc"
						},
						{
							"name": "errorDisplay",
							"align": "tlabs",
							"x": 0,
							"y": 0
						},
						{
							"name": "infoDisplay"
						},
						{
							"name": "tooltip",
							"align": "blabs",
							"x": 0,
							"y": 56
						},
						{
							"name": "thumbnail"
						},
						{
							"name": "controlBar",
							"align": "blabs",
							"x": 0,
							"y": 0,
							"children": [{
									"name": "progress",
									"align": "blabs",
									"x": 0,
									"y": 44
								},
								{
									"name": "playButton",
									"align": "tl",
									"x": 5,
									"y": 12
								},
								{
									"name": "timeDisplay",
									"align": "tl",
									"x": 5,
									"y": 7
								},
								{
									"name": "fullScreenButton",
									"align": "tr",
									"x": 5,
									"y": 12
								},
							]
						}
					]
				}, function(player) {
					console.log("The player is created");
					//设置清晰度
					player.on('sourceloaded', function(params) {
					    var paramData = params.paramData
					    var desc = paramData.desc
					    var definition = paramData.definition
					    player.getComponent('QualityComponent').setCurrentQuality(desc, definition)
				    })
					//试看结束后监听点击事件
					var open_app = document.querySelector('#open_app')
				    open_app.addEventListener('click', function() {
				        _this.openApp();
				    });
				    var replay = document.querySelector('.replay')
				    replay.addEventListener('click', function() {
				    	_this.show4 = false;
				        player.replay();
				    });
				    var cancel = document.querySelector('#cancel')
				    cancel.addEventListener('click', function() {
				    	player.getComponent('PreviewVodComponent').closePreviewLayer();
				    	player.seek(0);
				    	_this.show3 = false;
			        })
				    //视频播放结束时
				    player.on('ended', function(params) {
				    	_this.show4 = true;
				    	//判断是否免费
						if(!_this.videoActive.isfree) {
							_this.show3 = true;
						}
				    })
				});
			},
			//简介切换
			switchTab(id) {
				this.tabId = id;
			},
			open() {
				this.fold = false;
			},
			close() {
				this.fold = true;
			},
			showPopup() {
				this.show = !this.show;
			},
			closePopup() {
				this.show = false;
			},
			showPopup1() {
				this.show1 = true;
			},
			closePopup1() {
				this.show1 = false;
			},
			tips() {
				this.$toast('请打开仁美大学堂APP');
			},
			//课程包切换
			switchCourses(data,index) {
				this.mySwiper.destroy(false,true);
				this.scrollTop();
				if(this.isWeixinBrowser()) {
					this.player.dispose();//销毁
				}
				if(index == 1) {
					this.$router.push({path:'/?id='+ data.id + '&packageId=' + data.goodsid});
					this.onLoad(data.id,data.goodsid);
				} else {
					this.$router.push({path:'/?id='+ data.id + '&packageId=' + data.packageId});
					this.onLoad(data.id,data.packageId);
				}
			},
			//H5中打开APP
			openApp() {
				let ua = navigator.userAgent.toLowerCase();
		        //Android终端
		        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
		 　　     //Ios终端
		        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		        //微信中
		        if (this.isWeixinBrowser()) {
		        	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		                //Ios
		                window.location.href = "https://itunes.apple.com/us/app/%E4%BB%81%E7%BE%8E%E5%A4%A7%E8%AF%BE%E5%A0%82/id1222211662"
		            } else if (/(Android)/i.test(navigator.userAgent)) {
		                //Android终端
		                window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.zkhz.www.renmei"
		            }
		        } else {
		        	//浏览器中
		            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		               //Ios
		               window.location.href = "https://itunes.apple.com/us/app/%E4%BB%81%E7%BE%8E%E5%A4%A7%E8%AF%BE%E5%A0%82/id1222211662"
		            } else if (/(Android)/i.test(navigator.userAgent)) {
		            	//Android终端
		                window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.zkhz.www.renmei"
		            }
		        }

			},
			scrollTop() {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			},
			//判断是否为微信浏览器
			isWeixinBrowser() {
				let ua = navigator.userAgent.toLowerCase();
	            return (/micromessenger/.test(ua)) ? true : false;
	        },
			//WX分享遮罩
			shareTips() {
				this.show2 = true;
			},
			//WX分享
			wxShare() {
				let _param = {
				    url: location.href.split('#')[0], // 当前页面url
				    title: this.videoActive.name,  // 分享数据配置
				    desc: this.sharecomments, // 分享数据配置
				    link: window.location.href, // 分享数据配置
				    imgUrl: this.videoActive.imageaddress, // 分享数据配置  －－ 全路径
				    type: "link", // 分享类型,music、video或link，不填默认为link
				    dataUrl: " ", // 如果type是music或video，则要提供数据链接，默认为空
				}
				wechatJS.wxChatShare(_param)
			},
			handleHtml($event){
				this.sharecomments = $event.target.textContent;
				this.wxShare();
		　　},
			//关闭提示
			closeTips() {
				this.show2 = false;
			}

		},
		mounted() {
//			//屏蔽鼠标右键
//			document.oncontextmenu = function(e) {
//			    var e = e || window.event;
//			    e.returnValue = false;
//			    return false;
//			}
//			//屏蔽F12
//			document.onkeydown = document.onkeyup = document.onkeypress = function(event) {
//			    var e = event || window.event || arguments.callee.caller.arguments[0];
//
//			    if (e && e.keyCode == 123) {
//		            e.returnValue = false;
//		            return (false);
//			    }
//			}
		},
		created() {
			let id = this.$route.query.id
			let packageId = this.$route.query.packageId
			this.onLoad(id,packageId);
		},
		beforeDestroy() {
			this.mySwiper.destroy(false,true);
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		overflow: auto;
		$size: 13px;
		$black: #333;
		$gray: #999;
		font-family: Arial;
		font-size: $size;
		.player {
			position: relative;
			width: 100%;
			height: 4.22rem;
			overflow: hidden;
			background: #000;
			.play_end {
				position: absolute;
				left: 0;
				top: 0;
				display: flex;
			    width: 100%;
			    height: 100%;
			    justify-content: center;
			    align-items: center;
			    background: rgba(0,0,0,.8);
			    z-index: 9999;
			    .btn {
					padding: 8px 20px;
					background: #FF6666;
					font-size: 13px;
					color: #fff;
					border-radius: 19px;
					&.replay {
						margin-right: 13px;
						background: #666666;
					}
				}
			}
		}
		.title-common {
			width: 100%;
			height: 38px;
			padding: 8px 0;
			background: #FFFFFF;
			h3 {
				display: flex;
				align-items: center;
				span {
					display: block;
					width: 4px;
					height: $size;
					background: #FF6666;
				}
				p {
					padding-left: 6px;
					height: 20px;
					font-size: 15px;
					font-weight: bold;
					line-height: 21px;
					color: $black;
				}
			}
		}
		.introduce {
			width: 100%;
			padding: 10px;
			padding-left: 17px;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 22px;
				line-height: 21px;
				.title {
					font-size: 17px;
					font-weight: bold;
					color: $black;
				}
				p {
					font-size: $size;
					font-weight: 400;
					color: rgba(170, 170, 170, 1);
				}
			}
			.detail {
				display: flex;
				width: 100%;
				padding: 8px 0;
				.head-portrait {
					width: 50px;
					height: 50px;
					background: rgb(0, 0, 0);
					border-radius: 50%;
					margin-right: 8px;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.content {
					flex: 1;
					.name {
						height: 20px;
						font-size: 15px;
						font-weight: bold;
						line-height: 21px;
						color: $black;
						span {
							height: 17px;
							margin-left: 8px;
							font-size: $size;
							font-weight: 400;
							line-height: 21px;
							color: $gray;
						}
					}
					.description1 {
						width: 100%;
						margin-top: 4px;
						font-size: $size;
						font-weight: 400;
						line-height: 17px;
						color: $gray;
						height: 50px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}
					.description2 {
						width: 100%;
						margin-top: 4px;
						font-size: $size;
						font-weight: 400;
						line-height: 17px;
						color: $gray;
					}
					.btn {
						height: 17px;
						margin-top: 4px;
						text-align: right;
						font-size: $size;
						font-weight: bold;
						line-height: 21px;
						color: $black;
						opacity: 1;
					}
				}
			}
		}
		.vip {
			width: 100%;
			height: 67px;
			background: rgba(255, 245, 230, 1);
			overflow-x: scroll;
			overflow-y: hidden;
			ul {
				display: flex;
				justify-content: space-between;
				width: 500px;
				padding: $size 17px;
				li {
					display: flex;
					width: 170px;
					.icon {
						width: 42px;
						height: 42px;
						margin-right: 6px;
					}
					.text {
						width: 120px;
						.p1 {
							height: 17px;
							margin-top: 3px;
							font-size: $size;
							font-weight: bold;
							line-height: 21px;
							color: rgba(146, 112, 61, 1);
						}
						.p2 {
							height: 16px;
							margin-top: 4px;
							font-size: 11px;
							font-weight: 400;
							line-height: 21px;
							color: rgba(196, 162, 111, 1);
						}
					}
				}
			}
		}
		.ad {
			width: 100%;
			height: 67px;
			.ad-content {
				width: 100%;
				height: 67px;
				a {
					width: 100%;
					height: 100%;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.catalog {
			.content {
				&.all {
					height: 7.8rem;
					overflow-y: auto;
				}
				ul {
					li {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 100%;
						height: 67px;
						padding: $size 17px;
						background: #FFFFFF;
						&.active {
							background: linear-gradient(270deg, rgba(255, 102, 102, 0.15) 0%, rgba(255, 102, 102, 0) 100%);
							.catalog-name {
								h4 {
									color: #FF6666;
								}
							}
						}
						.catalog-name {
							width: 300px;
							h4 {
								font-size: 15px;
								font-weight: bold;
								line-height: 20px;
								color: $black;
							}
							p {
								height: 17px;
								margin-top: 4px;
								font-size: $size;
								font-weight: 400;
								line-height: 17px;
								color: #AAAAAA;
								opacity: 1;
								span {
									margin-right: 15px;
								}
							}
						}
						.free {
							width: 38px;
							height: 21px;
							background: rgba(255, 102, 102, 1);
							border-radius: 10px;
							font-size: $size;
							font-weight: 400;
							text-align: center;
							line-height: 21px;
							color: #FFFFFF;
						}
					}
				}
			}
			.btn {
				width: 100%;
				height: 42px;
				padding: 0 8px;
				p {
					text-align: center;
					line-height: 42px;
					background: rgba(244, 245, 247, 1);
					border-radius: 21px;
					font-size: 15px;
					font-family: Arial;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			}
		}
		.recommend {
			padding-top: $size;
			.content {
				width: 100%;
				height: 130px;
				overflow-x: scroll;
				overflow-y: hidden;
				ul {
					display: flex;
					width: 500px;
					li {
						width: 150px;
						padding-left: 17px;
						.picture {
							position: relative;
							width: 133px;
							height: 75px;
							img {
								width: 100%;
								height: 100%;
							}
							.mask {
								position: absolute;
								left: 0;
								bottom: 0;
								width: 133px;
								height: 17px;
								padding-left: 4px;
								background: rgba(0, 0, 0, 0.2);
								border-radius: 0px 0px 4px 4px;
								font-size: 10px;
								font-weight: 400;
								line-height: 17px;
								color: #FFFFFF;
							}
						}
						.title {
							width: 133px;
							height: 33px;
							margin-top: 4px;
							font-size: $size;
							font-weight: 400;
							line-height: 17px;
							color: $black;
						}
					}
				}
			}
		}
		.new-course {
			padding-top: 8px;
			.content {
				width: 100%;
				height: 264px;
				overflow: scroll;
				ul {
					display: flex;
					flex-wrap: wrap;
					width: 692px;
					li {
						display: flex;
						justify-content: space-between;
						width: 346px;
						height: 88px;
						padding-left: 17px;
						.picture {
							position: relative;
							width: 133px;
							height: 75px;
							img {
								width: 100%;
								height: 100%;
							}
							.mask {
								position: absolute;
								left: 0;
								bottom: 0;
								width: 133px;
								height: 17px;
								padding-left: 4px;
								background: rgba(0, 0, 0, 0.2);
								border-radius: 0px 0px 4px 4px;
								font-size: 10px;
								font-weight: 400;
								line-height: 17px;
								color: #FFFFFF;
							}
						}
						.text {
							width: 183px;
							.title {
								padding-top: 8px;
								font-size: $size;
								font-weight: bold;
								line-height: 19px;
								color: $black;
							}
							.author {
								padding-top: 4px;
								font-size: $size;
								font-weight: 400;
								line-height: 21px;
								color: #AAAAAA;
							}
						}
					}
				}
			}
		}
		.comment {
			padding-top: 8px;
			.content {
				ul {
					li {
						display: flex;
						width: 100%;
						padding: 17px;
						&.active {
							.comment-details {
								.comment-content {
									margin-top: 10px;
									line-height: 23px;
									color: $black;
								}
							}
						}
						.head-portrait {
							width: 42px;
							height: 42px;
							border-radius: 50%;
							overflow: hidden;
							margin-right: $size;
							img {
								width: 100%;
							}
						}
						.comment-details {
							flex: 1;
							.commentator {
								display: flex;
								justify-content: space-between;
								align-items: center;
								.name {
									height: 20px;
									font-size: 15px;
									font-weight: 400;
									line-height: 20px;
									color: #5D6991;
								}
								.date {
									margin-top: 4px;
									height: 15px;
									font-size: $size;
									font-weight: 400;
									line-height: 15px;
									color: #AAAAAA;
								}
								.reply {
									display: flex;
									align-items: center;
									height: 21px;
									span {
										margin-left: 2px;
										font-size: $size;
										font-weight: 400;
										color: #AAAAAA;
									}
								}
							}
							.comment-content {
								margin-top: 7px;
								font-size: 15px;
								font-weight: 400;
								line-height: 21px;
								color: #666;
								word-break:break-all;
								word-wrap:break-word;
							}
							.reply-content {
								margin-top: 8px;
								padding: $size;
								background: #F4F5F7;
								p {
									margin-bottom: 8px;
									font-size: $size;
									font-weight: 400;
									line-height: 19px;
									color: #666666;
									text-align: justify;
									word-break:break-all;
									word-wrap:break-word;
									.name {
										color: #5D6991;
									}
								}
								.more {
									font-size: $size;
									font-weight: 400;
									line-height: 21px;
									color: #5D6991;
								}
							}
						}
					}
				}
			}
			.go-app {
				padding: 17px;
				padding-bottom: 92px;
				.btn {
					width: 100%;
					height: 42px;
					background: rgba(255, 255, 255, 1);
					border: 1px solid rgba(255, 102, 102, 1);
					border-radius: 21px;
					text-align: center;
					line-height: 42px;
					font-size: 15px;
					font-weight: 400;
					color: #FF6666;
				}
			}
		}
		.bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			z-index: 999;
			.line {
				width: 100%;
				height: 17px;
				overflow: hidden;
				img {
					width: 100%;
				}
			}
			.share {
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 58px;
				padding: 8px;
				background: #F4F5F7;
				/*opacity: 0.9;*/
				.btn {
					width: 3.5rem;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 42px;
					background: #FFFFFF;
					border-radius: 4px;
					span {
						margin-left: 6px;
						font-size: 15px;
						font-weight: 400;
						color: $black;
					}
				}
			}
		}
		.pop-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 5px 0 17px;
			height: 0.88rem;
			line-height: 0.88rem;
			span {
				display: flex;
				align-items: center;
			}
		}
		.course-introduce {
			.pop-title {
				border-bottom: 1px solid #ddd;
				.tab {
					display: flex;
					h3 {
						width:75px;
						height:25px;
						margin-right: 20px;
						color: #999;
						text-align: center;
						line-height: 25px;
						background:#fff;
						border-radius:13px;
						&.active {
							color: #fff;
							background:#4F515B;
						}
					}
				}
			}
			.course-introduce-con {
				padding: 14px 17px;
				height: 390px;
    			overflow-y: scroll;
				.title {
					font-size:17px;
					font-weight:bold;
					line-height:21px;
					color:#333;
				}
				.num {
					padding-top: 6px;
					line-height:21px;
					font-size:13px;
					color: #AAA;
				}
				.key-word {
					display: flex;
					padding-top: 10px;
					span {
						padding: 2px 6px;
						margin-right: 6px;
						font-size:10px;
						color:#999;
						background: #F4F5F7;
						border-radius:9px;
						border:1px solid rgba(221,221,221,1);
					}
				}
				.comments {
					padding-top: 10px;
					font-size:13px;
					line-height:21px;
					color:rgba(170,170,170,1);
				}
				.picture {
					padding-top: 12px;
					width:6.84rem;
					height:4.16rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.weixin-tip {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.9);
			z-index: 9999;
			.weixin-tip-top {
				text-align: center;
			}
			.weixin-tip-bottom {
				position: absolute;
				left: 50%;
				margin-left: -94px;
				bottom: 70px;
			}
		}
		.popup {
			position: fixed;
			width: 100%;
			height: 100%;
		    left: 0;
		    top: 0;
			background:rgba(0,0,0,0.4);
			z-index: 9999;
			.popup-con {
				position: absolute;
				left: 50%;
				/*top: 50%;*/
				top: 4.22rem;;
				width: 268px;
				height: 216px;
				margin-left: -134px;
				/*margin-top: -100px;*/
				padding: 0 33px;
				background:#fff;
				 border-radius: 4px;
				h3 {
					padding: 30px 0;
					font-size: 21px;
					font-weight: bold;
					line-height: 24px;
					color: rgba(79, 81, 91, 1);
				}
				.text {
					height: 65px;
					font-size: 15px;
					line-height: 22px;
					color: #333;
				}
				.btn-group {
					display: flex;
					flex-flow: row-reverse;
					padding: 15px 0;
					.btn {
						width: 63px;
						height: 36px;
						line-height: 36px;
						text-align: center;
						font-size: 15px;
						font-weight: bold;
						color: #4F515B;
						&.open {
							color: #FF6666;
						}
					}
				}
			}
		}
		#father {
			position: absolute;
			width: 3.5rem;
			height: 42px;
			opacity: 0;
			word-break:break-all;
			word-wrap:break-word;
			overflow: hidden;
		}
	}
</style>
