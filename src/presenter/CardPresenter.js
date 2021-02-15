import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {CARD} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class CardPresenter extends BasePresenter{

	ENUM = {
		LIST: 'CARD_LIST',
		UPDATE: 'CARD_UPDATE'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new CardPresenter();
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

	//银行卡列表
	list(params){
		this.requestPost(this.ENUM.LIST, CARD.list, params);
	}

	//修改、删除银行卡
	update(params){
		this.requestPost(this.ENUM.UPDATE, CARD.update, params);
	}
}
