import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {AUTH} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class RegisterPresenter extends BasePresenter{

	ENUM = {
		REGISTER: 'AUTH_REGISTER',
		SMS: 'AUTH_SMS'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new RegisterPresenter();
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

	//会员注册
	register(params){
		this.requestPost(this.ENUM.REGISTER, AUTH.regist, params);
	}

	//请求发送短信验证码
	sms(params){
		this.requestPost(this.ENUM.SMS, AUTH.sms, params);
	}
}
