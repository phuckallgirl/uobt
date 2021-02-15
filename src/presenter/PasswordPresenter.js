import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {MEMBER} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class PasswordPresenter extends BasePresenter{

	ENUM = {
		PASSWORD: 'MEMBER_PASSWORD',
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new PasswordPresenter();
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

	//修改会员登录密码
	password(params){
		this.requestPost(this.ENUM.PASSWORD, MEMBER.password, params);
	}
}
