import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {AUTH} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class RegLoginPresenter extends BasePresenter{

	ENUM = {
		LOGIN: 'AUTH_LOGIN'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new RegLoginPresenter();
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

	//登录
	login(params){
		this.requestPost(this.ENUM.LOGIN, AUTH.login, params);
	}
}
