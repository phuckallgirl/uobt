import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {MEMBER} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class MinePresenter extends BasePresenter{

	ENUM = {
		DETAIL: 'MEMBER_DETAIL',
		SWITCH: 'MEMBER_SWITCH',
		UPDATE: 'MEMBER_UPDATE',
		PASSWORD: 'MEMBER_PASSWORD',
		PIN: 'MEMBER_PIN'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new MinePresenter();
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

	//获取会员详细信息
	detail(params){
		this.requestPost(this.ENUM.DETAIL, MEMBER.detail, params);
	}

	//交易开关
	switch(params){
		this.requestPost(this.ENUM.SWITCH, MEMBER.switch, params);
	}

	//修改会员个人信息
	update(params){
		this.requestPost(this.ENUM.UPDATE, MEMBER.update, params);
	}

	//修改会员登录密码
	password(params){
		this.requestPost(this.ENUM.PASSWORD, MEMBER.password, params);
	}

	//修改会员的提现密码
	pin(params){
		this.requestPost(this.ENUM.PIN, MEMBER.pin, params);
	}
}
