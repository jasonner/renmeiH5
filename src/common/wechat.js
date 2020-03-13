//  wetchat.js
import wx from 'weixin-js-sdk';  // 引入wxJS
import { apiWxShare } from "@/request/api";  // 本项目的api （根据自己项目）
export function wxChatShare(param) {
//  let _url = encodeURIComponent(param.url)
	let _url = param.url
    apiWxShare({url:_url})  // wechatConfig是获取微信配置相关信息的接口，此处根据个人项目写法而定，类似于this.$ajax
    .then (res => {
        if(res.code==200) {
        // 接口返回配置信息
        	
            wx.config({
                debug: false,
                appId: res.object.appid,
                timestamp: res.object.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.object.nonceStr, // 必填，生成签名的随机串
                signature: res.object.signature, // 必填，签名
                jsApiList: [  // 用的方法都要加进来
                    'onMenuShareTimeline', 'onMenuShareAppMessage'
                ]
            });
            wx.ready(function () {
                //分享到朋友圈
                wx.onMenuShareTimeline({ 
                    title: param.title, // 分享标题
                    link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: param.imgUrl, // 分享图标
                    success: function () {
                      // 设置成功
//                      alert("分享到朋友圈成功返回的信息为:", res);
                    }
                })

                //分享给朋友
                wx.onMenuShareAppMessage({ 
                    title: param.title, // 分享标题
                    desc: param.desc, // 分享描述
                    link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: param.imgUrl, // 分享图标
                    success: function () {
                      // 设置成功
//                      alert("分享到朋友圈成功返回的信息为:", res);
                    }
                })
            });
            wx.error(function (res) {
//              alert('验证失败返回的信息:', res);
            });
        } else {
            alert(res.message);
        }
    })
  }
