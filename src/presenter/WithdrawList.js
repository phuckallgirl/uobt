import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {FINANCE} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class WithdrawList extends BasePresenter{

	ENUM = {
		WITHDRAW_LIST: 'FINANCE_WITHDRAW_LIST',
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new WithdrawList();
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
		this.requestPost(this.ENUM.WITHDRAW_LIST, FINANCE.withdrawList, params);
	}
}
