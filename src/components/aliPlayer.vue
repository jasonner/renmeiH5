<template>
	<div class="video">
		<div class="prism-player" id="player-con"></div>
		<script type="text/template" id="endPreviewTemplate">
			<div class="popup-con">
				<h3>试看结束</h3>
				<div class="text">付费课程当前仅提供2分钟试看，完整版请打开仁美大学堂App观看。</div>
				<div class="btn-group">
					<div class="btn open" @click="openApp()">打开</div>
					<div class="btn cancel" @click="closePopup2()">取消</div>
				</div>
			</div>
		</script>
	</div>
</template>

<script>
	import secret from "@/secret/index"
	export default {
		methods:  {
			//阿里云播放视频
			alvideo(videourl, imgurl) {
//				console.log(secret.DeCodeUrl(videourl).split(",")[0])
				let player = new Aliplayer({
					"id": "player-con",
					"source": secret.DeCodeUrl(videourl).split(",")[0],
//					source: JSON.stringify({"HD":"//player.alicdn.com/resource/player/qupai.mp4","SD":"//player.alicdn.com/resource/player/qupai.mp4"}),
					"cover": imgurl,
					"width": "100%",
					"height": "100%",
					"autoplay": false,
					"isLive": false,
					"rePlay": false,
					"playsinline": true,
					"preload": true,
					"loadDataTimeout": "10",
					"controlBarVisibility": "click",
					"showBarTime": 5000,
					"useH5Prism": true,
					"extraInfo": {
						"crossOrigin": "anonymous"
					},
					components: [
						{
					      name: 'QualityComponent',
					      type: AliPlayerComponent.QualityComponent
					    },{
					      name: 'PreviewVodComponent',
					      type: AliPlayerComponent.PreviewVodComponent,
					      args: [120, '#endPreviewTemplate', `<a href="https://www.aliyun.com/product/vod" class="vip-join">开通会员</a> 观看完整视频`]
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
//					player.setPreviewTime();
//					player.getPreviewTime()
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	.video {
		width: 100%;
		height: 4.22rem;
		overflow: hidden;
		$size: 13px;
		$black: #333;
		$gray: #999;
	}
</style>