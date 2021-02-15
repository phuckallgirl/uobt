import HttpUtil from "../net/HttpUtil";
import {encryping} from "../util/aes";
import BaseApp from "../ui/BaseApp";
import Storage from '../util/storage'

export default class BasePresenter {

	async requestPost(tag, url, params){
		var json = {};
		if(params){
			console.log(url+"请求源数据："+JSON.stringify(params));
			var encrypted = encryping(JSON.stringify(params));
			json.request = encrypted
		}else{
			console.log(url+"请求源数据：{}");
		}
		var token = await Storage.get('token');
		this._request(tag, HttpUtil.getInstance().post(Const.HOST + url, json, token));
	}

	requestGet(tag,url,params){
		this._request(tag, HttpUtil.getInstance().get(url, params));
	}

	_request(tag, promise: Promise){
		promise.then(result => {
			result.tag = tag;
			this.success(result);
		})
		.catch(result => {
			result.tag = tag;
			this.failed(this.errorMsg(result));
		})
	}

	//在子类重写
	getBaseApp(): BaseApp{
	}

	//请求成功
	success(result){
	}

	//请求失败
	failed(result){
		console.log(result.msg);
	}

	//错误码统一处理
	errorMsg(error){
		//....做相关处理
		return error;
	}
}
