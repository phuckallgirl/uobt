import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {AUTH} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class ForgetPresenter extends BasePresenter{

	ENUM = {
		FORGET: 'AUTH_FORGET',
		SMS: 'AUTH_SMS'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new ForgetPresenter();
		}
		return instance;
	}

	getBaseApp(): BaseApp {
		return baseApp;
	}

	success(result) {
		super.success(result);
		baseApp.success(result);
	}

	failed(result) {
		super.failed(result);
		baseApp.failed(result);
	}

	//会员忘记密码
	forget(params){
		this.requestPost(this.ENUM.FORGET, AUTH.forget, params);
	}

	//请求发送短信验证码
	sms(params){
		this.requestPost(this.ENUM.SMS, AUTH.sms, params);
	}
}
