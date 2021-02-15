import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {CARD} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class CardAddPresenter extends BasePresenter{

	ENUM = {
		ADD: 'CARD_ADD',
		UPDATE: 'CARD_UPDATE'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new CardAddPresenter();
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

	//添加银行卡
	add(params){
		this.requestPost(this.ENUM.ADD, CARD.add, params);
	}

	//修改、删除银行卡
	update(params){
		this.requestPost(this.ENUM.UPDATE, CARD.update, params);
	}
}
