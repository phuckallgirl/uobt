import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {MSG} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class MessagePresenter extends BasePresenter{

	ENUM = {
		LIST: 'MSG_LIST',
		DETAIL: 'MSG_DETAIL'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new MessagePresenter();
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

	//站内信列表
	list(params){
		this.requestPost(this.ENUM.LIST, MSG.list, params);
	}

	//获取站内信详细内容
	detail(params){
		this.requestPost(this.ENUM.DETAIL, MSG.detail, params);
	}
}
