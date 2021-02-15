import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {FINANCE, CARD} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class WithdrawPresenter extends BasePresenter{

	ENUM = {
		APPLY: 'FINANCE_WITHDRAW_APPLY',
		CARD_LIST: 'CARD_LIST',
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new WithdrawPresenter();
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
	cardList(params){
		this.requestPost(this.ENUM.CARD_LIST, CARD.list, params);
	}

	//提现请求
	apply(params){
		this.requestPost(this.ENUM.APPLY, FINANCE.withdrawApply, params);
	}
}
