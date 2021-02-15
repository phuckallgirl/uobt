import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {MEMBER} from "../constants/interface";

let baseApp:BaseApp;

let instance = null;

export default class NicknamePresenter extends BasePresenter{

	ENUM = {
		NICKNAME: 'MEMBER_NICKNAME'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new NicknamePresenter();
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

	//修改会员昵称
	nickname(params){
		this.requestPost(this.ENUM.NICKNAME, MEMBER.update, params);
	}
}
