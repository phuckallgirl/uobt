import BasePresenter from "./BasePresenter";
import BaseApp from "../ui/BaseApp";
import {FINANCE} from "../constants/interface";
let baseApp:BaseApp;
let instance = null;

export default class FinanceDetailPresenter extends BasePresenter{

	ENUM = {
		DETAIL: 'FINANCE_DETAIL'
	}

	static getInstance(base:BaseApp){
		baseApp = base;
		if(!instance){
			instance = new FinanceDetailPresenter();
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

	//资金明细详情
	detail(params){
		this.requestPost(this.ENUM.DETAIL, FINANCE.detail, params);
	}
}
