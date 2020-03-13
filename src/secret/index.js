/**
 * 对页面上输入的密码进行加密传输给后台进行验证，对返回的数据进行解密，在页面展示
 */
let CryptoJS = require('crypto-js'); // 引入AES源码js
var key = CryptoJS.enc.Utf8.parse("renmeidaxuetangk");
var iv = CryptoJS.enc.Utf8.parse('A-16-Byte-String');
var cdn = "http://play.renmeidaxuetang.com/video/"; //正式地址
//var cdn = "http://renmeiplay.oss-cn-beijing.aliyuncs.com/video/";//测试地址
export default {
	/*
	 * 对密码进行加密，传输给后台进行验证
	 * @param {String}   word  需要加密的密码
	 * @param {String}   keyStr  对密码加密的秘钥
	 * @return {String}   加密的密文
	 * */
	encrypt(word, keyStr) { // 加密
		keyStr = keyStr ? keyStr : 'ABGHNJHGSHUYG12';
		let key = CryptoJS.enc.Utf8.parse("keyStr");
		let srcs = CryptoJS.enc.Utf8.parse(word);
		let encrypted = CryptoJS.AES.encrypt(srcs, key, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	},
	/*
	 * 对加密之后的密文在页面上进行解密，以便用户进行修改
	 * @param {String}   word  需要加密的密码
	 * @param {String}   keyStr  对密码加密的秘钥
	 * @return {String}   解密的明文
	 * */
	decrypt(word, keyStr) { // 解密
		keyStr = keyStr ? keyStr : 'ABGHNJHGSHUYG12';
		let key = CryptoJS.enc.Utf8.parse("renmeidaxuetangk");
		let decrypt = CryptoJS.AES.decrypt(word, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	},

	DeCodeUrl(url) {
		if(url.indexOf("video/") == -1) {
			var code = url;
		} else {
			var code = url.split("video/")[1];
		}
		var videoName = this.decrypt(code);
		var fileName = videoName.split("/")[0];
		var urls = cdn + fileName + "/" + videoName.split("/")[1].split(",")[0] + "," +
			cdn + fileName + "/" + videoName.split("/")[1].split(",")[1] + "," +
			cdn + fileName + "/" + videoName.split("/")[1].split(",")[2];
		return urls;

	},

	Decrypt(word) {
		var decrypt = CryptoJS.AES.decrypt(word, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	}
};
