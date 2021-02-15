import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {AUTH} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class PhoneAuthPresenter extends BasePresenter{

	ENUM = {
		CHECK: 'AUTH_CHECK',
		LOGIN: 'AUTH_LOGIN',
		LOGOUT: 'AUTH_LOGOUT',
		REGISTER: 'AUTH_REGISTER',
		FORGET: 'AUTH_FORGET',
		SMS: 'AUTH_SMS'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new PhoneAuthPresenter();
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

	//检查token是否过期
	check(params){
		this.requestPost(this.ENUM.CHECK, AUTH.check, params);
	}

	//登录
	login(params){
		this.requestPost(this.ENUM.LOGIN, AUTH.login, params);
	}

	//退登
	logout(params){
		this.requestPost(this.ENUM.LOGOUT, AUTH.logout, params);
	}

	//会员忘记密码
	forget(params){
		this.requestPost(this.ENUM.FORGET, AUTH.forget, params);
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
