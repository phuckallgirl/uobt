import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('iFuckUfdf0io@#$*');
const iv = CryptoJS.enc.Utf8.parse('5a8cec409d13a8e8');

/**
* 加密
* @param {*} data 
*/
export const encryping = (data) => {
	var srcs = CryptoJS.enc.Utf8.parse(data);
	var content = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding })
	return encodeURI(content);
}

/**
* 解析后转为JSON
* @param {*} data 
*/
export const decrypting = (encrypted) => {
	var decrypt = CryptoJS.AES.decrypt(encrypted, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding })
	var re = CryptoJS.enc.Utf8.stringify(decrypt).toString();
	return JSON.parse(re);
}

/**
* 解析成字符串
* @param {*} encrypted 
*/
export const decrString = (encrypted) => {
	var decrypt = CryptoJS.AES.decrypt(encrypted, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding })
	var re = CryptoJS.enc.Utf8.stringify(decrypt).toString();
	return re;
}
