import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {MEMBER} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class MemberDetailPresenter extends BasePresenter{

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
			instance = new MemberDetailPresenter();
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
}
