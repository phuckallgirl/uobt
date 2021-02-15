import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {MEMBER} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class UserProfilePresenter extends BasePresenter{

	ENUM = {
		DETAIL: 'MEMBER_DETAIL',
		UPDATE: 'MEMBER_UPDATE'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new UserProfilePresenter();
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

	update(){
		this.requestPost(this.ENUM.UPDATE, MEMBER.update, params);
	}
}
