import SignUtils from "../util/SignUtils";
let instance = null;
let requestGet = {
	method: 'GET',
};

let requestPost = {
	method: 'POST',
	headers:{
		'Accept':'application/json',
		'Content-Type':'application/json',
		'token': ''
	},
	body:'',
};

let timeout;

export default class HttpUtil{

	static getInstance(){
		if(!instance){
			instance = new HttpUtil();
		}
		return instance;
	}

	// GET请求
	get(url, params){
		url = params ? SignUtils.getSplicingUrl(url,params) : url;
		console.log("url ========请求地址==================>"+url);
		return this.connect(url, requestGet);
	}

	//POST请求
	post(url, bodyData, token){
		console.log("url ====>"+url+"，body ====>"+JSON.stringify(bodyData)+"，token ====>"+token);
		requestPost['headers']['token'] = token;
		requestPost.body = JSON.stringify(bodyData);
		return this.connect(url, requestPost);
	}

	requestData(url, requestWay){
		return new Promise(function(resolve, reject){
			fetch(url, requestWay)
			.then(response => response.json())
			.then(json => {
				resolve(json);
			})
			.catch(error => {
				reject(error);
			})
		});
	}

	timeOut(){
		return new Promise(function(resolve, reject){
			timeout = setTimeout(function(){
				reject('请求超时');
			}, 30000);
		});
	}

	connect(url, requestWay){
		console.log(requestWay)
		return new Promise(function(resolve, reject){
			Promise
			.race([instance.requestData(url, requestWay), instance.timeOut()])
			.then(response => {
				if(timeout) clearTimeout(timeout);				
				if(response.code == Const.REQUEST_SUCCESS){
					console.log(url+" 返回数据："+JSON.stringify(response.data));
					resolve(response.data);
				}else{
					console.log(url+" 请求失败："+JSON.stringify(response));
					reject(response);
				}
				//*/
			})
			.catch(error => {
				console.log(url+" 请求异常："+error);
				if(timeout)clearTimeout(timeout);
				reject({msg: error});
			});
		});
	}
}
